import BaseController from "../utils/BaseController.js";

export class PicturesController extends BaseController {
  constructor() {
    super("api/pictures");
    this.router.get("", this.getPictures);
  }

  async getPictures(request, response, next) {
    try {
      console.log("getting pictures");
    } catch (e) {
      next(e);
    }
  }
}
