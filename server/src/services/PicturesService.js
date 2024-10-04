import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class PicturesService {
    async deletePicture(pictureId, userId) {
        const pictureToDelete = await dbContext.Pictures.findById(pictureId)
        if (!pictureToDelete) throw new Error('can not delete not authorize')
        if (userId != pictureToDelete.creatorId) throw new Forbidden('not authorize can not delete')
        await pictureToDelete.deleteOne()
        return pictureToDelete
    }

    async createPicture(pictureData) {
        const picture = await dbContext.Pictures.create(pictureData)
        await picture.populate('creator', 'picture name')
        await picture.populate('location')

        return picture
    }

    async getPictures() {
        const picture = await dbContext.Pictures.find()
        return picture
    }
}

export const picturesService = new PicturesService();
