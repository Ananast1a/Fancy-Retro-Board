import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { ColumnsService } from './columns.service';
import { Column } from './column.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from './tasks/task.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;
  @ViewChild('taskTextInput', {static: false}) taskTextInput!: ElementRef;

  constructor(private columnsService: ColumnsService) { }

  ngOnInit(): void {
  }

  toAddTask(column: Column) {
      this.columnsService.addTask(column, this.taskTextInput.nativeElement.value);
      this.taskTextInput.nativeElement.value = '';
  }

  toToggleAddingMode(column: Column) {
    console.log('column event fired')
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
