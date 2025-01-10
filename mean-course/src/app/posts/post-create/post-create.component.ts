import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit {
  post: Post = { id: '', title: '', content: '' };
  isLoading: Boolean = false;

  form: FormGroup | any;

  imagePreview: string | any;

  private mode = 'create';
  private postId: any;

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe(params => {
      if (params.has('postId')) {
        this.mode = 'edit';
        this.postId = params.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.post = { id: postData._id, title: postData.title, content: postData.content };

          this.form?.setValue({
            title: this.post.title,
            content: this.post.content
          });

          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file as Blob);
  }
}

