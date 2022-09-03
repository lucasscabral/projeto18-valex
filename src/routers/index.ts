import { Router } from "express";
import companiesRouter from "./companiesRouter";
import employeeRoutes from "./employeeRouter";

const router = Router()

router.use(companiesRouter)
router.use(employeeRoutes)

export default router