import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "text",
  })
  comment!: string;

  @Column({ nullable: true })
  userId!: string;
  @ManyToOne((_type) => User, (user: User) => user.comments)
  @JoinColumn()
  user!: User;

  @Column({ nullable: true })
  postId!: string;
  @ManyToOne((_type) => Post, (post: Post) => post.comments)
  @JoinColumn()
  post!: Post;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
