import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import {
  LocationSaved,
  SavedLocation,
  SavedLocationCreator,
} from "@/models/SavedLocation.js";
import { AppState } from "@/AppState.js";

class SavedLocations {
  async checkIn(updateData, savedLocationId) {
    const response = await api.put(`api/savedLocations`, updateData);
    // logger.log("visit location", response.data);
    const newVisitor = new SavedLocationCreator(response.data);
    const foundVisitorIndex = AppState.locationVisitors.findIndex(visitor => visitor.creatorId == savedLocationId)
    AppState.locationVisitors.splice(foundVisitorIndex, 1, newVisitor)

    logger.log(`New Visitor`, newVisitor);
  }

  async getAllVisitors(locationId) {
    const response = await api.get(
      `api/locations/${locationId}/savedLocations`
    );
    logger.log("get visitor", response.data);
    const newLocationVisitors = response.data.map(
      (locationVisitor) => new SavedLocationCreator(locationVisitor)
    );
    AppState.locationVisitors = newLocationVisitors;
  }

  async deleteLocation(visitorLocationId) {
    const response = await api.delete(
      `api/savedLocations/${visitorLocationId}`
    );
    logger.log("delete location", response.data);
    const indexToDeleteLocation = AppState.SavedLocations.findIndex(
      (location) => location.id == visitorLocationId
    );
    AppState.SavedLocations.splice(indexToDeleteLocation, 1);
  }

  async getMySavedLocations() {
    const response = await api.get("account/savedLocations");
    const myLocations = response.data.map(
      (locations) => new LocationSaved(locations)
    );
    AppState.SavedLocations = myLocations;
  }

  async createSavedLocation(locationData) {
    const response = await api.post("api/savedLocations", locationData);
    logger.log("save locations", response.data);
    const createdSavedLocation = new SavedLocationCreator(response.data);
    AppState.locationVisitors.push(createdSavedLocation);
  }
}
export const savedLocations = new SavedLocations();
