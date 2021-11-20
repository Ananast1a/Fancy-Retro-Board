import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Column } from './column/column.model';
import { ColumnsService } from './column/columns.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {
  @ViewChild('boardNameInput', {static: false}) boardNameInput!: ElementRef;
  columns!: Column[];

  constructor(private columnsService: ColumnsService) {
  }

  ngOnInit() {
    this.columns = this.columnsService.getColumns();
    this.columnsService.columnsChanged
    .subscribe(
      (columns: Column[]) => {
        this.columns = columns;
      }
    )
  }
  createColumn() {
    this.columnsService.addColumn(this.boardNameInput.nativeElement.value);
  }

  
}
