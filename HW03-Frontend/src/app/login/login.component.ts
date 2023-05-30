import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
  


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      
      // Create the request body
const body = {
  emailaddress: email,
  password: password
};

// Set the headers (if needed)
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

// Make the HTTP POST request
this.http.post<any>('http://localhost:5240/api/Authentication/login', body, { headers }).subscribe(
  response => {
    // Handle the response from the backend
    console.log(response);
    // Redirect to another page or perform further actions
    if (response && response.message === 'Login successful') {
      // Login successful
      this.router.navigate(['/listing']); // Navigate to the listing page
    } else {
      // Login failed
      // Display an error message or perform further actions
    }
  },
  error => {
    // Handle the error response from the backend
    console.error(error);
    console.log(error.error);
    // Display an error message or perform further actions
  }
);
    }
  }
}
