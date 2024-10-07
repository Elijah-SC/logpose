import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Location } from "@/models/Location.js";
import { AppState } from "@/AppState.js";
import { SavedLocationCreator } from "@/models/SavedLocation.js";

class LocationService {
  async postLocation(postData) {
    const response = await api.post(`api/locations`, postData)
    const newLocation = new Location(response.data)
    AppState.locations.push(newLocation)
    return newLocation
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

  // @ts-ignore
  async getRandomLocations() {
    const response = await api.get("api/locations");
    logger.log(response.data);
    const randomLocations = [];
    for (let i = 0; i < 3; ++i) {
      const randomLocationIndex = Math.floor(
        Math.random() * response.data.length
      );
      const acquiredLocation = new Location(response.data[randomLocationIndex]);
      randomLocations.push(acquiredLocation);
    }
    AppState.randomLocations = randomLocations;
  }
  // @ts-ignore
  async getActiveLocation(locationId) {
    const response = await api.get(`api/locations/${locationId}`);
    const acquiredLocation = new Location(response.data);
    AppState.activeLocation = acquiredLocation;
  }
  // @ts-ignore
  async getLocations(currentLocation) {
    const response = await api.get(`api/locations`, {
      params: {
        browserLocation: currentLocation,
      },
    });
    logger.log(response.data);
    const newLocations = response.data.map(
      (locationData) => new Location(locationData)
    );
    AppState.locations = newLocations;
  }
}
export const locationService = new LocationService();
