import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  error!: string;

  constructor(private authService: AuthService,
    private dataStorageService: DataStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitReg(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    this.isLoading = true;
    this.authService.signUp(email, password)
    .subscribe(resData => {
      this.isLoading = false;
      this.dataStorageService.storeUsername(email, username)
      .subscribe(() => {
        this.dataStorageService.fetchUsername(email)
        .subscribe(() => {
        }
        )
      })
      this.router.navigate(['/boards']);

    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });
    form.reset();
  }

}
