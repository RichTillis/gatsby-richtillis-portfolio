---
templateKey: blog-post
title: 'Ionic, Firebase, and Authentication! Oh, my!'
date: 2019-11-26T12:26:00.000Z
description: >-
  This is a tutorial to build an Ionic app with Firebase Authentication
  integration.
featuredpost: true
featuredimage: /img/chemex.jpg
tags:
  - Ionic 4
  - Firebase
  - Angular 8
  - authentication
---
TL;DR - Here's the code <https://github.com/RichTillis/ionic-firebase-auth-starter>

# Overview

Some overview here

## Getting Started

This tutorial assumes you have some familiarity with Angular and Ionic. It’s ok if you don’t, the tutorial will still produce the same result but the familiarity may make some parts of the tutorial easier to understand.

### Lets Get Started

Its always a good idea to make sure you have the latest version of Ionic

```
$ npm install -g ionic
```

Create a new blank Ionic app. Once the CLI is done CD into the app folder

```
$ ionic start ionic-firebase-auth-starter blank --type=angular
$ cd ionic-firebase-auth-starter
```

#### Creating the pages

Ok, now let's create the 3 pages we are going to need

```
$ ionic g page pages/auth/login
$ ionic g page pages/auth/register
$ ionic g page pages/auth/forgotPassword
```

##### Move the home folder

Open the project in VSCode (or whatever code editor you prefer). For organizational purposes I like to have the home folder with the other page folders. This tutorial will assume the home folder is located within the pages folder. Go ahead and drag the home folder down one level into the pages folder. Once that's done double check the app-routing.module.ts has updated the new location of home.

###### app-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Now's a good time to start the app and make sure nothing is breaking.

```
$ ionic serve
```

#### Create the Navigational Flow

The idea for the logical flow is this: We start at login. From there we can attempt to login or navigate to register or navigate to forgot-password. Similarly from register we can attempt to register or navigate to login or navigate to forgot-password. Finally from forgot password we can attempt to send the password reset request which, if successful, we will route to the login page. Or we can route to login page. Let’s get to it! 

Change the default route path in **app-routing.module.ts** so that the login page is the starting page of the app.

```ts
path: '', redirectTo: 'login', pathMatch: 'full'
```
##### Login Page Setup
###### login.page.ts
```ts
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {

  constructor(private router: Router, ) { }

  ngOnInit() { }

  routeToRegisterPage() {
    this.router.navigateByUrl("/register");
  }

  routeToForgotPasswordPage() {
    this.router.navigateByUrl("/forgot-password");
  }

  loginWithEmail() {
    console.log('login button clicked');
  }
}

```
###### login.page.scss
```ts
.auth-options {
    font-size: small;
}

.error-message {
    font-size: small;
    color: var(--ion-color-danger);
}
```
###### login.page.html
```ts
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Sign In
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

  <ion-button expand="block" (click)="loginWithEmail()">Login</ion-button>

  <ion-grid>
    <ion-row>
      <ion-col size="6">
        <div class="ion-text-center">
          <ion-button fill="clear" class="auth-options" (click)="routeToForgotPasswordPage()">Forgot Password?
          </ion-button>
        </div>
      </ion-col>
      <ion-col size="6">
        <div class="ion-text-center">
          <ion-button fill="clear" class="auth-options" (click)="routeToRegisterPage()">New Here?</ion-button>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>

</ion-content>

```
##### Register Page Setup
###### register.page.ts
```ts
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  registerUser() {
    console.log('register button clicked');
  }

  routeToLoginPage() {
    this.router.navigateByUrl("/login");
  }

  routeToForgotPasswordPage() {
    this.router.navigateByUrl("/forgot-password");
  }
}
```
###### register.page.scss
```ts
.auth-options {
    font-size: small;
}

.error-message {
    font-size: small;
    color: var(--ion-color-danger);
}
```
###### register.page.ts
```ts
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Welcome
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

  <ion-button expand="block" (click)="registerUser()">Sign Up!</ion-button>
  <ion-grid>
    <ion-row>
      <ion-col>
        <div class="ion-text-center">
          <ion-button fill="clear" class="auth-options" (click)="routeToLoginPage()">Already Have Account?</ion-button>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>

</ion-content>
```
##### Forgot-Password Page Setup
###### forgot-password.page.ts
```ts
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  resetPassword(): void {
    console.log('reset button clicked');
  }

  routeToRegisterPage() {
    this.router.navigateByUrl('/register');
  }

  routeToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
```
###### forgot-password.page.scss
```ts
.auth-options {
    font-size: small;
}

.error-message {
    font-size: small;
    color: var(--ion-color-danger);
}
```
###### forgot-password.page.scss
```ts
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Forgot My Password
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

  <ion-button expand="block" (click)="resetPassword()">Reset Password</ion-button>

  <ion-grid>
    <ion-row>
      <ion-col size="6">
        <div class="ion-text-center">
          <ion-button fill="clear" class="auth-options" (click)="routeToLoginPage()">Login</ion-button>
        </div>
      </ion-col>
      <ion-col size="6">
        <div class="ion-text-center">
          <ion-button fill="clear" class="auth-options" (click)="routeToRegisterPage()">New Here?</ion-button>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>

</ion-content>
```
Now's another good time to start the app and make sure nothing is breaking.

```
$ ionic serve
```
#### Adding in the Forms
We’re using reactive forms (explanation here)

###### app.module.ts
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
#### Login Page Form
###### login.module.ts
```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
```
###### login.page.ts
```ts
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "Email address is required." },
      { type: "email", message: "The format of the email address invalid." }
    ],
    password: [{ type: "required", message: "Password is required." }]
  };

  constructor(
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required]
    });
  }

  ngOnInit() { }

  routeToRegisterPage() {
    this.resetLoginForm();
    this.router.navigateByUrl("/register");
  }

  routeToForgotPasswordPage() {
    this.resetLoginForm();
    this.router.navigateByUrl("/forgot-password");
  }

  loginWithEmail() {
    let email: string = this.loginForm.get("email").value;
    let password: string = this.loginForm.get("password").value;

    console.log('login button clicked. email is: ' + email + ' and password is: ' + password);
  }

  resetLoginForm() {
    this.loginForm.get("email").setValue("");
    this.loginForm.get("password").setValue("");
    this.loginForm.reset(this.loginForm.value);
    this.loginForm.markAsPristine();
  }
}
```
###### login.page.html
```ts
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Sign In
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

  <form [formGroup]="loginForm" novalidate>
    <ion-item>
      <ion-input formControlName="email" placeholder="Email" type="text"></ion-input>
    </ion-item>
    <div>
      <ng-container *ngFor="let validation of validation_messages.email">
        <div class="error-message"
          *ngIf="loginForm.get('email').hasError(validation.type) && (loginForm.get('email').dirty || loginForm.get('email').touched)">
          {{ validation.message }}
        </div>
      </ng-container>
    </div>

    <ion-item>
      <ion-input formControlName="password" placeholder="Password" type="password"></ion-input>
    </ion-item>
    <div>
      <ng-container *ngFor="let validation of validation_messages.password">
        <div class="error-message"
          *ngIf="loginForm.get('password').hasError(validation.type) && (loginForm.get('password').dirty || loginForm.get('password').touched)">
          {{ validation.message }}
        </div>
      </ng-container>
    </div>
  </form>

  <ion-button expand="block" (click)="loginWithEmail()" [disabled]="loginForm.invalid">Login</ion-button>

  <ion-grid>
    <ion-row>
      <ion-col size="6">
        <div class="ion-text-center">
          <ion-button fill="clear" class="auth-options" (click)="routeToForgotPasswordPage()">Forgot Password?
          </ion-button>
        </div>
      </ion-col>
      <ion-col size="6">
        <div class="ion-text-center">
          <ion-button fill="clear" class="auth-options" (click)="routeToRegisterPage()">New Here?</ion-button>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>

</ion-content>
```
##### Register Page Form
###### register.module.ts
```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
```
###### register.page.ts
```ts
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registrationForm: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "Email address is required." },
      { type: "email", message: "The format of the email address invalid." }
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 8 characters long."
      }
    ]
  };

  constructor(public formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }

  registerUser() {
    let email: string = this.registrationForm.get("email").value;
    let password: string = this.registrationForm.get("password").value;

    console.log('register button clicked. email is: ' + email + ' and password is: ' + password);
  }

  routeToLoginPage() {
    this.resetRegistrationForm();
    this.router.navigateByUrl("/login");
  }

  routeToForgotPasswordPage() {
    this.resetRegistrationForm();
    this.router.navigateByUrl("/forgot-password");
  }

  resetRegistrationForm() {
    this.registrationForm.get("email").setValue("");
    this.registrationForm.get("password").setValue("");
    this.registrationForm.reset(this.registrationForm.value);
    this.registrationForm.markAsPristine();
  }
}
```
###### register.page.html
```ts
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Welcome
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

  <form [formGroup]="registrationForm">

    <ion-item>
      <ion-input formControlName="email" placeholder="Email" type="text"></ion-input>
    </ion-item>
    <div>
      <ng-container *ngFor="let validation of validation_messages.email">
        <div class="error-message"
          *ngIf="registrationForm.get('email').hasError(validation.type) && (registrationForm.get('email').dirty || registrationForm.get('email').touched)">
          {{ validation.message }}
        </div>
      </ng-container>
    </div>

    <ion-item>
      <ion-input formControlName="password" placeholder="Password" type="password"></ion-input>
    </ion-item>
    <div>
      <ng-container *ngFor="let validation of validation_messages.password">
        <div class="error-message"
          *ngIf="registrationForm.get('password').hasError(validation.type) && (registrationForm.get('password').dirty || registrationForm.get('password').touched)">
          {{ validation.message }}
        </div>
      </ng-container>
    </div>

  </form>
  <ion-button expand="block" (click)="registerUser()" [disabled]="registrationForm.invalid">Sign Up!</ion-button>
  <ion-grid>
    <ion-row>
      <ion-col>
        <div class="ion-text-center">
          <ion-button fill="clear" class="auth-options" (click)="routeToLoginPage()">Already Have Account?</ion-button>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>

</ion-content>
```
##### Forgot-Password Page Form
###### forgot-password.module.ts
```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
```
###### forgot-password.page.ts
```ts
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public forgotPasswordForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email address is required.' },
      { type: 'email', message: 'The format of the email address invalid.' },
    ]
  }

  constructor(public formBuilder: FormBuilder, private router: Router) {
    
    this.forgotPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
   }

  ngOnInit() { }

  resetPassword(): void {
    let email: string = this.forgotPasswordForm.get("email").value;

    console.log('reset button clicked. Email address is: ' + email);
  }

  routeToRegisterPage() {
    this.resetForm();
    this.router.navigateByUrl('/register');
  }

  routeToLoginPage() {
    this.resetForm();
    this.router.navigateByUrl('/login');
  }

  resetForm() {
    this.forgotPasswordForm.get("email").setValue("");
    this.forgotPasswordForm.reset(this.forgotPasswordForm.value);
    this.forgotPasswordForm.markAsPristine();
  }
}
```
###### forgot-password.page.html
```ts
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Forgot My Password
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

  <form [formGroup]="forgotPasswordForm">
    <ion-item>
      <ion-input formControlName="email" placeholder="Email" type="text"></ion-input>
    </ion-item>
    <div>
      <ng-container *ngFor="let validation of validation_messages.email">
        <div class="error-message"
          *ngIf="forgotPasswordForm.get('email').hasError(validation.type) && (forgotPasswordForm.get('email').dirty || forgotPasswordForm.get('email').touched)">
          {{ validation.message }}
        </div>
      </ng-container>
    </div>
  </form>

  <ion-button expand="block" (click)="resetPassword()" [disabled]="forgotPasswordForm.invalid">Reset Password</ion-button>

  <ion-grid >
      <ion-row >
        <ion-col size="6">
          <div class="ion-text-center">
            <ion-button fill="clear" class="auth-options" (click)="routeToLoginPage()">Login</ion-button>
          </div>
        </ion-col>
        <ion-col size="6">
          <div class="ion-text-center">
            <ion-button fill="clear" class="auth-options" (click)="routeToRegisterPage()">New Here?</ion-button>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>

</ion-content>
```
Now's another good time to start the app and make sure nothing is breaking.

```
$ ionic serve
```

