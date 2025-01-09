import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppCommonModule } from './app.common.module';
import { HeaderComponent } from "./header/header.component";
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from "./posts/post-list/post-list.component";
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostCreateComponent, AppCommonModule, HeaderComponent, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
