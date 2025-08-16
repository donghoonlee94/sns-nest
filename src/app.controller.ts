import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPosts(): Post[] {
    return [
      {
        author: 'John Doe',
        title: 'Hello World',
        content: 'This is a test post',
        likeCount: 10,
        commentCount: 5,
      },
    ];
  }
}
