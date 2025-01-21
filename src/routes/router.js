import { Controller } from "../controllers/controller.js"
import { Router } from "express"

export const router = new Router()
const c = new Controller()

router.get("/", (req, res, next) => c.hello(req, res, next))

router.get("/room", (req, res, next) => c.getRoom(req, res, next))

router.get("/rooms", (req, res, next) => c.getRooms(req, res, next))

router.post("/room", (req, res, next) => c.addRoom(req, res, next))
