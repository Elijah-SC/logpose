<script setup>
import { AppState } from "@/AppState.js";
import LocationCard from "@/components/globals/LocationCard.vue";
import HereMap from "@/components/HereMap.vue";
import { locationService } from "@/services/LocationService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, ref } from "vue";


onMounted(() => { getCurrentLocation() })

const locations = computed(() => AppState.locations)
const coords = ref({
  longitude: null,
  latitude: null,
})

async function getCurrentLocation() {
  try {
    await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        coords.value.longitude = position.coords.longitude;
        coords.value.latitude = position.coords.latitude;
        console.log(`Current location is`, coords)
        resolve()
      }, resolve, { enableHighAccuracy: true })
    })

    const geoPermissions = await navigator.permissions.query({ name: 'geolocation' })
    logger.log('GEO PERMISSION', geoPermissions.state)
    if (geoPermissions.state == 'prompt') {
      logger.log('Waiting')
    }
    if (geoPermissions.state == 'denied') {
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
  catch (error) {
    Pop.error('error')
  }
}
// @ts-ignore
async function getLocations() {
  try {
    const currentLocation = [coords.value.longitude, coords.value.latitude]
    logger.log('Getting locations', currentLocation)
    // console.log(`formatted currentLocation`, currentLocation)
    await locationService.getLocations()
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>


<template>
  <section v-if="locations" class="container-fluid bg-light">
    <div class="row">

      <div class="order-1 order-md-0 col-md-4">
        <div class="text-center">
          <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal"
            data-bs-target="#location-form">Create</button>
        </div>
        <div class="row">
          <div v-for="location in locations" :key="location.id" class="col-12">
            <LocationCard :location="location" />
          </div>
        </div>
      </div>
      <div class="order-0 order-md-2 col-md-8">
        <HereMap v-if="coords.latitude && coords.longitude" :coords="coords" class="map" />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.map {
  position: sticky;
  top: 40px;
}
</style>