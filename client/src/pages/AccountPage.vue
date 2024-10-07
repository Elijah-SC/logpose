<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { savedLocations } from '@/services/SavedLocationsService.js';
import Pop from '@/utils/Pop.js';
import LocationsCard from '@/components/LocationsCard.vue';
import TrueHereMap from '@/components/TrueHereMap.vue';

const account = computed(() => AppState.account)
const visitors = computed(() => AppState.visitorSavedLocation)
const randomLocations = computed(() => AppState.randomLocations);

onMounted(() => {
  getMySavedLocation()
})

async function getMySavedLocation() {
  try {
    await savedLocations.getMySavedLocation()
  }
  catch (error) {
    Pop.error(error);
  }
}

async function deleteLocation(visitorLocationId) {
  try {
    await savedLocations.deleteLocation(visitorLocationId)
  }
  catch (error){
    Pop.error(error);
  }
  
}

</script>

<template>
  <div class="about">
    <div v-if="account">
      <div class="container">
        <section class="row">
          <div class="col-md-3">
            <img class="creator-img" :src="account.picture" :alt="account.name" />
          </div>
          <div class="col-md-8">
            <h1>{{ account.name }}</h1>
            <p><i class="mdi mdi-shield-star fs-1"></i></p>
          </div>
        </section>
      </div>
      <div class="container-fluid">
        <section class="row">
          <div class="col-md-12">
            <h4 class="text-center">See where you have been</h4>
            <TrueHereMap />
          </div>
        </section>
      </div>
      <div class="container">
        <section class="row">
          <h4 class="text-center">Where your planning to go</h4>
          <div v-for="visitor in visitors" :key="visitor.id" class="col-md-4">
            <LocationCard :location="visitor.location" />
            <div>
            <button @click="deleteLocation(visitor.id)" class="btn btn-success">Delete</button>
          </div>
          </div>
        </section>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
  <footer>
    <div class="container">
      <div v-if="randomLocations" class="row gx-3 gy-2 mt-2">
        <h3 class="text-center">Discover new locations</h3>
        <div v-for="randomLocation in randomLocations" :key="randomLocation.id" class="col-md-4">
          <LocationsCard :locationProp="randomLocation" />
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
