<script setup>
import { Location } from '@/models/Location.js';

defineProps({
  locationProp: { type: Location, required: true }
}) 
</script>


<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img class="img-fluid h-100" :src="locationProp.coverImg" :alt="locationProp.name">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h4 class="card-title">{{ locationProp.name }}</h4>
          <p class="car-subtitle">{{ locationProp.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  object-fit: cover;
  object-position: center;
  border-radius: 3px;
}
</style>