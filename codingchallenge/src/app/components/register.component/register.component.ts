import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IntegrationService } from '../../services/integration.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { SignupRequest } from '../../models/signup-request';

@Component({
  selector: 'app-register.component',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private integrationService: IntegrationService,
    private storage: LocalStorageService
  ) {}

  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    mobileno: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required)
  });

  success = false;

  onSubmit(): void {
    this.storage.remove('auth-key');

    if (this.signupForm.invalid) {
      console.log("Form is invalid.");
      return;
    }

    const request: SignupRequest = {
      name: this.signupForm.value.name,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      address: this.signupForm.value.address,
      mobileno: this.signupForm.value.mobileno,
      age: this.signupForm.value.age
    };

    this.integrationService.doRegister(request).subscribe({
      next: () => {
        this.success = true;
        this.signupForm.reset();
      },
      error: (err) => {
        console.error("Registration error:", err);
      }
    });
  }
}
