import { Task } from "./tasks/task.model";

export class Column {
    public title: string;
    public tasks: Task[];
    public id: number;
    public addingItemModeOn: boolean;

    constructor(title: string, tasks: Task[], id: number, addingItemModeOn: boolean) {
        this.title = title;
        this.tasks = tasks;
        this.id = id;
        this.addingItemModeOn = addingItemModeOn;
    }
}