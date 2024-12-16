import { Component } from '@angular/core';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-post',
  standalone: false,
  
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

}
