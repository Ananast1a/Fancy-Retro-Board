import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Column } from './column/column.model';
import { ColumnsService } from './columns.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit, OnDestroy {

  @ViewChild('boardForm', { static: false }) boardForm!: NgForm;

  columns: Column[];
  updateColumnsSubscription: Subscription;

  constructor(private columnsService: ColumnsService,
    private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.dataStorageService.fetchColumns().subscribe(
      columns => {
        this.columns = columns;
      }
    );
    this.updateColumnsSubscription = this.columnsService.columnsChanged
      .subscribe(
        (columns: Column[]) => {
          this.columns = columns;
        }
      );
  }

  ngOnDestroy() {
    this.updateColumnsSubscription.unsubscribe();
  }

  createColumn() {
    this.columnsService.addColumn(new Column(this.boardForm.value.board_name, [], false));
    this.dataStorageService.storeColumns();
    this.boardForm.reset();
  }

}
