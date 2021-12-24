import express, { Request, Response } from "express";

import CommentController from "../controllers/commentController";

const router = express.Router();

router.get("/", async (_req: Request, res: Response)=>{
    try {
        const comment = new CommentController();
        const response = await comment.getComments();
        return res.send(response);
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

router.post("/", async (req: Request, res: Response)=>{
    try {
        const comment = new CommentController();
        const response = await comment.createComment(req.body);
        return res.send(response);
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

router.get("/:id", async (req: Request, res: Response)=>{
    try {
        const comment = new CommentController();
        const response = await comment.getComment(req.params.id);
        if (!response) res.status(404).send({ message: "No comment found" });
        return res.send(response);
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

export default router