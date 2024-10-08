<script setup>
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { onMounted, ref } from "vue";
import TrueHereMap from "../TrueHereMap.vue";
import { Location } from "@/models/Location.js";

defineProps({
  activeLocation: { type: Location },
  coords: { type: Object, Default: { longitude: 34, latitude: 39 } }
});

const useLocation = ref(false)
const locationData = ref({
  location: { "type": "Point", "coordinates": [0, 0] },
})


function handleMapClick(payload) {
  useLocation.value = false
  logger.log('Form map click', payload)
  locationData.value.location.coordinates[0] = payload.lng
  locationData.value.location.coordinates[1] = payload.lat
}

</script>


<template>
  <div>
    <h3 class="text-center">Testing Tool pick a location</h3>
    <div class="d-flex justify-content-center gap-2">
      <p class="mb-0">Long: {{ locationData.location.coordinates[0] }}</p>
      <p class="mb-0">Lat: {{ locationData.location.coordinates[1] }}</p>
    </div>
    <TrueHereMap @clickedMap="handleMapClick" :currentCoordinatesProp="coords" />
  </div>
</template>


<style lang="scss" scoped></style>