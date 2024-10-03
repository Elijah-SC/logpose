import { dbContext } from "../db/DbContext.js";

class LocationsService {
  async createLocation(body) {
    const location = await dbContext.Locations.create(body)
    await location.populate(`creator`, `-email -subs`)
    return location
  }
}

export const locationsService = new LocationsService();
