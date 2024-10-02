import { Schema } from "mongoose";

export const PictureSchema = new Schema(
  {
    locationId: { type: Schema.ObjectId, required: true },
    creatorId: { type: Schema.ObjectId, required: true },
    picture: { type: String, required: true, minLength: 3, maxLength: 500 },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
