import { Controller } from "../controllers/controller.js"
import { Router } from "express"

export const router = new Router()
const c = new Controller()

router.get("/", (req, res, next) => c.hello(req, res, next))
router.get("/room", (req, res, next) => c.getRoom(req, res, next))
router.get("/rooms", (req, res, next) => c.getRooms(req, res, next))

router.post("/room", (req, res, next) => c.addRoom(req, res, next))

router.post("/book/:id", (req, res, next) => c.bookRoom(req, res, next))

router.post("/populate", (req, res, next) => c.populate(req, res, next))

// If no other routes are find return 404
router.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" })
})
