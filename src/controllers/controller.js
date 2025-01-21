import { RoomModel } from '../models/model.js'

export class Controller {
  hello(req, res, next) {
    try {
      res.status(200).send({ message: "hello world" })
    } catch (err) {
      next(err)
    }
  }

  async getRooms (req, res, next) {
    try {
      const rooms = (await RoomModel.find())
          .map(room => room.toObject())

      res
        .status(200)
        .json({
          rooms
        })
    } catch (err) {
      next(err)
    }
  }
}
