import {User} from "../entities/user.entity";
import { UserService,IUserPayload } from "../services/userService";

export default class UserController {
    private userService;
    constructor(){
         this.userService = new UserService();
    }

    public async getUsers(): Promise<Array<User>>{
        return this.userService.getUsers();
    }
    public async createUser(body: IUserPayload): Promise<User>{
        return this.userService.createUser(body);
    }
    public async getUser(id: string): Promise<User | null>{
        return this.userService.getUser(id);
    }
}