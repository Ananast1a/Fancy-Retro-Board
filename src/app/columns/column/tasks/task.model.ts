import { Comment } from "./comments/comment.model";

export class Task {
    content: string;
    comments: Comment[];
    likes: string[];
    commentsVisibility: boolean;

    constructor(content: string, comments: Comment[], likes: string[], commentsVisibility: boolean) {
        this.content = content;
        this.comments = comments;
        this.likes = likes;
        this.commentsVisibility = commentsVisibility;
    }
}