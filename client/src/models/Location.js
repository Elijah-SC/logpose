export class Location {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.coverImg = data.coverImg;
    this.directions = data.directions;
    this.location = data.location
    this.category = data.category;
    this.creatorId = data.creatorId;
    this.longitude = this.location.coordinates[0]
    this.latitude = this.location.coordinates[1]
  }
}
