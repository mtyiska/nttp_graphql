import express, { Request, Response } from "express";

import UserRouter from "./user.router";
import PostRouter from "./post.router";
import CommentRouter from "./comment.router";
import PingRouter from "./ping.router";

const router = express.Router();

router.use("/ping", PingRouter);
router.use("/users", UserRouter);
router.use("/posts", PostRouter);
router.use("/comments", CommentRouter);


export default router;