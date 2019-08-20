import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router) {}

  password = '';
  ngOnInit() {}

  logIn() {
    if (this.password === environment.pin) {
      this.router.navigate(['dashboard']);
    }
  }
}
