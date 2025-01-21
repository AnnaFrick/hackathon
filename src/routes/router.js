import { Controller } from "../controllers/controller"
import { Router } from "express"

export const router = Router()
const c = Controller()

router.get("/", (req, res, next) => c.hello)
