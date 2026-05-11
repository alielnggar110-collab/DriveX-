import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const success = this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      if (success) { this.router.navigate(['/']); }
      else { this.errorMsg = 'Invalid login credentials'; }
    } else { this.loginForm.markAllAsTouched(); }
  }
}