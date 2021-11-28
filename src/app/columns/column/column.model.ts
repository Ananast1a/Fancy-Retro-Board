import { Task } from "./tasks/task.model";

export class Column {
    public title: string;
    public tasks: Task[];
    public addingItemModeOn: boolean;
    public id?: string;
    public creator: string;

    constructor(title: string, tasks: Task[], addingItemModeOn: boolean, creator: string) {
        this.title = title;
        this.tasks = tasks;
        this.addingItemModeOn = addingItemModeOn;
        this.creator = creator;
    }
}