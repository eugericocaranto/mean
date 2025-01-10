import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostService {
  posts: Post[] = [];
  postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPosts() {
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: (post as any)._id
          };
        });
      }))
      .subscribe((responseData) => {
        this.posts = responseData;
        this.postsUpdated.next([...this.posts]);
      });
      
  }

  getPosts$() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.httpClient.get<{_id: string, title: string, content: string}>(`http://localhost:3000/api/posts/${id}`);
  }

  addPost(title: string, content: string) {
    const post: Post = { id: '', title: title, content: content };
    this.httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        post.id = responseData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);

        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.httpClient.put(`http://localhost:3000/api/posts/${id}`, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);

        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.httpClient.delete<{message: string}>(`http://localhost:3000/api/posts/${postId}`)
      .subscribe((responseData) => {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.postsUpdated.next([...this.posts]);
      });
  }
}