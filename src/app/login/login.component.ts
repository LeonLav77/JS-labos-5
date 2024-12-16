import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;

      this.authService.login(username, password).then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/']);
      }).catch((error) => {
        this.error = error.message;
      });

    } else {
      console.log('Form is not valid');
    }
  }
}