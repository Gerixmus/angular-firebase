import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';


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
  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .catch(err => { //not working
        console.log(err); 
        return err;
      })
      .then((userCredential) => {
        return userCredential;
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
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return this.token != null;
  }

  getUid() {
    if(this.auth.currentUser){
      return this.auth.currentUser.uid;
    } else {
      return null;
    }
  }
}
