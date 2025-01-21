import { Controller } from "../controllers/controller.js"
import { Router } from "express"

export const router = new Router()
const c = new Controller()

router.get("/", (req, res, next) => c.hello())
