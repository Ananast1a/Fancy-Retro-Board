import { Injectable } from '@angular/core';
import { Column } from "./column/column.model"
import { Task } from "./column/tasks/task.model";
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ColumnsService {
    columnsChanged = new Subject<Column[]>();
    private columns: Column[] = [];
    user = this.authService.user.value;

    constructor(private authService: AuthService
    ) {}

    toggleAddingMode(column: Column) {
        column.addingItemModeOn = !column.addingItemModeOn;
    }

    setColumns(columns: Column[]) {
        this.columns = columns;
        this.columnsChanged.next(this.columns.slice());
    }

    getColumns() {
        return this.columns.slice();
    }

    addColumn(column: Column) {
        this.columns.push(column);
        this.columnsChanged.next(this.columns.slice());
    }

    removeColumn(column: Column) {
        const index = this.columns.indexOf(column);
        this.columns.splice(index, 1);
        this.columnsChanged.next(this.columns.slice());
    }

    addTask(column: Column, task: string) {
        column.tasks.push(new Task(task, [], [], false))
        this.columnsChanged.next(this.columns.slice());
    }
}