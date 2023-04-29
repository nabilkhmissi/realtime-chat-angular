import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router, private activatedRoute: ActivatedRoute) {

  }


  username = new FormControl('');
  password = new FormControl('');
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    })

  }

  login() {
    let data = this.loginForm.value;
    this.authService.login(data).subscribe()
  }

  goToSignup() {
    this.router.navigate(['/login'])
  }


}
