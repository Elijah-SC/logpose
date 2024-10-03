import { Auth0Provider } from "@bcwdev/auth0provider";
import { locationsService } from "../services/LocationsService.js";
import BaseController from "../utils/BaseController.js";

export class LocationsController extends BaseController {
  constructor() {
    super(`api/locations`);
    this.router
      .get(``, this.getAllLocations)
      .get(`/:locationId`, this.getLocationsById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post(``, this.createLocation)
  }
  getAllLocations(request, response, next) {

  }
  async getLocationsById(response, request, next) {
    try {
      const locationId = request.params.locationId
      const location = await locationsService.findLocationById(locationId)
      response.send(location)
    } catch (e) {
      next(e)
    }
  }


  async createLocation(request, response, next) {
    try {
      const userInfo = request.userInfo
      const body = request.body
      body.creatorId = userInfo.id
      const location = await locationsService.createLocation(body)
      response.send(location)
    } catch (e) {
      next(e);
    }
  }
}

