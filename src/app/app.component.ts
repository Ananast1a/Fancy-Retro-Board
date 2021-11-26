import { Component, OnInit } from '@angular/core';
import { ColumnsService } from './columns/columns.service';
import { Column } from './columns/column/column.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ColumnsService]
})
export class AppComponent implements OnInit {
  title = 'fancy-retro-board';
  
  ngOnInit() {

  }
}
