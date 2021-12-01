import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

import { Column } from "../columns/column/column.model";
import { ColumnsService } from "../columns/columns.service"

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  userName = new BehaviorSubject<string>(null);

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
          if (columns) {
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
          } else {
            return [];
          }
        }),
        tap(columns => {
          this.columnsService.setColumns(columns);
        })
      )
  }

  storeUsername(email: string, username: string) {
    const user = {
      email: email,
      username: username
    }
    return this.http
      .post(
        `https://fancy-retro-default-rtdb.firebaseio.com/users.json`,
        user
      )
  }

  fetchUsername(email: string) {
    return this.http
      .get(
        `https://fancy-retro-default-rtdb.firebaseio.com/users.json`,
      )
      .pipe(
        map(users => {
          const usersArr = Object.entries(users).map(([key, value]) => {
            return {
              ...value,
            }
          });
          const result = usersArr.filter(item => {
            if (item.email === email) {
              return item.username;
            }
          })[0].username;
          this.userName.next(result);
        })
      )
  }

}