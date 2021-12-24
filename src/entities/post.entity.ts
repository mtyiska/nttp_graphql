import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";

import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType({ description: "Object containing blog posts" })
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field({
    nullable: false,
  })
  @Column({
    nullable: false,
  })
  title!: string;

  @Field({
    nullable: false,
  })
  @Column({
    type: "text",
    nullable: false
  })
  content!: string;

  @Field()
  @Column({ nullable: true })
  userId!: string;
  @ManyToOne((_type) => User, (user: User) => user.posts)
  @JoinColumn()
  user!: User;

  
  @OneToMany((_type) => Comment, (comment: Comment) => comment.post)
  comments!: Array<Comment>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}