import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import {
  LocationSaved,
  SavedLocation,
  SavedLocationCreator,
} from "@/models/SavedLocation.js";
import { AppState } from "@/AppState.js";

class SavedLocations {
  async getVisitedLocations() {
    const response = await api.get("api/savedLocations");
    const visitedLocations = response.data.map(
      (location) => new LocationSaved(location)
    );
    AppState.visitedLocations = visitedLocations;
  }
  async checkIn(locationId, value) {
    const response = await api.put(`api/savedLocations/${locationId}`, value);
    // logger.log("visit location", response.data);

    const newVisitor = new SavedLocationCreator(response.data);
    AppState.locationVisitors.push(newVisitor);
    logger.log(`New Visitor`, newVisitor)
  }

  async getAllVisitors(locationId) {
    const response = await api.get(
      `api/locations/${locationId}/savedLocations`
    );
    logger.log("get visitor", response.data);
    const newLocationVisitors = response.data.map(
      (locationVisitor) => new SavedLocation(locationVisitor)
    );
    AppState.visitors = newLocationVisitors;
    logger.log(AppState.visitors);
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
    const createdSavedLocation = new LocationSaved(response.data);
    AppState.SavedLocations.push(createdSavedLocation);
  }
}
export const savedLocations = new SavedLocations();
