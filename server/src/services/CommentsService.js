import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class CommentsService {
  async deleteComment(userId, commentId) {
    const deletedComment = await dbContext.Comments.findById(commentId);
    if (deletedComment === null) {
    }
  }
  async updateComment(userId, commentId, commentData) {
    const updatedComment = await dbContext.Comments.findById(commentId);
    if (updatedComment === null) {
      throw new Error("There is no comment with id of", commentId);
    }
    console.log(userId);
    console.log(updatedComment.creatorId);
    if (updatedComment.creatorId !== userId) {
      throw new Forbidden("You cannot update a comment that isn't yours");
    }
    updatedComment.body = commentData.body ?? updatedComment.body;
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
