import {getRepository} from "typeorm";
import {Comment} from "../entities/comment.entity";


export interface ICommentPayload {
  comment: string;
  postId: string;
  userId: string;
}

export class CommentService {
    async getComments(): Promise<Array<Comment>>{
        const commentRepository = getRepository(Comment);
        return commentRepository.find();
    };

    async createComment(payload: ICommentPayload): Promise<Comment>{
        const commentRepository = getRepository(Comment);
        const comment = new Comment();
        return commentRepository.save({
            ...comment,
            ...payload,
        });
    };

    async getComment(id: string): Promise<Comment | null> {
        const commentRepository = getRepository(Comment);
        const comment = await commentRepository.findOne({ id: id });
        if (!comment) return null;
        return comment;
    };
}
