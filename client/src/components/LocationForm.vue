<script setup>
import { ref } from 'vue';
import TrueHereMap from './TrueHereMap.vue';
import { logger } from '@/utils/Logger.js';

const locationCategories = ["Wilderness", "Mountains", "Cycling", "Views", "Hiking", "Caves", "Skiing", "HotSprings", "Stargazing", "Swimming", "Adventure"];
const locationData = ref({
  name: '',
  coverImg: '',
  directions: '',
  description: '',
  category: '',
  location: { "type": "Point", "coordinates": [0, 0] },
  useLocation: false,

})

defineProps({
  coords: { type: Object, Default: { longitude: -177, latitude: 88 } }
});

function handleMapClick(payload) {
  logger.log('Form map click', payload)
}
</script>

<template>
  <section class="container">
    <form class="row gy-3">
      <div v-if="locationData.coverImg" class="col-12">
        <h4>Image Preview</h4>
        <div>
          <img :src="locationData.coverImg" alt="Location Image">
        </div>
      </div>
      <div class="col-md-6">
        <label class="form-label" for="locationName">Location Name</label>
        <input v-model="locationData.name" class="form-control" id="locationName" name="locationName">
      </div>
      <div class="col-md-6">
        <label class="form-label" for="locationCoverImg">Cover Image</label>
        <input v-model="locationData.coverImg" type="url" class="form-control" id="locationCoverImg"
          name="locaitonCoverImg">
      </div>
      <div class="col-12">
        <label class="form-label" for="locationDirections">Directions</label>
        <input v-model="locationData.directions" class="form-control" id="locationDirections" name="locationDirections">
      </div>
      <div class="col-12">
        <label class="form-label" for="locationDescription">Description</label>
        <textarea v-model="locationData.description" class="form-control" name="locationDescription"
          id="locationDescription" rows="5"></textarea>
      </div>
      <div class="col-md-12">
        <div class="d-flex align-items-center">
          <div class="w-75">
            <label class="form-label" for="locationCategories">Location Type</label>
            <select v-model="locationData.category" class="form-control" name="locationCategories"
              id="locationCategories">
              <option disabled selected value="">Select location category</option>
              <option v-for="locationCategory in locationCategories" :key="locationCategory" :value="locationCategory">
                {{
                  locationCategory }}</option>
            </select>
          </div>

          <div class="w-25 mx-auto">
            <input v-model="locationData.useLocation" class="align-self-center" type="checkbox" name="locationCheck"
              id="locationCheck">
            <label class="form-label ms-2" for="locationCheck">Use my location</label>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <TrueHereMap @clickedMap="handleMapClick" :currentCoordinatesProp="coords" />
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped>
textarea {
  resize: none;
}

img {
  height: 200px;
  aspect-ratio: 1/1;
  width: 50%;
  object-fit: cover;
  object-position: center;
}
</style>