import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Column } from './column/column.model';
import { ColumnsService } from './columns.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { ExcelService } from '../shared/excel.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit, OnDestroy {

  @ViewChild('boardForm', { static: false }) boardForm!: NgForm;

  columns: Column[];
  updateColumnsSubscription: Subscription;
  columnTableVisibility = false;
  user = this.authService.user.value;


  constructor(private columnsService: ColumnsService,
    private dataStorageService: DataStorageService,
    private excelService: ExcelService,
    private authService: AuthService) {
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
    this.columnsService.addColumn(new Column(this.boardForm.value.board_name, [], false, this.user.id));
    this.dataStorageService.storeColumns();
    this.boardForm.reset();
  }

  exportColumnsAsExcel() {
    const columnsForExport: { column_title: string; tasks: string; }[] = [];
    function getFormattedCol(column: Column) {
      return {
        column_title: column.title,
        tasks: column.tasks.map(task => {
          return task.content
        }).join(', ')
      }
    }

    this.columns.forEach(column => {
      columnsForExport.push(getFormattedCol(column));
    })

    this.excelService.exportAsExcelFile(columnsForExport, 'columns_list'); 
  }

}
