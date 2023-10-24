import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, catchError, map } from 'rxjs';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form! : FormGroup;

  constructor(private router: Router, private authService: AuthService, private formBuilder : FormBuilder, private backendService : BackendService) { }
  
  redirectLogin() {
    this.router.navigate(['/login'])
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  // Async validator to check if email is taken
  emailTaken (control: FormControl): Promise<any> | Observable<any> {
    const emailTakenPromise =  new Promise ((resolve, reject) => {
      this.backendService.emailTaken(control.value)
      .pipe(map((isTaken: boolean) => {
        if (isTaken) {
          resolve({emailTaken: true})
        } else {
          resolve(null)
        }
      }),
      catchError((error) => {
            console.error('Error:', error);
            return error;
          })).subscribe()
    });
    return emailTakenPromise;
  }

  // TO-DO not working
  // emailTaken (control: FormControl): Observable<ValidationErrors | null> {
  //   return this.backendService.emailTaken(control.value).pipe(
  //     map(isTaken => (isTaken ? { uniqueEmail: true } : null)),
  //     catchError(() => of(null))
  //   )
  // }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
    'email' : [null, {
      validators : [Validators.required, Validators.email],
      asyncValidators : [this.emailTaken.bind(this)],
      updateOn: 'blur'
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
    .then((user) => {
      console.log(user);
      if(user.user) {
        this.backendService.updateUser(user);
        this.router.navigate(['login']);
      } else {
        // this.backendService.emailTaken(email)
        // .pipe(map((isTaken: boolean) => {
        //   if (isTaken) {
        //     console.log('taken')
        //   } else {
        //     console.log('not taken')
        //   }
        // }),
        // catchError((error) => {
        //       console.error('Error:', error);
        //       return error;
        //     })).subscribe();
        console.log("error");
      }
    })
  }
}
