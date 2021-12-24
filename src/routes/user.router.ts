import express, { Request, Response } from "express";

import UserController from "../controllers/userController";

const router = express.Router();

router.get("/", async (_req: Request, res: Response)=>{
    try {
        const controller = new UserController();
        const response = await controller.getUsers();
        return res.send(response);
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

router.post("/", async (req: Request, res: Response)=>{
    try {
        const controller = new UserController();
        const response = await controller.createUser(req.body);
        return res.send(response);
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

router.get("/:id", async (req: Request, res: Response)=>{
    try {
        const controller = new UserController();
        const response = await controller.getUser(req.params.id);
        if (!response) res.status(404).send({ message: "No user found" });
        return res.send(response);
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

export default router