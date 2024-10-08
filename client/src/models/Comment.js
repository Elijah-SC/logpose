import { Account } from "./Account.js"

export class Comment{
    constructor(data){
        this.id = data.id
        this.body = data.body
        this.locationId = data.locationId
        this.updateAt = new Date(data.updateAt)
        this.createAt = new Date(data.createAt)
        this.creatorId = data.creatorId 
        this.creator = data.creator? new Account(data.creator) : null
    }
}

// const data ={
//     "locationId": "67045ab0aadbe059bd2777d8",
//     "creatorId": "670066f19f345d9bf24778fd",
//     "body": "comments",
//     "_id": "670552a81f957143dbd17ded",
//     "createdAt": "2024-10-08T15:41:28.010Z",
//     "updatedAt": "2024-10-08T15:41:28.010Z",
//     "__v": 0,
//     "creator": {
//         "_id": "670066f19f345d9bf24778fd",
//         "name": "reyeci8440",
//         "picture": "https://s.gravatar.com/avatar/3d385605e948ab730d01bfef9615ab4e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fre.png",
//         "points": 0,
//         "createdAt": "2024-10-04T22:06:47.856Z",
//         "updatedAt": "2024-10-04T22:06:47.856Z",
//         "__v": 0,
//         "id": "670066f19f345d9bf24778fd"
//     },
//     "id": "670552a81f957143dbd17ded"
// }