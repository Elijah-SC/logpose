import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Location } from "@/models/Location.js";
import { AppState } from "@/AppState.js";

class LocationService {
  // @ts-ignore
  async getRandomLocations() {
    const response = await api.get("api/locations");
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
        browserLocation: currentLocation
      }
    });
    logger.log(response.data);
    const newLocations = response.data.map(
      (locationData) => new Location(locationData)
    );
    AppState.locations = newLocations;
  }
}
export const locationService = new LocationService();
