import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

const posts: Post[] = [
  {
    id: 1,
    author: 'John',
    title: 'Hello World',
    content: 'This is a test post',
    likeCount: 10,
    commentCount: 5,
  },
  {
    id: 2,
    author: 'Jane2',
    title: 'Hello World 2',
    content: 'This is a test post 2',
    likeCount: 20,
    commentCount: 555,
  },
  {
    id: 3,
    author: 'John3',
    title: 'Hello World 3',
    content: 'This is a test post 3',
    likeCount: 103,
    commentCount: 53,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): Post[] {
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') id: number) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
