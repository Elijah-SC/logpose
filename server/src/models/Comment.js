import { Schema } from "mongoose";

export const CommentSchema = new Schema(
  {
    locationId: { type: Schema.ObjectId, required: true },
    creatorId: { type: Schema.ObjectId, required: true },
    body: { type: String, required: true, minLength: 3, maxLength: 300 },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
