import { Schema } from "mongoose";

const GeoPoint = new Schema({
  type: { type: String, required: true, default: 'Point' },
  coordinates: [{ type: Number }]
})

const christmasIsland = {
  type: "Point",
  coordinates: [105.6904, 10.4475]
}

export const LocationSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 50, required: true },
  description: { type: String, minlength: 25, maxlength: 1000, required: true },
  coverImg: { type: String, minlength: 10, maxlength: 1000, required: true },
  directions: { type: String, minlength: 25, maxlength: 1000, required: true },
  location: { type: GeoPoint, default: christmasIsland, validate: { validator: validateLatLong } },
  category: {
    type: String,
    enum: ["Wilderness", "Mountains", "Cycling", "Views", "Hiking", "Caves", "Skiing", "HotSprings", "Stargazing", "Swimming", "Adventure"],
  },
  creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
}, { timestamps: true, toJSON: { virtuals: true } });

LocationSchema.index({ location: '2dsphere' })

LocationSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true,
});


function validateLatLong(value) {
  const coordinates = value._doc.coordinates
  const validLong = coordinates[0] >= -180 && coordinates[0] <= 180
  const validLat = coordinates[1] >= -90 && coordinates[1] <= 90
  return validLat && validLong
}
