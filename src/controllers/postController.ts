import {Post} from "../entities/post.entity";
import { PostService, IPostPayload } from "../services/postService";

export default class UserController {
    private postService;
    constructor(){
         this.postService = new PostService();
    }

    public async getPosts(): Promise<Array<Post>>{
        return this.postService.getPosts();
    }
    public async createPost(body: IPostPayload): Promise<Post>{
        return this.postService.createPost(body);
    }
    public async getPost(id: string): Promise<Post | null>{
        return this.postService.getPost(id);
    }
}