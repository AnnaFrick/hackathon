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
      const rooms = (await RoomModel.find()).map((room) => room.toObject())

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
      if (req.param?.room) {
        roomName = req.param.room
      } else if (req.body?.room) {
        roomName = req.body.room
      }
      const rooms = (await RoomModel.find({ name: roomName })).map((room) => room.toObject())

      res.status(200).json({
        rooms
      })
    } catch (err) {
      next(err)
    }
  }

  async addRoom (req, res, next) {
    try {
      const { name, size, startTime, endTime, date } = req.body
      const roomDocument = await RoomModel.
    } catch (err) {
      next(err)
    }
  }
}
