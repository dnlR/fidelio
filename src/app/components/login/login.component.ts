import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/utils/error-state-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  linkSuccess = false;
  formGroupLogin!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.auth.currentUser.subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/fill-user-info', { replaceUrl: true });
      }
    });
  }

  ngOnInit() {
    this.formGroupLogin = new FormGroup({
      'emailControl': new FormControl('', [Validators.required, Validators.email])
    });
  }

  async signIn() {
    if (this.formGroupLogin.valid) {
      this.spinner.show();
      const email = this.formGroupLogin.get('emailControl').value;
      const result = await this.auth.signInWithEmail(email);

      this.spinner.hide();
      if (!result.error) {
        this.linkSuccess = true;
      } else {
        alert(`Currently we do not support that email provider. Try a different one please.`);
      }
    }
  }
}
