import {getRepository} from "typeorm";
import {Post} from "../entities/post.entity";


export interface IPostPayload {
  title: string;
  content: string;
  userId: string;
}

export class PostService {
    async getPosts(): Promise<Array<Post>>{
        const postRepository = getRepository(Post);
        return postRepository.find();
    };

    async createPost(payload: IPostPayload): Promise<Post>{
        const postRepository = getRepository(Post);
        const post = new Post();
        return postRepository.save({
            ...post,
            ...payload,
        });
    };

    async getPost(id: string): Promise<Post | null> {
        const postRepository = getRepository(Post);
        const post = await postRepository.findOne({ id: id });
        if (!post) return null;
        return post;
    };
}
