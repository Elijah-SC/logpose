import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createComment)
      .put("/:commentId");
  }

  async createComment(request, response, next) {
    try {
      const commentData = request.body;
      commentData.creatorId = request.userInfo.id;
      const createdComment = await commentsService.createComment(commentData);
      response.send(createdComment);
    } catch (e) {
      next(e);
    }
  }

  async updateComment(request, response, next) {
    try {
      const userId = request.userInfo.id;
      const commentId = request.params.commentId;
      const commentData = request.body;
      const updatedComment = await commentsService.updateComment(userId, commentId, commentData);
      response.send(updatedComment);
    } catch (e) {
      next(e);
    }
  }
}
