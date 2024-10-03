import { dbContext } from "../db/DbContext.js";

class LocationsService {
  async getAllLocations() {
    const locations = await dbContext.Locations.find().populate(`creator`, `-email -subs`)
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
