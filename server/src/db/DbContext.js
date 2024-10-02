import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { ValueSchema } from "../models/Value";
import { CommentSchema } from "../models/Comment.js";
import { PictureSchema } from "../models/Picture.js";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Account = mongoose.model("Account", AccountSchema);
  Comments = mongoose.model("Comment", CommentSchema);
  Pictures = mongoose.model("Picture", PictureSchema);
}

export const dbContext = new DbContext();
