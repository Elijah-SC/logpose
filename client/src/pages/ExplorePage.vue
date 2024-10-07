<script setup>
import { AppState } from "@/AppState.js";
import LocationCard from "@/components/globals/LocationCard.vue";
import LocationForm from "@/components/LocationForm.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import TrueHereMap from "@/components/TrueHereMap.vue";
import { locationService } from "@/services/LocationService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, ref } from "vue";

onMounted(() => getCurrentLocation());
const locations = computed(() => AppState.locations);
const coords = ref({
  longitude: null,
  latitude: null,
});

// @ts-ignore
async function getCurrentLocation() {
  try {
    // @ts-ignore
    await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        coords.value.longitude = position.coords.longitude;
        coords.value.latitude = position.coords.latitude;
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
      // handle default location
      coords.value.latitude = 88
      coords.value.longitude = -177
      getLocations()
    }

    if (geoPermissions.state == 'granted') {
      logger.log("Granted")
      getLocations()
    }
  }
  catch (e) {
    Pop.error(e)
    logger.log(e);
  }
}
// @ts-ignore
async function getLocations() {
  try {
    const currentLocation = [coords.value.longitude, coords.value.latitude]
    logger.log('Getting locations', currentLocation)
    await locationService.getLocations(currentLocation)
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

function handleMapClick(payload) {
  console.log('clicked the map', payload)
}
</script>


<template>
  <section v-if="locations" class="container-fluid bg-light">
    <div class="row">
      <div class="order-1 order-md-0 col-md-4">
        <div class="text-center">
          <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal"
            data-bs-target="#location-form">Create</button>
          <ModalWrapper id="location-form">
            <LocationForm v-if="coords.latitude && coords.longitude" :coords="coords" />
          </ModalWrapper>
        </div>
        <div class="row">
          <div v-for="location in locations" :key="location.id" class="col-12">
            <LocationCard :location="location" />
          </div>
        </div>
      </div>
      <div class="order-0 order-md-2 col-md-8">
        <TrueHereMap @clickedMap="handleMapClick" v-if="coords.latitude && coords.longitude"
          :currentCoordinatesProp="coords" />
        <div v-else class="loading d-flex justify-content-center align-items-center mt">
          <h1>Loading Map</h1><i class="mdi mdi-loading mdi-spin"></i>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.map {
  position: sticky;
  top: 30px;
}

section {
  min-height: 100vh;
}

.loading {
  font-size: 100px;
}

.mt {
  margin-top: 30vh;
}
</style>