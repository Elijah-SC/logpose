<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import HereMap from '@/components/HereMap.vue';
import LocationCard from '@/components/globals/LocationCard.vue';
import { savedLocations } from '@/services/SavedLocationsService.js';
import Pop from '@/utils/Pop.js';

const account = computed(() => AppState.account)
const locations = computed(() => AppState.locations)

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

</script>

<template>
  <div class="about">
    <div v-if="account">
      <div class="container">
        <section class="row">
          <div class="col-md-3">
            <img class="creator-img" :src="account.picture" alt="" />
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
            <H4 class="text-center">See where you have been</H4>
            <HereMap />
          </div>
        </section>
      </div>
      <div class="container">
        <section class="row">
          <h4 class="text-center">Where your planning to go</h4>
          <div v-for="location in locations" :key="location.id" class="col-md-12">
            <LocationCard :location="location" />
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
      <section class="row">
        <h4 class="text-center">Discover Something New</h4>
        <div class="col-md-4">
        </div>
      </section>
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
