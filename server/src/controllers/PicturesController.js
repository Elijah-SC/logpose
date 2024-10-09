import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService.js";
import BaseController from "../utils/BaseController.js";

export class PicturesController extends BaseController {
  constructor() {
    super("/api/pictures");
    this.router
      .get("/:locationId", this.getPictures)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createPicture)
      .delete("/:pictureId", this.deletePicture);
  }

  async deletePicture(request, response, next) {
    try {
      const pictureId = request.params.pictureId;
      const userId = request.userInfo.id;
      const pictureDeletedMsg = await picturesService.deletePicture(
        pictureId,
        userId
      );
      response.send(pictureDeletedMsg);
    } catch (error) {
      next(error);
    }
  }

  async createPicture(request, response, next) {
    try {
      const pictureData = request.body;
      const userInfo = request.userInfo;
      pictureData.creatorId = userInfo.id;
      const picture = await picturesService.createPicture(pictureData);
      response.send(picture);
    } catch (error) {
      next(error);
    }
  }

  async getPictures(request, response, next) {
    try {
      const locationId = request.params.locationId;
      const pictures = await picturesService.getPictures(locationId);
      response.send(pictures);
    } catch (e) {
      next(e);
    }
  }
}
