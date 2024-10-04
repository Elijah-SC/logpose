import { Creator } from "./Creator.js"
import { Location } from "./Location.js"

export class SavedLocations{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.locationId = data.locationId
        this.visited = data.visited
        this.createAt = new Date(data.createAt)
        this.updatedAt = new Date(data.updatedAt)
    }
}

export class SavedLocationCreator{
    constructor(data){
        // super(data)
        this.creator = new Creator(data.creator)
    }
}

export class LocationSaved{
    constructor(data){
        // super(data)
        this.location = new Location(data.location)
    }
}


// const data = {
//     "creatorId": "66febdc7a90e1d9ada5792dd",
//     "locationId": "66ff1c905f021719496d0290",
//     "visited": false,
//     "_id": "670028e9006437e6c38dab16",
//     "createdAt": "2024-10-04T17:42:01.105Z",
//     "updatedAt": "2024-10-04T17:42:01.105Z",
//     "__v": 0,
//     "creator": {
//         "_id": "66febdc7a90e1d9ada5792dd",
//         "name": "wahagi8145",
//         "picture": "https://s.gravatar.com/avatar/9e73aa700f7dd66e93b914fe30a113de?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fwa.png",
//         "id": "66febdc7a90e1d9ada5792dd"
//     },
//     "location": {
//         "_id": "66ff1c905f021719496d0290",
//         "name": "Freddies Stack Rock",
//         "description": "This hike is amazing I highly recomend It, you can also climb the rock great place to see the stars at night",
//         "coverImg": "https://miro.medium.com/v2/resize:fit:2048/0*hWHuHpmmOGX-av12",
//         "directions": "about 12 miles up bogus basin road there is a turn off for parking at the lower entrance and a turn off road for the upper entrance",
//         "longitude": -116.1277,
//         "latitude": 43.7375,
//         "category": "Mountains",
//         "creatorId": "66e04bf70483818f681bcaa1",
//         "createdAt": "2024-10-03T22:37:04.929Z",
//         "updatedAt": "2024-10-03T22:37:04.929Z",
//         "__v": 0,
//         "id": "66ff1c905f021719496d0290"
//     },
//     "id": "670028e9006437e6c38dab16"
// }