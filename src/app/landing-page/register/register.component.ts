import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe({
      error: (err) => console.log(err),
    });
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
