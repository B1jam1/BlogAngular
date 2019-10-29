import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { post } from 'selenium-webdriver/http';

@Injectable()
export class PostsService {

  posts: Post[] = [];
  postsSubject = new Subject<any[]>();

  constructor() {
    this.getPosts();
  }

  emitPosts() {
    this.orderPosts();
    this.postsSubject.next(this.posts);
  }

  getPosts() {
    for(let i = 1; i < 6; i++) {
      const post = new Post();

      post.idPost = i;
      post.titlePost = 'Post ' + i;
      post.contentPost = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.';
      post.loveItsPost = i;
      post.datePost = Date.now();

      this.posts.push(post);
    }

    this.emitPosts();
  }

  removePost(index: number)  {
    this.posts.splice(index, 1);
    this.emitPosts();
  }

  updatePost(post: Post, index: number){
    this.posts[index].loveItsPost = post.loveItsPost;
    this.emitPosts();
  }

  createNewPost(title: string, content: string) {
    const post = new Post();
    post.idPost = this.getIdPost();
    post.titlePost = title;
    post.contentPost = content;
    post.loveItsPost = 0;
    post.datePost = Date.now();
    this.posts.push(post);
  }

  getIdPost() {
    var idTmp: number;
    this.posts.forEach(
      (post: Post) => {
        if(idTmp < post.idPost) {
          idTmp = post.idPost;
        }
      }
    )
    return idTmp++;
  }

  orderPosts() {
    this.posts.sort(
      (post1, post2) => 
        new Date(post2.datePost).getTime() - new Date(post1.datePost).getTime()
    )
  }
  
}