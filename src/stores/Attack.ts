import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { logService } from "../services/LogServices";
import { getCommentService, addCommentService } from "../services/AttackService";

export const useAttackStore = defineStore('attack', () => {
    const comments = ref([]);

    async function getComments() {
        try{
            const response = await getCommentService();
            comments.value = response;
        } catch (error: unknown) {
            const errorMessage = "Error during get comments";
            console.error("error", errorMessage, { error });
            throw error;
        }
    }

    async function AddComment(user_id: number, comment: string) {}

    return { comments, getComments, AddComment }
})