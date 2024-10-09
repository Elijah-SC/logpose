<script setup>
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, ref } from "vue";
import TrueHereMap from "../TrueHereMap.vue";
import { Location } from "@/models/Location.js";
import { AppState } from "@/AppState.js";
import Swal from "sweetalert2";

const activeLocation = computed(() => AppState.activeLocation)
const emit = defineEmits(['within-distance'])
const useLocation = ref(false)
const locationData = ref({
  longitude: ``,
  latitude: ``
})


function handleMapClick(payload) {
  useLocation.value = false
  logger.log('Form map click', payload)
  locationData.value.longitude = payload.lng
  locationData.value.latitude = payload.lat
}

//** NOTE function to find the distance between two points in km */
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const halfChordLengthSquared =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const centralAngle = 2 * Math.atan2(Math.sqrt(halfChordLengthSquared), Math.sqrt(1 - halfChordLengthSquared));
  const distance = R * centralAngle; // Distance in km
  return distance;
}

//** Converts Degrees to radians */
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function isLocationInRadius() {
  //** Passes down the lat long of the location and the lat long picked by user */
  const distance = getDistanceFromLatLonInKm(activeLocation.value.latitude, activeLocation.value.longitude, locationData.value.latitude, locationData.value.longitude)
  logger.log(`distance between location and location picked`, distance)
  //** */ Must be within half a mile to check in **//
  if (distance > 0.804672) {
    Swal.fire({
      title: "Not close enough to location",
      text: "You must be within half a mile",
      icon: "error"
    });
  }
  else {
    emit('within-distance')
  }
}
</script>


<template>
  <div v-if="activeLocation">
    <h3 class="text-center">Testing Tool pick a location</h3>
    <div class="d-flex justify-content-center gap-2">
      <p class="mb-0">Long: {{ locationData.longitude }}</p>
      <p class="mb-0">Lat: {{ locationData.latitude }}</p>
    </div>
    <div class="w-100 text-end">
      <button @click="isLocationInRadius()" class="btn btn-outline-primary">Submit</button>
    </div>
    <TrueHereMap @clickedMap="handleMapClick"
      :coordinatesProp="{ latitude: activeLocation.latitude, longitude: activeLocation.longitude }" />
  </div>
</template>


<style lang="scss" scoped></style>