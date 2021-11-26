import { Task } from "./tasks/task.model";

export class Column {
    public title: string;
    public tasks: Task[];
    public addingItemModeOn: boolean;
    public id?: string;

    constructor(title: string, tasks: Task[], addingItemModeOn: boolean) {
        this.title = title;
        this.tasks = tasks;
        this.addingItemModeOn = addingItemModeOn;
    }
}