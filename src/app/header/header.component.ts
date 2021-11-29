import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub!: Subscription;
  private userNameSub!: Subscription;
  user = this.authService.user.value;
  userName: string;

  constructor(private authService: AuthService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if(user) {
        this.dataStorageService.fetchUsername(user.email).subscribe();
      }
    });
    this.userNameSub = this.dataStorageService.userName.subscribe(userName => {
      this.userName = userName;
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.userNameSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
