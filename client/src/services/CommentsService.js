import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from "@/models/Comment.js"
import { AppState } from "@/AppState.js"

class CommentsService{
    async createComment(CommentData) {
        const response = await api.post('/api/comments', CommentData)
        logger.log('create comments', response.data)
        const newComment = new Comment(response.data)
        AppState.comments.push(newComment)
    }
}
export const commentsService = new CommentsService()