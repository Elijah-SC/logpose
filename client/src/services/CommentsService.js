import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from "@/models/Comment.js"
import { AppState } from "@/AppState.js"

class CommentsService{
    async deleteComment(commentId) {
      const response = await api.delete(`/api/comments/${commentId}`)
      logger.log('delete comment', response.data)
      const indexToDeleteComment = AppState.comments.findIndex(comment => comment.id == commentId)
      AppState.comments.splice(indexToDeleteComment,1)
    }

   async getAllComment(locationId) {
      const response = await api.get(`/api/locations/${locationId}/comments`)
      logger.log('get all comments',response.data)
      const newComment = response.data.map(comments => new Comment(comments))
      AppState.comments = newComment
    }

    async createComment(CommentData) {
        const response = await api.post('/api/comments', CommentData)
        logger.log('create comments', response.data)
        const newComment = new Comment(response.data)
        AppState.comments.push(newComment)
    }
}
export const commentsService = new CommentsService()