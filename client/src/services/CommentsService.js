import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{
    async createComment(value) {
        const response = await api.post('/api/comments', value)
        logger.log('create comments', response.data)
    }

}
export const commentsService = new CommentsService()