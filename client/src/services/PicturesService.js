import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Picture } from "@/models/Picture.js";
import { AppState } from "@/AppState.js";

class PicturesService {
  async getAllPicture(locationId) {
    const response = await api.get(`api/pictures/${locationId}`);
    logger.log("get picture", response.data);
    const pictureData = response.data.map(picture => new Picture(picture));
    AppState.pictures = pictureData;
  }

  async createPicture(pictureData) {
    const response = await api.post("/api/pictures", pictureData);
    logger.log("create picture", response.data);
    const newPicture = new Picture(response.data);
    AppState.pictures.push(newPicture);
  }
}
export const picturesService = new PicturesService();
