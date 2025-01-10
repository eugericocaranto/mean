import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-list',
  imports: [
    MatExpansionModule,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];

  sub: Subscription = new Subscription();

  isLoading: Boolean = false;

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();

    this.isLoading = true;
    this.sub = this.postService.getPosts$().subscribe(response => {
      this.posts = response;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId);
  }
}
