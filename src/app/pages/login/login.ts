import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      this.errorMessage = 'No registered users found. Please register first.';
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.username === username && user.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/profile']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
