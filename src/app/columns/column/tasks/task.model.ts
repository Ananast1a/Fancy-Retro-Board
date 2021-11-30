import { Comment } from "./comments/comment.model";

export class Task {
    content: string;
    comments: Comment[];
    likes: string[];
    commentsVisibility: boolean;
    creator: string;

    constructor(content: string, comments: Comment[], likes: string[], commentsVisibility: boolean, creator: string) {
        this.content = content;
        this.comments = comments;
        this.likes = likes;
        this.commentsVisibility = commentsVisibility;
        this.creator = creator;
    }
}