import {getRepository} from "typeorm";
import {User} from "../entities/user.entity";


export interface IUserPayload {
    firstName: string;
    lastname: string;
    email: string;
}

export class UserService {
    async getUsers(): Promise<Array<User>>{
        const userRepository = getRepository(User);
        return userRepository.find();
    };

    async createUser(payload: IUserPayload): Promise<User>{
        const userRepository = getRepository(User);
        const user = new User();
        return userRepository.save({
            ...user,
            ...payload,
        });
    };

    async getUser(id: string): Promise<User | null> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ id: id });
        if (!user) return null;
        return user;
    };
}
