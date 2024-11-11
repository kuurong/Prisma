import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './CreateUser.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
