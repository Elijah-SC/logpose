import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Location } from "@/models/Location.js";
import { AppState } from "@/AppState.js";
import { SavedLocationCreator } from "@/models/SavedLocation.js";

class LocationService {
  async postLocation(postData) {
    const response = await api.post(`api/locations`, postData);
    const newLocation = new Location(response.data);
    AppState.locations.push(newLocation);
    return newLocation;
  }
  async getAllVisitors(locationId) {
    const response = await api.get(
      `api/locations/${locationId}/savedLocations`
    );
    logger.log("get visitor", response.data);
    const locationVisitor = response.data.map(
      (locationVisitor) => new SavedLocationCreator(locationVisitor)
    );
    AppState.locationVisitors = locationVisitor;
  }

  // @ts-ignore
  async getRandomLocations() {
    const response = await api.get("api/locations");
    const locations = response.data.map((location) => new Location(location));
    const randomLocations = [];
    while (randomLocations.length < 3) {
      const locationIndex = Math.floor(Math.random() * locations.length);
      const randomLocation = locations[locationIndex];

      if (
        !randomLocations.some((location) => location.id === randomLocation.id)
      ) {
        randomLocations.push(randomLocation);
      }
    }

    AppState.randomLocations = randomLocations;
  }
  // @ts-ignore
  async getActiveLocation(locationId) {
    AppState.activeLocation = null;
    const response = await api.get(`api/locations/${locationId}`);
    const acquiredLocation = new Location(response.data);
    AppState.activeLocation = acquiredLocation;
  }
  // @ts-ignore
  async getLocations(currentLocation, maxSearchRadius) {
    const response = await api.get(`api/locations`, {
      params: {
        browserLocation: currentLocation,
        maxSearchRadius: maxSearchRadius
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
