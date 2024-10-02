import { Schema } from "mongoose";

export const LocationSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 50, required: true },
  description: { type: String, minlength: 25, maxlength: 1000, required: true },
  directions: { type: String, minlength: 25, maxlength: 1000, required: true },
  coverImg: { type: String, minlength: 10, maxlength: 1000, required: true },
  // creatorId{type: Schema.ObjectId}
})