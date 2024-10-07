import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { LocationSaved, SavedLocation, SavedLocationCreator } from "@/models/SavedLocation.js";
import { AppState } from "@/AppState.js";

class SavedLocations{
  async checkIn(locationId, value) {
    const response = await api.put(`api/savedLocations/${locationId}`, value)
    logger.log('visit location', response.data)
    const visited = new SavedLocation(response.data)
    AppState.locationVisitor.push(visited)
    AppState.visitors
  }

  async getAllVisitor(locationId) {
    const response = await api.get(
      `api/locations/${locationId}/savedLocations`
    );
    logger.log("get visitor", response.data);
    const locationVisitor = response.data.map(
      (locationVisitor) => new SavedLocationCreator(locationVisitor)
    );
    AppState.CreatorSavedLocation = locationVisitor;
  }

  async deleteLocation(visitorLocationId) {
    const response = await api.delete(
      `api/savedLocations/${visitorLocationId}`
    );
    logger.log("delete location", response.data);
    const indexToDeleteLocation = AppState.visitorSavedLocation.findIndex(
      (location) => location.id == visitorLocationId
    );
    AppState.visitorSavedLocation.splice(indexToDeleteLocation, 1);
  }

  async getMySavedLocation() {
    const response = await api.get("account/savedLocations");
    logger.log("load the saved location", response.data);
    const myLocation = response.data.map(
      (locations) => new LocationSaved(locations)
    );
    AppState.visitorSavedLocation = myLocation;
  }

  async createSavedLocation(locationData) {
    const response = await api.post("api/savedLocations", locationData);
    logger.log("save locations", response.data);
    const createdSavedLocation = new LocationSaved(response.data);
    AppState.visitorSavedLocation.push(createdSavedLocation);
  }
}
export const savedLocations = new SavedLocations();
