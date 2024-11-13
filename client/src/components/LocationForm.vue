<script setup>
import { ref } from 'vue';
import TrueHereMap from './TrueHereMap.vue';
import { logger } from '@/utils/Logger.js';
import Pop from "@/utils/Pop.js";
import { Logger } from "sass";
import { locationService } from "@/services/LocationService.js";
import { useRoute, useRouter } from "vue-router";
import { Modal } from "bootstrap";
import LocationPickerMap from "./LocationPickerMap.vue";
const route = useRoute()
const router = useRouter()
const locationCategories = ["Wilderness", "Mountains", "Cycling", "Views", "Hiking", "Caves", "Skiing", "HotSprings", "Stargazing", "Swimming", "Adventure"];
const useLocation = ref(false)
const locationData = ref({
  name: '',
  coverImg: '',
  directions: '',
  description: '',
  category: '',
  location: { "type": "Point", "coordinates": [0, 0] },
})


defineProps({
  coords: { type: Object, Default: { longitude: 34, latitude: 39 } }
});

function handleMapClick(payload) {
  useLocation.value = false
  logger.log('Form map click', payload)
  locationData.value.location.coordinates[1] = payload.lat
  locationData.value.location.coordinates[0] = payload.lng
}

async function getCurrentLocation() {
  if (useLocation.value == false) return
  try {
    // @ts-ignore
    await new Promise((resolve, reject) => {
      logger.log(`Getting Location`)
      navigator.geolocation.getCurrentPosition(position => {
        logger.log(`have location`)
        locationData.value.location.coordinates[0] = position.coords.longitude;
        locationData.value.location.coordinates[1] = position.coords.latitude;
        resolve()
      }, resolve, { enableHighAccuracy: true })
    })

    const geoPermissions = await navigator.permissions.query({ name: 'geolocation' })
    logger.log('GEO PERMISSION', geoPermissions.state)
    if (geoPermissions.state === 'prompt') {
      logger.log('Waiting')
    }
    if (geoPermissions.state === 'denied') {
      logger.log("Denied")
      Pop.toast(`You need to Allow Location permission if you want to create a location using your browser location`, "warning", "center")
      useLocation.value = false
    }
  }
  catch (e) {
    Pop.error(e)
    logger.log(e);
  }
}
async function postLocation() {
  try {
    const newLocation = await locationService.postLocation(locationData.value)
    Pop.toast(`Location created`, `success`, `top`)
    Modal.getOrCreateInstance('#location-form').hide()
    router.push({ name: 'Location', params: { locationId: newLocation?.id } })
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
</script>

<template>
  <section class="container">
    <form @submit.prevent="postLocation()" class="row gy-3">
      <div v-if="locationData.coverImg" class="col-12">
        <h4>Image Preview</h4>
        <div>
          <img :src="locationData.coverImg" alt="Location Image">
        </div>
      </div>
      <div class="col-md-6">
        <label class="form-label" for="locationName">Location Name</label>
        <input v-model="locationData.name" class="form-control" id="locationName" name="locationName" minlength="3"
          maxlength="50">
      </div>
      <div class="col-md-6">
        <label class="form-label" for="locationCoverImg">Cover Image</label>
        <input v-model="locationData.coverImg" type="url" class="form-control" id="locationCoverImg"
          name="locationCoverImg" min="10" maxlength="1000" required>
      </div>
      <div class="col-12">
        <label class="form-label" for="locationDirections">Directions</label>
        <input v-model="locationData.directions" class="form-control" id="locationDirections" name="locationDirections"
          minlength="25" maxlength="1000" required>
      </div>
      <div class="col-12">
        <label class="form-label" for="locationDescription">Description</label>
        <textarea v-model="locationData.description" class="form-control" name="locationDescription"
          id="locationDescription" rows="5" required minlength="25" maxlength="1000"></textarea>
      </div>
      <div class="col-md-12">
        <div class="d-flex align-items-center">
          <div class="w-75">
            <label class="form-label" for="locationCategories">Location Type</label>
            <select v-model="locationData.category" class="form-control" name="locationCategories"
              id="locationCategories" required>
              <option disabled selected value="">Select location category</option>
              <option v-for="locationCategory in locationCategories" :key="locationCategory" :value="locationCategory">
                {{
                  locationCategory }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-12">
        <h3>Select a location from the map or use your location</h3>
        <div class="d-flex align-items-center justify-content-around">
          <div class="flex-grow-1">
            <div>
              <label class="m3-3" for="Longitude loc-box">Longitude</label>
              <input class="form-control" type="number" min="-180" max="180"
                v-model="locationData.location.coordinates[0]" step="any" required>
            </div>
            <div>
              <label class="m3-3" for="Latitude loc-box">Latitude</label>
              <input class="form-control" type="number" min="-90" max="90"
                v-model="locationData.location.coordinates[1]" step="any" required>
            </div>
          </div>
          <div class="d-flex">
            <label class="form-label mb-0 me-2" for="locationCheck">Use my location</label>
            <input @change="getCurrentLocation" v-model="useLocation" class="check-box" type="checkbox"
              name="locationCheck" id="locationCheck">
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <LocationPickerMap @clickedMap="handleMapClick" :coordinatesProp="coords" :exploreCoordinatesProp="[]" />
      </div>
      <div class="w-100 text-end">
        <button class="btn btn-success" type="submit">Submit</button>
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

.check-box {
  height: 25px;
  width: 25px;
}

.loc-box {
  width: 15vw;
}
</style>