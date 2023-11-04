import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment'
import { provideAuth, getAuth } from '@angular/fire/auth';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog.service';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { AdminRestaurantsComponent } from './admin-restaurants/admin-restaurants.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DialogComponent,
    EditComponent,
    AdminRestaurantsComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
