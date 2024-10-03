import { Schema } from "mongoose";

export const CommentSchema = new Schema(
  {
    locationId: { type: Schema.ObjectId, required: true, ref: "Location" },
    creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
    body: { type: String, required: true, minLength: 3, maxLength: 300 },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CommentSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true,
});
