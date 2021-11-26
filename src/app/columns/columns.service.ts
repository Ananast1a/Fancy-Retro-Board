import { Injectable } from '@angular/core';
import { Column } from "./column/column.model"
import { Task } from "./column/tasks/task.model";
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take } from "rxjs/operators";
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/observable';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ColumnsService {

    private _updateColumnsSuccessful$: Subject<boolean> = new Subject();
    get updateColumnsSuccessful$(): Observable<boolean> {
        return this._updateColumnsSuccessful$.asObservable();
    }

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }



    fetchColumns() {
        return this.http
            .get<{ [key: string]: Column }>('https://fancy-retro-default-rtdb.firebaseio.com/columns.json')
            .pipe(
                map(responseData => {
                    console.log(responseData);
                    let columns: Column[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            columns.push({ ...responseData[key], id: key })
                        }
                    }
                    console.log(columns);
                    return columns;
                })
            )
    }

    addColumn(name: string) {
        const postData: Column = { title: name, tasks: [], addingItemModeOn: true }
        return this.http
            .post<{ name: string }>(
                'https://fancy-retro-default-rtdb.firebaseio.com/columns.json',
                postData
            )
    }

    removeColumn(column: Column) {
        return this.http
            .delete(`https://fancy-retro-default-rtdb.firebaseio.com/columns/${column.id}.json`)
            .subscribe(response => {
                this._updateColumnsSuccessful$.next(true);
            });
    }

    addTask(column: Column, task: string) {
        const postTask: Task = { content: task, comments: [], likes: 0, commentsVisibility: false }
        console.log('adding task');
        return this.http
            .post<{ name: string }>(`https://fancy-retro-default-rtdb.firebaseio.com/columns/${column.id}/tasks.json`, postTask)
            .subscribe(
                response => {
                    console.log(response);
                    this._updateColumnsSuccessful$.next(true);
                }
            );
    }






    toggleAddingMode(column: Column) {
        column.addingItemModeOn = !column.addingItemModeOn;
    }
}