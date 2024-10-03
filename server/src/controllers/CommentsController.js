import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router.get("", this.getComments);
  }

  async getComments(request, response, next) {
    try {
      console.log("get comments");
    } catch (e) {
      next(e);
    }
  }
}
