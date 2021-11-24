import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { ColumnsService } from './columns.service';
import { Column } from './column.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from './tasks/task.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;
  @ViewChild('taskForm', {static: false}) taskForm!: NgForm;

  constructor(private columnsService: ColumnsService) { }

  ngOnInit(): void {
  }

  toAddTask(column: Column) {
    this.columnsService.addTask(column, this.taskForm.value.task_text);
    this.taskForm.reset();
  }

  toToggleAddingMode(column: Column) {
    this.columnsService.toggleAddingMode(column);
  }

  toRemoveColumn(column: Column) {
    this.columnsService.removeColumn(column);
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
  }

}
