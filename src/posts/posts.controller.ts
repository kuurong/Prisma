import { Body, Controller, Post, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { CreateGroupPostDto } from './dto/CreateGroupPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  createPost(@Body() { userId, ...createPostDto }: CreatePostDto) {
    return this.postService.createPost(userId, createPostDto);
  }

  @Post('group')
  createGroupPost(
    @Body() { userIds, ...createGroupPostData }: CreateGroupPostDto,
  ) {
    return this.postService.createGroupPost(userIds, createGroupPostData);
  }

  // GET /posts/group
  @Get('group')
  getGroupPosts() {
    return this.postService.getGroupPosts();
  }
}

// @Post()
//   createPost(@Body() createPostDto: CreatePostDto) {
//     return this.postService.createPost(createPostDto);
//   }
