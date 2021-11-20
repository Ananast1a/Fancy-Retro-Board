import { Column } from "./column.model"
import { Comment } from "./tasks/comments/comment.model";
import { Task } from "./tasks/task.model";
import { EventEmitter } from "@angular/core";

export class ColumnsService {
    columnsChanged = new EventEmitter<Column[]>();
    columnId = 0;

    private columns: Column[] = [
        new Column('Well done tasks', [
            new Task('Create main components', [
                new Comment('John Doe', 'Great job Anastasia'),
                new Comment('Collegue X', 'Brilliant!'),
            ], 2, false),
            new Task('Implement desing of my buddy', [
                new Comment('Vladik', 'Sounds good'),
            ], 0, false)
        ], this.columnId++,
        true),
        new Column('Tasks being implemented now', [
            new Task('Quite important work', [
                new Comment('John Doe', 'Great job Anastasia'),
            ], 39, true),
            new Task('Bind elements and outputs', [
                new Comment('John Doe', 'Great job Anastasia'),
                new Comment('Mary Jane Watson', 'Brilliant!'),
            ], 39, true),
        ], this.columnId++, false),
        new Column('To-do tasks', [
            new Task('Create back-end part.', [
                new Comment('John Doe', 'Great job Anastasia'),
                new Comment('Love Joe', 'Brilliant!'),
            ], 5, false),
            new Task('Create authorization pages and add routing', [
            ], 0, false),
        ], this.columnId++, false),
    ]

    newColumnName!: string;

    getColumns() {
        return this.columns.slice();
    }

    addColumn(name: string) {
        this.newColumnName = name;
        this.columns.push(
            new Column(
                this.newColumnName,
                [],
                this.columnId++,
                false
            )
        )
        this.columnsChanged.emit(this.columns.slice());
    }

    addTask(column: Column, task: string) {
        console.log(column, task);
        column.tasks.push(new Task(task, [], 0, false));
    }


    removeColumn(column: Column) {
        const index = this.columns.indexOf(column);
        this.columns.splice(index, 1);
        this.columnsChanged.emit(this.columns.slice());
    }

    toggleAddingMode(column: Column) {
        column.addingItemModeOn = !column.addingItemModeOn;
        this.columnsChanged.emit(this.columns.slice());
    }
}