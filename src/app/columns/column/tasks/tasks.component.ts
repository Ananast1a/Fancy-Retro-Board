import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Comment } from './comments/comment.model';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() task!: Task;
  @ViewChild('commentTextInput', {static: false}) commentTextInput!: ElementRef;

  constructor() { }

  ngOnInit(): void {

  }

  toggleCommentsVisibility() {
    this.task.commentsVisibility = !this.task.commentsVisibility;
  }

  toAddComment() {
    this.task.comments.push(new Comment('Unknown', this.commentTextInput.nativeElement.value));
    this.commentTextInput.nativeElement.value = '';
  }
}
