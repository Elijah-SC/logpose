import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class SavedLocationsService {
    async deleteSavedLocation(locationId, userId) {
        const deleteSavedLocation = await dbContext.SavedLocations.findById(locationId)
        if (!deleteSavedLocation) throw new Error('invalid')
        if (userId != deleteSavedLocation.creatorId) throw new Forbidden(`not authorized can not update this ${locationId}`)
        await deleteSavedLocation.deleteOne()
        return deleteSavedLocation
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

    async createSavedLocation(savedLocationData) {
        const savedLocation = await dbContext.SavedLocations.create(savedLocationData)
        await savedLocation.populate('creator', 'picture name')
        await savedLocation.populate('location')
        return savedLocation
    }
}
export const savedLocationService = new SavedLocationsService()
