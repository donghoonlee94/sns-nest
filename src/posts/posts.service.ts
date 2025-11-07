import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsModel } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: Post[] = [
  {
    id: 1,
    author: 'John Doe',
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

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    const posts = await this.postsRepository.find();
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];
    return post;
  }

  updatePost(id: number, author?: string, title?: string, content?: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) throw new NotFoundException('Post not found');

    if (author) post.author = author;
    if (title) post.title = title;
    if (content) post.content = content;

    posts = posts.map((prevPost) => (prevPost.id === +id ? post : prevPost));

    return post;
  }

  deletePost(id: number) {
    const post = posts.find((post) => post.id === +id);

    if (!post) throw new NotFoundException('Post not found');

    posts = posts.filter((post) => post.id !== +id);

    return posts;
  }
}
