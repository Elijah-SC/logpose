import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class PicturesService {
  async deletePicture(pictureId, userId) {
    const pictureToDelete = await dbContext.Pictures.findById(pictureId);
    if (!pictureToDelete) throw new Error("can not delete not authorize");
    if (userId != pictureToDelete.creatorId)
      throw new Forbidden("not authorize can not delete");
    await pictureToDelete.deleteOne();
    return "Picture deleted";
  }

  async createPicture(pictureData) {
    const picture = await dbContext.Pictures.create(pictureData);
    return picture;
  }

  async getPictures(locationId) {
    const pictures = await dbContext.Pictures.find({ locationId: locationId });
    return pictures;
  }
}

export const picturesService = new PicturesService();
