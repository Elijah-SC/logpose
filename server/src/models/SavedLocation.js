import { Schema } from "mongoose";

export const SavedLocationSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
    locationId: { type: Schema.ObjectId, required: true, ref: "Location" },
    visited: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

SavedLocationSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true,
});

SavedLocationSchema.virtual("location", {
  localField: "locationId",
  ref: "Location",
  foreignField: "_id",
  justOne: true,
});
