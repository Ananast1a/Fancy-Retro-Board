import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Column } from './column/column.model';
import { ColumnsService } from './columns.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit, OnDestroy {
  @ViewChild('boardForm', {static: false}) boardForm!: NgForm;
  columns!: Column[];
  removeColumnSuccessfulSub!: Subscription;

  constructor(private columnsService: ColumnsService) {
  }

  ngOnInit() {
    this.columnsService.fetchColumns()
    .subscribe(columns => {
      this.columns = columns;
    })

    this.removeColumnSuccessfulSub = this.columnsService.updateColumnsSuccessful$
    .subscribe(
      () => this.columnsService.fetchColumns()
      .subscribe(columns => {
        this.columns = columns;
      })
    )
    
  }

  ngOnDestroy() {
    this.removeColumnSuccessfulSub.unsubscribe();
  }

  createColumn() {
      this.columnsService.addColumn(this.boardForm.value.board_name)
      .subscribe(
        () => this.columnsService.fetchColumns()
        .subscribe(columns => {
          this.columns = columns;
        })
      );
      this.boardForm.reset();
  } 
}
