import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { CommentSchema } from "../models/Comment.js";
import { PictureSchema } from "../models/Picture.js";
import { SavedLocationSchema } from "../models/SavedLocation.js";
import { LocationSchema } from "../models/Location.js";

class DbContext {
  Account = mongoose.model("Account", AccountSchema);
  Comments = mongoose.model("Comment", CommentSchema);
  Pictures = mongoose.model("Picture", PictureSchema);
  Locations = mongoose.model("Location", LocationSchema);
  SavedLocations = mongoose.model("SavedLocation", SavedLocationSchema);
}

export const dbContext = new DbContext();
