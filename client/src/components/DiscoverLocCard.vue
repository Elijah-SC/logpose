<script setup>
import { Location } from '@/models/Location.js';

defineProps({
  locationProp: { type: Location, required: true }
}) 
</script>

<template>
  <router-link :to="{ name: 'Location', params: { locationId: locationProp?.id } }">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-12">
          <img class="img-fluid h-100" :src="locationProp.coverImg" :alt="locationProp.name">
        </div>
        <div>
          <div class="card-body">
            <h4 class="card-title">{{ locationProp.name }}</h4>
            <p class="car-subtitle">{{ locationProp.description.substring(0, 30) }}....</p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>


<style lang="scss" scoped>
img {
  min-height: 20vh;
  max-height: 20vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 3px;
}

.card {
  min-height: 40vh;
  max-height: 40vh;
}
</style>