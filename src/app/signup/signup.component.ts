import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }



  username = new FormControl();
  name = new FormControl();
  password = new FormControl();
  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: this.username,
      name: this.name,
      password: this.password
    })

  }

  signup() {
    let data = this.signupForm.value;
    console.log(data)
    this.authService.signup(data).subscribe();
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

}
