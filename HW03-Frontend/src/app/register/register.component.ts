import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
  

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
  
      // Create the request body
      const body = { emailaddress: email, password: password };
  
      // Set the headers (if needed)
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      // Make the HTTP POST request
      this.http.post<any>('http://localhost:5240/api/Registration', body, { headers }).subscribe(
        response => {
          // Handle the response from the backend
          console.log(response);
          if (response && response.message === 'Registration successful') {
            // Registration successful
            this.router.navigate(['/login']); // Navigate to the login page
          } else {
            // Registration failed
            // Display an error message or perform further actions
          }
        },
        error => {
          // Handle the error response from the backend
          console.error(error);
          // Display an error message or perform further actions
        }
      );
    }
  }
  
}