import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class CommentsService {
  async deleteComment(userId, commentId) {
    const deletedComment = await dbContext.Comments.findById(commentId);
    if (deletedComment === null) {
      throw new Error(`There is no comment with id of ${commentId}`);
    }
    if (userId != deletedComment.creatorId) {
      throw new Forbidden("You cannot delete a comment that isn't yours");
    }
    await deletedComment.deleteOne();
    return "Comment Deleted";
  }
  
  async updateComment(userId, commentId, commentData) {
    const updatedComment = await dbContext.Comments.findById(commentId);
    if (updatedComment === null) {
      throw new Error(`There is no comment with id of ${commentId}`);
    }
    if (userId != updatedComment.creatorId) {
      throw new Forbidden("You cannot update a comment that isn't yours");
    }
    updatedComment.body = commentData.body ?? updatedComment.body;
    await updatedComment.populate("creator");
    await updatedComment.save();
    return updatedComment;
  }

  async createComment(commentData) {
    const createdComment = await dbContext.Comments.create(commentData);
    await createdComment.populate("creator", "-email -subs");
    return createdComment;
  }

  async getLocationComments(locationId) {
    const locationComments = await dbContext.Comments.find({
      locationId: locationId,
    }).populate("creator", "-email -subs");
    return locationComments;
  }
}

export const commentsService = new CommentsService();
