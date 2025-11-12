import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ]
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    const { username, password } = this.registerForm.value;

    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      const user = JSON.parse(existingUser);
      if (user.username === username) {
        this.errorMessage = 'User already exists';
        return;
      }
    }

    localStorage.setItem('user', JSON.stringify({ username, password }));
    this.message = 'Registration successful! Redirecting to login...';

    setTimeout(() => this.router.navigate(['/login']), 2000);
  }
}
