export class Location {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.coverImg = data.coverImg;
    this.directions = data.directions;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
    this.category = data.category;
    this.creatorId = data.creatorId;
  }
}
