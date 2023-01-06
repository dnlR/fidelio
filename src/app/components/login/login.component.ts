import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  linkSuccess = false;
  formGroupLogin!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.auth.currentUser.subscribe((user) => {
      if (user) {
        // TODO
        this.router.navigateByUrl('/fill-user-info', { replaceUrl: true});
      }
    });
  }

  ngOnInit() {
    this.formGroupLogin = new FormGroup({
      'emailControl': new FormControl('', [Validators.required, Validators.email])
    })
  }

  async signIn() {
    if (this.formGroupLogin.valid) {
      this.spinner.show();
      const result = await this.auth.signInWithEmail(this.email);
  
      this.spinner.hide();
      if (!result.error) {
        this.linkSuccess = true;
      } else {
        // alert(result.error.message);
        alert(`Currently we do not support that email provider. Try a different one please.`);
      }
    }
  }
}
