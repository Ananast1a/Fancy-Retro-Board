import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  error!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmitReg(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.authService.signUp(email, password)
    .subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    }
    );
    form.reset();
  }

}
