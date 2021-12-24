import {Comment} from "../entities/comment.entity";
import { CommentService, ICommentPayload } from "../services/commentService";

export default class UserController {
    private commentService;
    constructor(){
         this.commentService = new CommentService();
    }

    public async getComments(): Promise<Array<Comment>>{
        return this.commentService.getComments();
    }
    public async createComment(body: ICommentPayload): Promise<Comment>{
        return this.commentService.createComment(body);
    }
    public async getComment(id: string): Promise<Comment | null>{
        return this.commentService.getComment(id);
    }
}