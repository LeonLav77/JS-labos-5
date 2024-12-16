import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  posts: any[] = [];
  users: any[] = [];
  user: any = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      
      if (this.userId) {
        this.initializeComponent();
      }
    });
  }

  async initializeComponent() {
    await this.userService.getUsers().then((users) => {
      this.users = users;
      this.user = this.users.find((user) => user.id === this.userId);
    });

    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts.filter((post) => post.userId === this.userId); 
    });
  }

  goBack() {
    window.history.back();
  }
}
