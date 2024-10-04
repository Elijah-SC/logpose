import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { SavedLocationCreator } from "@/models/SavedLocation.js"
import { AppState } from "@/AppState.js"

class SavedLocations{
  async createSavedLocation(locationData) {
      const response = await api.post('api/savedLocations', locationData)
      logger.log('save locations', response.data)
      const createdSavedLocation = new SavedLocationCreator(response.data)
      AppState.CreatorSavedLocation.push(createdSavedLocation)
  }

  async getMySavedLocation() {
    const response = await api.get('api/account/savedLocations')
    logger.log('load the saved location', response.data)
  }

}
export const savedLocations = new SavedLocations()