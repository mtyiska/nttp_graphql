import { Resolver, Query } from "type-graphql";
import { getRepository } from "typeorm";

import {Post} from "../entities//post.entity";

@Resolver(() => Post)
export default class PostResolver {
  @Query(() => [Post], { description: "Get all blog posts" })
  async blogs(): Promise<Post[]> {
    const blogRepository = getRepository(Post);
    return blogRepository.find();
  }
}