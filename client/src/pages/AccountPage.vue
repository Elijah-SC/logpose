<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { savedLocations } from '@/services/SavedLocationsService.js';
import Pop from '@/utils/Pop.js';
import TrueHereMap from '@/components/TrueHereMap.vue';
import { logger } from '@/utils/Logger.js';
import DiscoverLocCard from "@/components/DiscoverLocCard.vue";
import { locationService } from "@/services/LocationService.js";

const account = computed(() => AppState.account)
const randomLocations = computed(() => AppState.randomLocations);
const SavedLocations = computed(() => AppState.SavedLocations);

onMounted(() => {
  getMySavedLocations();
  getRandomLocations()
})

async function getMySavedLocations() {
  try {
    await savedLocations.getMySavedLocations()
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getRandomLocations() {
  try {
    await locationService.getRandomLocations();
  }
  catch (e) {
    Pop.error(e);
    logger.error(e);
  }
}

async function deleteLocation(visitorLocationId) {
  try {
    const wantsToDelete = await Pop.confirm('Are you sure you want delete')

    if (!wantsToDelete) return
    await savedLocations.deleteLocation(visitorLocationId)
  }
  catch (error) {
    Pop.error(error);
    logger.log(error)
  }

}

</script>

<template>
  <div v-if="account">
    <section v-if="account" class="container">
      <section class="row">
        <div class="col-md-3">
          <img class="creator-img" :src="account.picture" :alt="account.name" />
        </div>
        <div class="col-md-8">
          <h1>{{ account.name }}</h1>
          <p><i class="mdi mdi-shield-star fs-1"></i></p>
        </div>
      </section>
    </section>
    <section class="container-fluid">
      <section class="row">
        <div v-if="SavedLocations.length !== 0" class="col-md-12">
          <h4 class="text-center">See where you have been</h4>
          <TrueHereMap :SavedLocationsCoordinatesProp="SavedLocations" />
        </div>
      </section>
    </section>
    <section class="container">
      <section class="row">
        <h4 class="text-center">Where your planning to go</h4>
        <div v-for="SavedLocation in SavedLocations" :key="SavedLocation.id" class="col-md-4">
          <LocationCard :location="SavedLocation.location" />
          <div>
            <button @click="deleteLocation(SavedLocation.id)" class="btn btn-success">Delete</button>
          </div>
        </div>
      </section>
    </section>
  </div>
  <div v-else>
    <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>

  <footer>
    <div class="container">
      <div v-if="randomLocations" class="row gx-3 gy-2 mt-2">
        <h3 class="text-center">Discover new locations</h3>
        <div v-for="randomLocation in randomLocations" :key="randomLocation.id" class="col-md-4">
          <DiscoverLocCard :locationProp="randomLocation" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}

.creator-img {
  height: 10dvh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
</style>
