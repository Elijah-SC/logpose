<script setup>
import { commentsService } from '@/services/CommentsService.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const commentData = ref({
    body: '',
    locationId: route.params.locationId
})

async function createComment() {
    try {
        await commentsService.createComment(commentData.value)
        commentData.value = {
            body: '',
            locationId: route.params.locationId
        }
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>

<template>
    <form @submit.prevent="createComment()">
        <textarea v-model="commentData.body" name="body" id="body" class="form-control" rows="7" required v-bind:contenteditable="true"
            placeholder="Leave a comment" minlength="3" maxlength="300"></textarea>
        <div class="text-end">
            <button class="btn btn-outline-dark rounded mt-2 submit-btn" type="submit">Send</button>
        </div>
    </form>
</template>


<style lang="scss" scoped>
.submit-btn {
    background-color: #5daf58;
    color: rgb(3, 3, 3);
    border: none;
    border-radius: 5px;
}

.submit-btn:hover {
    background-color: #5daf58;
}
</style>