import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";
import { Comment } from "./comment.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    
    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @OneToMany((_type) => Post, (post: Post) => post.user)
    posts!: Array<Post>;

    @OneToMany((_type) => Comment, (comment: Comment) => comment.user)
    comments!: Array<Comment>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}