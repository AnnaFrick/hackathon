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

  async addRoom (req, res, next) {
    try {
      const { name, size, startTime, endTime, date } = req.body
      await RoomModel.create({
        name,
        size,
        startTime,
        endTime,
        date
      })

      res
        .status(201)
    } catch (err) {
      next(err)
    }
  }

  async bookRoom (req, res, next) {
    try {
      const roomId = req.params.id
      if (!roomId) {
        throw new Error('id required')
      }
      const room = await RoomModel.findById(roomId)
      if (room) {
        if (room.booked) {
          res
            .status(400)
            .json({message: 'room is already booked'})
        } else {
          room.booked = true
          await room.save()
          res
            .status(200)
            .json({message: 'room booked'})
        }
      } else {
        throw new Error('invalid room id')
      }
    } catch (err) {
      next(err)
    }
  }
}
