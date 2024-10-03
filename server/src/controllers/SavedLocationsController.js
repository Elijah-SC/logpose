import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { savedLocationService } from "../services/SavedLocationsService.js";

export class SavedLocationsController extends BaseController {
    constructor() {
        super('api/savedLocations')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createSavedLocation)
            .put('/:locationId', this.updateSavedLocation)
            .delete('/:savedLocationId', this.deleteSavedLocation)
    }

    async deleteSavedLocation(request, response, next) {
        try {
            const locationId = request.params.savedLocationId
            const userId = request.userInfo.id
            const savedLocation = await savedLocationService.deleteSavedLocation(locationId, userId)
            response.send(savedLocation)
        } catch (error) {
            next(error)
        }
    }

    async updateSavedLocation(request, response, next) {
        try {
            const savedlocationData = request.body
            const locationId = request.params.locationId
            const userInfo = request.userInfo.Id
            const savedLocation = await savedLocationService.updateSavedLocation(locationId, userInfo, savedlocationData)
            response.send(savedLocation)
        } catch (error) {
            next(error)
        }
    }

    async createSavedLocation(request, response, next) {
        try {
            const savedlocationData = request.body
            const user = request.userInfo
            savedlocationData.creatorId = user.id
            const savedLocation = await savedLocationService.createSavedLocation(savedlocationData)
            response.send(savedLocation)
        }
        catch (error) {
            next(error)
        }
    }
}
