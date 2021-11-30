import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { ColumnsService } from '../columns.service';
import { Column } from './column.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from './tasks/task.model';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;
  @ViewChild('taskForm', { static: false }) taskForm!: NgForm;
  user = this.authService.user.value;

  constructor(private columnsService: ColumnsService,
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.column.addingItemModeOn = false;
  }

  toAddTask(column: Column) {
    this.columnsService.addTask(column, this.taskForm.value.task_text);
    this.taskForm.reset();
    this.dataStorageService.storeColumns();
  }

  deleteTask(task: Task) {
    const index = this.column.tasks.indexOf(task);
    this.column.tasks.splice(index, 1);
    console.log(this.column);
    this.dataStorageService.storeColumns();
  }

  toToggleAddingMode(column: Column) {
    this.columnsService.toggleAddingMode(column);
  }

  toRemoveColumn(column: Column) {
    const deletionConf = confirm("Are you sure you want to delete this column?");
    if (deletionConf) {
      this.columnsService.removeColumn(column);
      this.dataStorageService.storeColumns();
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.dataStorageService.storeColumns();
  }

}
