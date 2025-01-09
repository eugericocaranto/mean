import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostService {
  posts: Post[] = [];
  postsUpdated = new Subject<Post []>();

  getPosts() {
    return [...this.posts];
  }

  getPosts$() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title, content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}