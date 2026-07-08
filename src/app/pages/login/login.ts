import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {


  email = '';
  password = '';


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  login() {

    const data = {
      email: this.email,
      password: this.password
    };


    this.authService.login(data)
      .subscribe({

        next: (response) => {

          console.log(response);


          this.authService.saveToken(
            response.token
          );


          alert("Login success");


          this.router.navigate([
            '/dashboard'
          ]);

        },


        error: (error) => {

          console.log(error);

          alert("Login failed");

        }

      });

  }

}