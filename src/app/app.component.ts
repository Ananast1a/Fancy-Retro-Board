import { Component, OnInit } from '@angular/core';
import { ColumnsService } from './columns/columns.service';
import { Column } from './columns/column/column.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ColumnsService]
})
export class AppComponent implements OnInit {
  title = 'fancy-retro-board';
  
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoLogin();
  }
}
