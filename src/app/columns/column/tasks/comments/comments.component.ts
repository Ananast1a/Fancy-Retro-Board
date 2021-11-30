import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Comment } from './comment.model';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comment!: Comment;
  @Output() commentDeleted = new EventEmitter<Comment>();
  user = this.authService.user.value;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onCommentDelete() {
    const deletionConf = confirm("Are you sure you want to delete this comment?");
    if (deletionConf && this.comment.creator === this.user.id) {
      this.commentDeleted.emit(this.comment);
    }
  }
}
