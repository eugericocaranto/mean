import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppCommonModule } from '../../app.common.module';

import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  imports: [AppCommonModule, MatExpansionModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() posts: Post[] = [];

  sub: Subscription = new Subscription();

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.sub = this.postService.getPosts$().subscribe(response => {
      this.posts = response;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
