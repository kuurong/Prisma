import {
  IsNotEmpty,
  IsInt,
  IsString,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateGroupPostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt({ each: true })
  @IsArray()
  @IsNotEmpty({ each: true }) //[1, null, 3] 안됨
  @ArrayNotEmpty()
  userIds: number[];
}
