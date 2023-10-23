import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null; // Declare the 'token' property

  constructor(private router: Router, private auth: Auth) {
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
  }
  

  // UID stored in userCredential
  // register(email: string, password: string): Promise<User> {
  register(email: string, password: string): Promise<string> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .catch(err => {
        console.log(err);
        return err;
      })
      .then((userCredential) => {
        return 'success';
        // const user = userCredential.user;
        // return user;
      })
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        return this.auth.currentUser?.getIdToken()
          .then(
            (token: string) => {
              this.token = token;
              localStorage.setItem('token', token);
              return true;
            }
          );
      })
      .catch( 
        err => {
          console.log(err);
          return false;
        }
      )
  }

  logout(): void {
    this.auth.signOut();
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  isLoggedIn(): boolean {
    return this.token != null;
  }
}
