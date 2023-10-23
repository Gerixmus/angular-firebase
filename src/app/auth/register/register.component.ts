import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form! : FormGroup;

  constructor(private router: Router, private authService: AuthService, private formBuilder : FormBuilder) { }
  
  redirectLogin() {
    this.router.navigate(['/login'])
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  emailTaken (control: FormControl): Promise<any> | Observable<any> {
    const response = new Promise ((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'kamil@tumulec.com') {
          resolve({emailTaken: true})
        } else {
          resolve(null)
        }
      }, 5000)
    });
    return response;
  }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
    'email' : [null, {
      validators : [Validators.required, Validators.email],
      asyncValidators : [this.emailTaken]
    }],
    'password' : [null, {
      validators : [Validators.required, Validators.minLength(6)]
    }]
   });
  }

  onSubmit(): void {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.register(email, password)
    .then((res) => {
      if(res == 'success') {
        // console.log(res.uid);
        this.router.navigate(['login']);
      } else {
        alert(res);
      }
    })
  }
}
