import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  error = '';

  constructor (
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService) 
      {
        this.registerForm = this.fb.group({
          username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          name: ['', [Validators.required, Validators.minLength(2)]],
        });
      }


  onSubmit() {
    if (this.registerForm.valid) {

      const username = this.registerForm.get('username')!.value;
      const password = this.registerForm.get('password')!.value;
      const confirmPassword = this.registerForm.get('confirmPassword')!.value;
      const email = this.registerForm.get('email')!.value;
      const name = this.registerForm.get('name')!.value;

      if (password !== confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }

      this.authService.register(username, password, email, name).then((user) => {
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
