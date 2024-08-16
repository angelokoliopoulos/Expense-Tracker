import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
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
