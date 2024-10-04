import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class SavedLocationsService {
  async deleteSavedLocation(locationId, userId) {
    const deleteSavedLocation = await dbContext.SavedLocations.findById(
      locationId
    );
    if (!deleteSavedLocation) throw new Error("invalid");
    if (userId != deleteSavedLocation.creatorId)
      throw new Forbidden(`not authorized can not update this ${locationId}`);
    await deleteSavedLocation.deleteOne();
    return deleteSavedLocation;
  }

  async updateSavedLocation(locationId, userInfo, savedlocationData) {
    const savedLocation = await dbContext.SavedLocations.findById(
      locationId
    ).populate("creator", "picture name");
    if (userInfo != savedlocationData.creatorId)
      throw new Forbidden(`not authorized can not update this ${locationId}`);
    savedLocation.visited = savedlocationData.visited ?? savedLocation.visited;
    await savedLocation.save();
    return savedLocation;
  }

  async getMySavedLocation(creatorId) {
    const savedLocation = await dbContext.SavedLocations.find({
      creatorId: creatorId,
    }).populate("location");
    return savedLocation;
  }

  async getLocationVisitor(locationId) {
    const savedLocation = await dbContext.SavedLocations.find({
      locationId: locationId, visited:true
    }).populate("creator");
    return savedLocation;
  }

  async createSavedLocation(savedLocationData) {
    const savedLocation = await dbContext.SavedLocations.create(
      savedLocationData
    );
    await savedLocation.populate("creator", "picture name");
    await savedLocation.populate("location");
    return savedLocation;
  }
}
export const savedLocationService = new SavedLocationsService();
