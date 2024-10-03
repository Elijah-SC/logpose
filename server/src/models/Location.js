import { Schema } from "mongoose";

export const LocationSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 50, required: true },
  description: { type: String, minlength: 25, maxlength: 1000, required: true },
  coverImg: { type: String, minlength: 10, maxlength: 1000, required: true },
  directions: { type: String, minlength: 25, maxlength: 1000, required: true },
  longitude: { type: Number, min: -90, max: 90, required: true },
  latitude: { type: Number, min: -180, max: 180, required: true },
  category: {
    type: String,
    enum: ["Wilderness", "Mountain", "Cycling", "Arctic"],
  },
  creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
});

LocationSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true,
});
