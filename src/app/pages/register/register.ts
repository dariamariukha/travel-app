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
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onRegister() {
    const { username, password } = this.registerForm.value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((u: any) => u.username === username)) {
      this.errorMessage = 'User already exists';
      return;
    }

    const role = username === 'admin' ? 'admin' : 'user';
    users.push({ username, password, role });

    localStorage.setItem('users', JSON.stringify(users));

    this.message = 'Registration successful! Redirecting to login...';
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }
}
