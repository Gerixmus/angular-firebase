import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  invalidLogin: boolean = false;

  @ViewChild('f') form!: NgForm;

  constructor(private router: Router, private authService: AuthService) { }

  redirectRegister() {
    this.router.navigate(['/register'])
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password)
      .then((response) => {
        if (!response) {
          this.invalidLogin = true;
        } else {
          this.invalidLogin = false;
          this.router.navigate(['dashboard']);
        }
      });
  }
  
}
