import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private postsService : PostsService, 
              private router: Router ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  onSavePost() {
    const titlePost = this.postForm.get('title').value;
    const contentPost = this.postForm.get('content').value;
    this.postsService.createNewPost(titlePost, contentPost);
    this.router.navigate(['/posts']);
  }

}
