import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Location } from "@/models/Location.js";
import { AppState } from "@/AppState.js";

class LocationService {
  // @ts-ignore
  async getActiveLocation(locationId) {
    const response = await api.get(`api/locations/${locationId}`);
    const acquiredLocation = new Location(response.data);
    AppState.activeLocation = acquiredLocation;
  }
  async getLocations() {
    const response = await api.get(`api/locations`);
    logger.log(response.data);
    const newLocations = response.data.map(
      (locationData) => new Location(locationData)
    );
    AppState.locations = newLocations;
  }
}
export const locationService = new LocationService();
