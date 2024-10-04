import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { LocationSaved} from "@/models/SavedLocation.js"
import { AppState } from "@/AppState.js"

class SavedLocations{
  async createSavedLocation(locationData) {
      const response = await api.post('api/savedLocations', locationData)
      logger.log('save locations', response.data)
      const createdSavedLocation = new LocationSaved(response.data)
      AppState.visitorSavedLocation.push(createdSavedLocation)
  }

  async getMySavedLocation() {
    const response = await api.get('account/savedLocations')
    logger.log('load the saved location', response.data)
    const myLocation = response.data.map(locations => new LocationSaved(locations))
    AppState.visitorSavedLocation = myLocation
  }
}
export const savedLocations = new SavedLocations()