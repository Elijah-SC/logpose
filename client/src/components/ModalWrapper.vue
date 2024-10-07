<script setup>
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';

const { modalId } = defineProps({ modalId: String })
const modal = ref(null)
const modalShow = ref(false)

onMounted(() => {
  modal.value.addEventListener('hidden.bs.modal', () => modalShow.value = false)
  modal.value.addEventListener('shown.bs.modal', () => modalShow.value = true)
})
</script>


<template>
  <div ref="modal" class="modal fade" :id="modalId">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div v-if="modalShow" class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>