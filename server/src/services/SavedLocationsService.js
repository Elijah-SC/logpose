import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class SavedLocationsService {
    deleteSavedLocation(locationId, userId) {
        throw new Error("Method not implemented.")
    }
    async updateSavedLocation(locationId, userInfo, savedlocationData) {
        const savedLocation = await dbContext.SavedLocations.findById(locationId).populate('creator', 'picture name')
        if (userInfo != savedlocationData.creatorId) throw new Forbidden(`not authorized can not update this ${locationId}`)
        savedLocation.visited != savedlocationData.visited ?? savedLocation.visited
        savedLocation.save()
        return savedLocation
    }
    async getMySavedLocation(userId) {
        const savedLocation = await dbContext.SavedLocations.find({ creatorId: userId }).populate('location')
        return savedLocation
    }

    async getLocationVisitor() {
        const savedLocation = await dbContext.SavedLocations.find().populate('creator').populate('location')
        return savedLocation
    }

    async createSavedLocation(savedlocationData) {
        const savedLocation = await dbContext.SavedLocations.create(savedlocationData)
        await savedLocation.populate('creator', 'picture name')
        await savedLocation.populate('location')
        return savedLocation
    }
}
export const savedLocationService = new SavedLocationsService()
