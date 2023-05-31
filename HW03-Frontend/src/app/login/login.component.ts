import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    if (this.email && this.password) {
      const body = {
        emailaddress: this.email,
        password: this.password
      };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post<any>('http://localhost:5240/api/Authentication/login', body, { headers }).subscribe(
        response => {
          console.log(response);
          if (response && response.message === 'Login successful') {
            this.router.navigate(['/listing']);
          } else {
            // Handle login failure
          }
        },
        error => {
          console.error(error);
          // Handle error response from the backend
        }
      );
    }
  }
}
