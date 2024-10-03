import { Auth0Provider } from "@bcwdev/auth0provider";
import { locationsService } from "../services/LocationsService.js";
import BaseController from "../utils/BaseController.js";

export class LocationsController extends BaseController {
  constructor() {
    super("api/locations");
    this.router
      .get("", this.getLocations)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.getLocations)
  }

  async getLocations(request, response, next) {
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

