import { Component, inject } from '@angular/core';
import { IntegrationService } from '../../services/integration.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login.component',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private integration: IntegrationService,  private storage : LocalStorageService) {}

  userForm : FormGroup =  new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  router = inject(Router);
  request: LoginRequest = new LoginRequest;

  login() {
  this.storage.remove('auth-key');

  const formValue = this.userForm.value;

  if (!formValue.username || !formValue.password) {
    alert('Please enter both username and password');
    return;
  }

  this.request.username = formValue.username;
  this.request.password = formValue.password;

  this.integration.doLogin(this.request).subscribe({
    next: (res) => {
      if (res && res.token) {
        console.log("Received Token: " + res.token);
        this.storage.set('auth-key', res.token);

        // Navigate directly to protected route
        this.router.navigate(['/books']);
      } else {
        alert("Invalid login response");
      }
    },
    error: (err) => {
      console.error("Login failed:", err);
      alert("Invalid credentials or server error");
    }
  });
}
}
