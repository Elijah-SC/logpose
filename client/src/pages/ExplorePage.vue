<script setup>
import { AppState } from "@/AppState.js";
import LocationCard from "@/components/globals/LocationCard.vue";
import LocationForm from "@/components/LocationForm.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import Navbar from "@/components/Navbar.vue";
import TrueHereMap from "@/components/TrueHereMap.vue";
import { locationService } from "@/services/LocationService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, ref } from "vue";

onMounted(() => getCurrentLocation());
const locations = computed(() => {
  if (filterCategory.value == 'All') {
    return AppState.locations
  }
  return AppState.locations.filter(location => location.category == filterCategory.value)
});
const filterCategory = ref('All')
const searchRadius = ref(10)
const coords = ref({
  latitude: null,
  longitude: null,
});
const categories = ["All", "Wilderness", "Mountains", "Cycling", "Views", "Hiking", "Caves", "Skiing", "HotSprings", "Stargazing", "Swimming", "Adventure"]

// @ts-ignore
async function getCurrentLocation() {
  try {
    // @ts-ignore
    await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        coords.value.latitude = position.coords.latitude;
        coords.value.longitude = position.coords.longitude;
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
      coords.value.latitude = 30
      coords.value.longitude = -40
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
    const maxSearchRadius = 1609.34 * searchRadius.value
    logger.log('Getting locations', currentLocation)
    await locationService.getLocations(currentLocation, maxSearchRadius)
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
  <header class="sticky-top">
    <Navbar />
  </header>
  <section v-if="locations" class="container-fluid bg-white">
    <div class="row">
      <div class="order-1 order-md-0 col-md-4">
        <div class="d-flex justify-content-around selectors bg-white py-2">
          <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal"
            data-bs-target="#location-form">Create</button>
          <ModalWrapper id="location-form">
            <LocationForm v-if="coords.latitude && coords.longitude" :coords="coords" />
          </ModalWrapper>
          <div class="dropdown">
            <button class="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Dropdown button
            </button>
            <ul class="dropdown-menu text-center">
              <li>
                <div>
                  <Form @submit.prevent="getLocations()">
                    <label for="Search Radius" class="me-2">Search Radius</label>
                    <input v-model="searchRadius" type="number" min="1" max="24901" placeholder="miles"
                      title="radius to see locations around you in miles">
                  </Form>
                </div>
              </li>
              <li><button class="dropdown-item" @click="filterCategory = category" v-for="category in categories"
                  :key="category">{{ category }}</button></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div v-for="location in locations" :key="location.id" class="col-12">
            <LocationCard :location="location" />
          </div>
        </div>
      </div>
      <div class="order-0 order-md-2 col-md-8">
        <div class="w-100 text-end">

        </div>
        <TrueHereMap @clickedMap="handleMapClick" v-if="coords.latitude && coords.longitude && locations.length !== 0"
          :exploreCoordinatesProp="locations" :coordinatesProp="coords" class="map" />
        <TrueHereMap v-else-if="coords.latitude && coords.longitude && locations.length == 0" :coordinatesProp="coords"
          class="map" />
        <div v-else class="loading d-flex justify-content-center align-items-center mt">
          <h1>Loading Map</h1><i class="mdi mdi-earth mdi-spin"></i>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.map {
  position: sticky;
  top: 13.5vh;
}

section {
  min-height: 100vh;
}

.loading {
  font-size: 100px;
}

.mt {
  margin-top: 20vh;
}

.selectors {
  position: sticky;
  top: 88px
}
</style>