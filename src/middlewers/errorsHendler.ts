import { Request, Response, NextFunction } from "express";

export default async function errorsHendler(error: any, req: Request, res: Response, next: NextFunction) {
    try {
        if (error.code === "NotFound") {
            return res.status(404).send(error.message)
        }
    } catch (error) {
        res.sendStatus(500)
    }
}