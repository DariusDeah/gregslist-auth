import { Auth0Provider } from '@bcwdev/auth0provider'
import { carsService } from '../services/CarsService.js'
import BaseController from '../utils/BaseController.js'
import { logger } from '../utils/Logger.js'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getCars)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCar)
      .get('/:id', this.getCarById)
      .delete('/:id', this.removeCar)
      .put('/:id', this.editCar)
  }

  // this get cars functions get all the card in my database
  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars()
      res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  // thid getcarbyid get cars by their specidic id
  async getCarById(req, res, next) {
    try {
      const car = await carsService.getCarById(req.params.id)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  // create cars is a posr function that allows users to add a new car ti the database
  async createCar(req, res, next) {
    try {
      logger.log('who is user', req.userInfo)
      req.body.creatorId = req.userInfo.id
      const car = await carsService.createCar(req.body)

      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  // thisd remove car funticon removes car by the id but the creator tag needs to match the user that is trying to delete
  async removeCar(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const car = await carsService.removeCar(req.params.id, req.userInfo.id)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  // this edit car is a put method that allows the user to edit car details cureent user idea neeeds to mathc creator id
  async editCar(req, res, next) {
    try {
      // this is saying that the request body creator id is equal to to the request userinfo id
      req.body.creatorId = req.userInfo.id
      // thodsets the car varible to equal the car service edit car function
      const car = await carsService.editCar(req.params.id, req.userInfo.id, req.body)
      // this sends the car edited info back to the client
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
}
