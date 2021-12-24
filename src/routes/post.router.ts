import express, { Request, Response } from "express";

import PostController from "../controllers/postController";

const router = express.Router();

router.get("/", async (_req: Request, res: Response)=>{
    try {
        const post = new PostController();
        const response = await post.getPosts();
        return res.send(response);
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

router.post("/", async (req: Request, res: Response)=>{
    try {
        const post = new PostController();
        const response = await post.createPost(req.body);
        return res.send(response);
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

router.get("/:id", async (req: Request, res: Response)=>{
    try {
        const post = new PostController();
        const response = await post.getPost(req.params.id);
        if (!response) res.status(404).send({ message: "No post found" });
        return res.send(response);
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

export default router