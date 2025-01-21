import { MongooseError } from "mongoose"
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

  async addRoom(req, res, next) {
    try {
      const { name, size, startTime, endTime, date } = req.body
      const room = await RoomModel.create({
        name,
        size,
        startTime,
        endTime,
        date
      })

      res.status(201).send({ id: room._id })
    } catch (err) {
      if (err instanceof MongooseError.ValidationError) {
        res.status(400).json({ error: err.message })
      }
      next(err)
    }
  }

  async bookRoom(req, res, next) {
    try {
      const id = req.params?.id

      if (!id) {
        res.status(400).json({
          message: "Room ID is required"
        })
        return
      }

      const room = await RoomModel.findById(id)
      if (!room) {
        res.status(404).json({
          message: "Room not found"
        })
        return
      }

      if (room.booked) {
        res.status(400).json({
          message: "Room is already booked"
        })
        return
      }

      room.booked = true
      await room.save()

      res.status(200).json({
        message: "Room booked successfully"
      })
    } catch (err) {
      next(err)
    }
  }

  async populate(req, res, next) {
    await RoomModel.insertMany([
      {
        name: "Johan",
        size: 10,
        startTime: "09:00",
        endTime: "10:00",
        date: "2021-10-01"
      },
      {
        name: "Steve",
        size: 5,
        startTime: "10:00",
        endTime: "11:00",
        date: "2021-10-01"
      },
      {
        name: "Chris",
        size: 15,
        startTime: "11:00",
        endTime: "12:00",
        date: "2021-10-01"
      },
      {
        name: "Ada",
        size: 20,
        startTime: "12:00",
        endTime: "13:00",
        date: "2021-10-01"
      },
      {
        name: "Johan",
        size: 10,
        startTime: "13:00",
        endTime: "14:00",
        date: "2021-10-01"
      },
      {
        name: "Steve",
        size: 5,
        startTime: "14:00",
        endTime: "15:00",
        date: "2021-10-01"
      },
      {
        name: "Chris",
        size: 15,
        startTime: "15:00",
        endTime: "16:00",
        date: "2021-10-01"
      },
      {
        name: "Ada",
        size: 20,
        startTime: "16:00",
        endTime: "17:00",
        date: "2021-10-01"
      },
      {
        name: "Johan",
        size: 10,
        startTime: "17:00",
        endTime: "18:00",
        date: "2021-10-01"
      },
      {
        name: "Steve",
        size: 5,
        startTime: "18:00",
        endTime: "19:00",
        date: "2021-10-01"
      },
      {
        name: "Chris",
        size: 15,
        startTime: "19:00",
        endTime: "20:00",
        date: "2021-10-01"
      },
      {
        name: "Ada",
        size: 20,
        startTime: "20:00",
        endTime: "21:00",
        date: "2021-10-01"
      }
    ])
  }
}
