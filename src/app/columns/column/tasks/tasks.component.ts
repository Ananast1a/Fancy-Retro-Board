import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Comment } from './comments/comment.model';
import { Task } from './task.model';
import { NgForm } from '@angular/forms';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() task!: Task;
  @Output () taskDeleted = new EventEmitter<Task>();
  @ViewChild('commentForm', { static: false }) commentForm!: NgForm;
  user = this.authService.user.value;
  userName = this.dataStorageService.userName.value;
  isLiked: boolean;

  constructor(private dataStorageService: DataStorageService,
  private authService: AuthService) { }

  ngOnInit(): void {
    this.isLiked = this.task.likes.includes(this.user.id) ? true : false;
    this.task.commentsVisibility = false;
  }

  toggleCommentsVisibility() {
    this.task.commentsVisibility = !this.task.commentsVisibility;
  }

  toAddComment() {
    const userName = this.dataStorageService.userName.value;
    this.task.comments.push(new Comment(userName, this.commentForm.value.comment_text, this.user.id));
    this.commentForm.reset();
    this.dataStorageService.storeColumns();
  }

  toAddLike() {
    if (this.isLiked) {
      const index = this.task.likes.indexOf(this.user.id);
      this.task.likes.splice(index, 1);
      this.isLiked = !this.isLiked;
    } else {
      this.task.likes.push(this.user.id);
      this.isLiked = !this.isLiked;
    }
    this.dataStorageService.storeColumns();
  }

  onTaskDelete() {
    const deletionConf = confirm("Are you sure you want to delete this item?");
    if (deletionConf && this.task.creator === this.user.id) {
      this.taskDeleted.emit(this.task);
    }
  }

  deleteComment(comment: Comment) {
    const index = this.task.comments.indexOf(comment);
    this.task.comments.splice(index, 1);
    this.dataStorageService.storeColumns();
  }
}
