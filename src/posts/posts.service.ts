import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
    return this.prisma.post.create({ data: { userId, ...data } });
  }

  createGroupPost(
    userIds: number[],
    data: Prisma.GroupPostCreateWithoutUsersInput,
  ) {
    //data는 title, description만..
    return this.prisma.groupPost.create({
      data: {
        ...data,
        users: {
          create: userIds.map((userId) => ({ userId })), //userId:userId
        },
      },
    });

    // return this.prisma.groupPost.create({
    //   data: {
    //     title: '',
    //     description: '',
    //     users: {
    //       create: [{ userId: 1 }, { userId: 2 }],
    //     },
    //   },
    // });
  }

  getGroupPosts() {
    return this.prisma.groupPost.findMany({
      include: {
        users: {
          select: {
            user: true,
          },
        },
      },
    });
  }
}

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreatePostDto } from './dto/CreatePost.dto';

// @Injectable()
// export class PostsService {
//   constructor(private prisma: PrismaService) {}

//   createPost(createPostDto: CreatePostDto) {
//     return this.prisma.post.create({ data: createPostDto });
//   }
// }
