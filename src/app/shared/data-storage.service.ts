import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

import { Column } from "../columns/column/column.model";
import { ColumnsService } from "../columns/columns.service"

@Injectable({providedIn:'root'})
export class DataStorageService {

    constructor(private http: HttpClient, private columnsService: ColumnsService) {
    }

    storeColumns() {
        const columns = this.columnsService.getColumns();
        this.http
          .put(
            'https://fancy-retro-default-rtdb.firebaseio.com/columns.json',
            columns
          )
          .subscribe(response => {
            console.log(response);
            this.fetchColumns();
          });
      }
    
      fetchColumns() {
        return this.http
          .get<Column[]>(
            'https://fancy-retro-default-rtdb.firebaseio.com/columns.json'
          )
          .pipe(
            map((columns: Column[]) => {
              return columns.map(column => {
                return {
                  ...column,
                  tasks: column.tasks ? column.tasks.map(task => {
                      return {
                          ...task,
                          comments: task.comments ? task.comments : [],
                          likes: task.likes ? task.likes : []
                      }
                  }) : []
                };
              });
            }),
            tap(columns => {
              this.columnsService.setColumns(columns);
            })
          )
      }
    
}