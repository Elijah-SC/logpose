import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class LocationService {
  async getLocations() {
    const response = await api.get(`api/locations?page=2`)
    logger.log(response.data)
  }

}
export const locationService = new LocationService()