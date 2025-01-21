import { RoomModel } from "../models/model.js"

export class Controller {
  hello(req, res, next) {
    try {
      res.status(200).send({ message: "hello world" })
    } catch (err) {
      next(err)
    }
  }

  async getRooms(req, res, next) {
    try {
      const rooms = await RoomModel.find()

      res.status(200).json({
        rooms
      })
    } catch (err) {
      next(err)
    }
  }

  async getRoom(req, res, next) {
    try {
      let roomName = null
      if (req.query?.room) {
        roomName = req.query.room
      } else if (req.body?.room) {
        roomName = req.body.room
      }

      if (!roomName) {
        res.status(400).json({
          message: "Room name is required"
        })
        return
      }

      const rooms = await RoomModel.find({ name: roomName })

      res.status(200).json({
        rooms
      })
    } catch (err) {
      next(err)
    }
  }
}
