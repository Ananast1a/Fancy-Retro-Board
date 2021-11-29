export class Comment {
    author: string;
    content: string;
    creator: string;

    constructor(author: string, content: string, creator: string) {
        this.author = author;
        this.content = content;
        this.creator = creator;
    }
}