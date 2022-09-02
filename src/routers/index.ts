import { Router } from "express";
import companiesRouter from "./companiesRouter";

const router = Router()

router.use(companiesRouter)

export default router