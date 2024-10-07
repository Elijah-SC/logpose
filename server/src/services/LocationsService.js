import { dbContext } from "../db/DbContext.js";

class LocationsService {
  async getAllLocations(query) {
    const browserLocation = query.browserLocation || [34, 39]
    delete query.browserLocation
    delete query.sort
    const pageNumber = parseInt(query.page) || 1
    const limitAmount = 10
    const skipAmount = (pageNumber - 1) * limitAmount
    delete query.page
    const locations = await dbContext.Locations.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: browserLocation }, $maxDistance: 40075000 } } }).skip(skipAmount).limit(limitAmount).populate(`creator`, `-email -subs`)
    return locations
  }
  async findLocationById(locationId) {
    const location = await dbContext.Locations.findById(locationId).populate(`creator`, `-email -subs`)
    return location
  }
  async createLocation(body) {
    const location = await dbContext.Locations.create(body)
    await location.populate(`creator`, `-email -subs`)
    return location
  }
}

export const locationsService = new LocationsService();
