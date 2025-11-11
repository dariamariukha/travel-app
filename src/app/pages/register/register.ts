import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
  message = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onRegister() {
    const { username, password } = this.registerForm.value;

    //перевіряємо, чи користувач уже існує
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      const user = JSON.parse(existingUser);
      if (user.username === username) {
        this.errorMessage = 'User already exists';
        return;
      }
    }

    //зберігаємо нового користувача
    localStorage.setItem('user', JSON.stringify({ username, password }));
    this.message = 'Registration successful! Redirecting to login...';

    setTimeout(() => this.router.navigate(['/login']), 2000);
  }
}
