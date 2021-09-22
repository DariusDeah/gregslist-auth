import { query } from 'express'
import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'
import { logger } from '../utils/Logger.js'
class CarService {
  async getCars(req) {
    // // !Filtering
    // //! Build Query
    // const queryObj = { ...req.query }
    // // fields we want exclude out of this query search
    // const excludedFields = ['page', 'sort', 'limit', 'fields']
    // excludedFields.forEach(ef => delete queryObj[ef])
    return await dbContext.Cars.find()// .find method returns a query
  }

  async getCarById(carId) {
    const car = await dbContext.Cars.findById(carId).populate('creator', 'name picture')
    if (!car) {
      throw new BadRequest('invalid car id ')
    }
    return car
  }

  async createCar(carData) {
    const car = await dbContext.Cars.create(carData)
    return car
  }

  async editCar(carId, userId, carData) {
    const car = await this.getCarById(carId)
    if (userId !== car.creatorId.toString()) {
      throw new Forbidden('invalid User')
    }
    // this sets the info the user didnt change to stay the same
    // car.make refrences the specific car id and its make
    // cardata.make is the make of the data the client put in
    car.make = carData.make || car.make
    car.model = carData.model || car.model
    car.price = carData.price || car.price
    car.year = carData.year || car.year
    car.img = carData.img || car.img
    // saves the information
    await car.save()
    // then we return the car
    return car
  }

  async removeCar(carId, userId) {
    const car = await this.getCarById(carId)
    if (userId !== car.creatorId.toString()) {
      throw new Forbidden('inValid User')
    }
    await car.remove()
    return car
  }
}
export const carsService = new CarService()
