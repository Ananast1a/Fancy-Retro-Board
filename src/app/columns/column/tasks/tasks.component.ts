import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Comment } from './comments/comment.model';
import { Task } from './task.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() task!: Task;
  @ViewChild('commentForm', {static: false}) commentForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCommentsVisibility() {
    this.task.commentsVisibility = !this.task.commentsVisibility;
  }

  toAddComment() {
      this.task.comments.push(new Comment('Unknown', this.commentForm.value.comment_text));
      this.commentForm.reset();
  }
}
