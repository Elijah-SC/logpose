import BaseController from "../utils/BaseController.js";

export class LocationsController extends BaseController {
  constructor() {
    super("api/locations");
    this.router.get("", this.getLocations);
  }

  async getLocations(request, response, next) {
    try {
      console.log("getting locations");
    } catch (e) {
      next(e);
    }
  }
}
