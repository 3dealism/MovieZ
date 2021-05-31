import {Component, NgModule} from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent{
  isLoading = false;
  constructor(public authService: AuthService, private router: Router) {
  }

  /**
   * Handles a users Signup at a basic level
   * @params form
   */
  onSignup(form: NgForm){
    console.log(form.value);
    console.log('signup component reached');
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
    this.router.navigate(['/']);
  }
}
