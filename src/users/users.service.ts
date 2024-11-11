import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { find } from 'rxjs';
import { UpdateUserSettingDto } from './dto/UpdateUserSetting.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        userSetting: {
          create: {
            smsEnabled: true,
            notificationsOn: false,
          },
        },
      },
    });
  }

  getUsers() {
    return this.prisma.user.findMany({ include: { userSetting: true } }); //userSetting의 모든 프로퍼티를 다 가져온다
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id, //id:id
      },
      include: {
        userSetting: {
          select: {
            smsEnabled: true,
            notificationsOn: true,
          },
        },
        posts: true,
      },
    });
  }

  async updateUserById(updateUserDto: UpdateUserDto) {
    const findUser = await this.getUserById(updateUserDto.id);
    if (!findUser) throw new HttpException('User not found', 404);

    if (updateUserDto.username) {
      const findUser = await this.prisma.user.findUnique({
        where: {
          username: updateUserDto.username,
        },
      });

      if (findUser) throw new HttpException('Username already taken', 404);
    }

    return this.prisma.user.update({
      where: {
        id: updateUserDto.id,
      },
      data: updateUserDto,
    });
  }

  async deleteUserById(id: number) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return this.prisma.user.delete({ where: { id } });
  }

  async updateUserSettings(
    userId: number,
    updateUserSettingDto: UpdateUserSettingDto,
  ) {
    const findUser = await this.getUserById(userId);
    if (!findUser) throw new HttpException('User not found', 404);
    if (!findUser.userSetting) throw new HttpException('Bad request', 400);
    return this.prisma.userSetting.update({
      where: { userId },
      data: updateUserSettingDto,
    });
  }
}
