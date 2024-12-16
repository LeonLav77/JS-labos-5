import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-forum',
  standalone: false,
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css',
})
export class ForumComponent {
  posts: any[] = [];
  users: any[] = [];
  user = JSON.parse(localStorage.getItem('user') || '{}');
  addingNewPost = false;
  editingPost: any = null;

  constructor(
    private router: Router,
    private postService: PostService,
    private userService: UserService
  ) {
    this.initializeComponent();
  }

  async initializeComponent() {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }

    await this.userService.getUsers().then((users) => {
      this.users = users;
    });

    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  editPost(post: any) {
    this.editingPost = { ...post }; 
    this.addingNewPost = false;
  }

  cancelEdit() {
    this.editingPost = null;
  }

  // ima i drugi nacin za povuci podatke iz forme
  updatePost(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const title = (form.querySelector('input[name="title"]') as HTMLInputElement).value;
    const content = (form.querySelector('textarea[name="content"]') as HTMLTextAreaElement).value;

    if (!title || !content) {
      return;
    }

    const updatedPost = { ...this.editingPost, title, content, timestamp: new Date().toISOString() };

    this.postService.updatePost(updatedPost).subscribe((updated) => {
      const index = this.posts.findIndex((post) => post.id === updatedPost.id);
      if (index !== -1) {
        this.posts[index] = updated; 
      }
      this.editingPost = null; 
    });
  }

  deletePost(post: any) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(post.id).subscribe(() => {
        const index = this.posts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
          this.posts.splice(index, 1); 
        }
      });
    }
  }

  toggleAddingNewPost() {
    this.addingNewPost = !this.addingNewPost;
  }

  addNewPost(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const title = (form.querySelector('input[name="title"]') as HTMLInputElement).value;
    const content = (form.querySelector('textarea[name="content"]') as HTMLTextAreaElement).value;
    const timestamp = new Date().toISOString();

    if (!title || !content) {
      return;
    }

    const newPost = { title, content, userId: this.user.id, id: '', timestamp };

    this.postService.addPost(newPost).subscribe((addedPost) => {
      newPost.id = addedPost.name;
      this.posts.push(newPost);
      form.reset();
      this.toggleAddingNewPost();
    });
  }

  getUserNameById(userId: string) {
    const user = this.users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown';
  }
}
