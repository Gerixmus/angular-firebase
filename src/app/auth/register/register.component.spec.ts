import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { BackendService } from 'src/app/backend.service';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const authServiceMock = {
    register: (email: string, password: string) => Promise.resolve({ user: { email } }),
  };

  const backendServiceMock = {
    emailTaken(email: string): Observable<any> {
      if (email === 'test@taken.com') {
        return of({ emailTaken: true });
      } else {
        return of(false);
      }
    },
    updateUser: () => {},
  };

  const firestoreMock = {
    collection: (name: string) => ({
      add: (data: any) => new Promise((resolve) => resolve({})), // Simulate adding a document
      doc: (id: string) => ({
        set: (data: any) => new Promise((resolve) => resolve({})), // Simulate setting a document
        get: () => new Promise((resolve) => resolve({ data: () => null })), // Simulate retrieving a document
      }),
      get: () => new Promise((resolve) => resolve({ docs: [] })), // Simulate retrieving a list of documents
    }),
  };

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, LoginComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        {provide: BackendService, useValue: backendServiceMock },
        {provide: AuthService, useValue: authServiceMock},
        {provide: Firestore, useValue: firestoreMock},
        {provide: Router, useValue: routerSpy },
      ]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it('should render register form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1.register-title').textContent).toEqual('Register');
    expect(compiled.querySelector('label[for="email"]').textContent).toEqual('Email address');
    expect(compiled.querySelector('input[formControlName="email"]')).toBeTruthy();
    expect(compiled.querySelector('label[for="password"]').textContent).toEqual('Password (minimum 6 characters)');
    expect(compiled.querySelector('input[formControlName="password"]')).toBeTruthy();
    expect(compiled.querySelector('button.btn')).toBeTruthy();
  });
  it('should form be invalid if email is wrong', () => {
    expect(component.form.valid).toBeFalsy();
    component.email.setValue('test@test.');
    component.password.setValue('Password123');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.form.valid).toBeFalsy();
    });
  });
  it('should throw error if email field is empty', () => {
    component.email.setValue('');
    expect(component.email.errors?.['required']).toBeTrue();
  });
  it('should throw error if email field is wrong', () => {
    component.email.setValue('test@test.');
    expect(component.email.errors?.['invalidEmail']).toBeTrue();
  });
  it('should throw error if email is taken', fakeAsync(async () => {
    component.email.setValue('test@taken.com');
    tick();
    expect(component.email.errors?.['emailTaken']).toBeTrue();
  }));
  it('should form be invalid if password is wrong', () => {
    expect(component.form.valid).toBeFalsy();
    component.email.setValue('test@test.com');
    component.password.setValue('Passw');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.form.valid).toBeFalsy();
    });
  });
  it('should throw error if password is empty', () => {
    component.password.setValue('');
    expect(component.password.errors?.['required']).toBeTrue();
  });
  it('should throw error if password is too short', () => {
    component.password.setValue('Abcd');
    expect(component.password.errors).toEqual({ minlength: { requiredLength: 6, actualLength: 4 } });
  });
  it('should form be valid if data is corrrect', () => {
    expect(component.form.valid).toBeFalsy();
    component.email.setValue('test@test.com');
    component.password.setValue('Password123');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.form.valid).toBeTruthy();
    });
  });
  it('should call AuthService.register on form submission', fakeAsync(() => {
    spyOn(authServiceMock, 'register').and.callThrough();
    component.email.setValue('test@test.com');
    component.password.setValue('Password123');
    component.onSubmit();
    tick();
    expect(authServiceMock.register).toHaveBeenCalledWith('test@test.com', 'Password123');
  }));
  it('should navigate to login page on successful registration', fakeAsync(() => {
    const router = TestBed.inject(Router);   
    component.email.setValue('test@test.com');
    component.password.setValue('Password123');
    component.onSubmit();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));
  it('should navigate to login page on button press', () => {
    const router = TestBed.inject(Router);   
    component.redirectLogin();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
