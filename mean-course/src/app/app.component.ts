import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from "./posts/post-list/post-list.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
