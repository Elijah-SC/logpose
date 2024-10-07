<script setup>
import { AppState } from '@/AppState.js';
import Carousel from '@/components/Carousel.vue';
import LocationsCard from '@/components/LocationsCard.vue';
import TrueHereMap from '@/components/TrueHereMap.vue';
import { locationService } from '@/services/LocationService.js';
import { savedLocations } from '@/services/SavedLocationsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeLocation = computed(() => AppState.activeLocation);
const randomLocations = computed(() => AppState.randomLocations);
const visitorProfile = computed(() => AppState.visitors);



watch(() => route.params.locationId, () => {
  getActiveLocation();
  getRandomLocations();
  getAllVisitor();
},
  { immediate: true }
);


// @ts-ignore
async function getActiveLocation() {
  try {
    const locationId = route.params.locationId;
    await locationService.getActiveLocation(locationId);
  }
  catch (e) {
    Pop.error(e);
    logger.error(e);
  }
}

// @ts-ignore
async function getRandomLocations() {
  try {
    await locationService.getRandomLocations();
  }
  catch (e) {
    Pop.error(e);
    logger.error(e);
  }
}

// @ts-ignore
async function createSavedLocation() {
  try {
    const locationData = { locationId: route.params.locationId }
    await savedLocations.createSavedLocation(locationData)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function checkIn() {
  try {
    await savedLocations.checkIn(route.params.locationId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getAllVisitor() {
  try {
    await locationService.getAllVisitor(route.params.locationId)
  }
  catch (error) {
    Pop.error(error);
  }

}

</script>

<template>
  <div v-if="activeLocation" class="container-fluid">
    <section class="row">
      <div class="col-12">
        <Carousel />
      </div>
      <div class="col-12">
        <TrueHereMap :specificLocationProp="activeLocation" />
      </div>

      <!-- SECTION About Location -->
      <div class="col-md-6">
        <div>
          <h3 class="text-center">About this location</h3>
          <p>{{ activeLocation.description }}</p>
        </div>
      </div>
      <!-- SECTION Directions -->
      <div class="col-md-6">
        <div>
          <h3 class="text-center">Directions</h3>
          <p>{{ activeLocation.directions }}</p>
          <div class="text-center">
            <button @click="createSavedLocation()" type="button" class="btn btn-outline-dark rounded me-2">Log
              it</button>
            <div v-if="visitorProfile">
              <button @click="checkIn()" type="button" class="btn btn-outline-dark rounded">Check in</button>
            </div>
          </div>
        </div>
      </div>
      <!-- NOTE Comments -->
      <div class="col-md-6">
        <div class="bg-light p-2 rounded">
          <div class="d-flex justify-content-between">
            <h4>Comments</h4>
            <div>
              <p>Latest | Popular</p>
            </div>
          </div>
          <!-- Create Comment -->
          <form>
            <textarea name="" id="" class="form-control" rows="7" placeholder="Leave a comment"></textarea>
            <div class="text-end">
              <button class="btn btn-outline-dark rounded mt-2">Send</button>
            </div>
          </form>

          <!-- Account | User Comments -->
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <img class="guy me-2" src="https://images.thedirect.com/media/article_full/free-guy.jpg" alt="Guy">
              <p class="m-0">Jake Walker</p>
            </div>
            <button class="account-comment" type="button">...</button>
          </div>

          <div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio quo et, architecto deserunt
              consectetur animi quam saepe ipsam ducimus aspernatur odio nostrum adipisci cupiditate eligendi ut
              deleniti dolore error, quod alias possimus veritatis? Accusamus necessitatibus quia doloremque, dolorem
              illum voluptate!</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h3>People who have checked in</h3>
        <div v-for="visitor in visitorProfile" :key="visitor.id" class="p-2 bg-light visitor-container">
          <div class="d-flex align-items-center border-start border-2 border-dark">
            <i class="fa-solid fa-certificate fa-lg mx-2" style="color: #B197FC;"></i>
            <img class="guy me-2" src="https://images.thedirect.com/media/article_full/free-guy.jpg" alt="Guy">
            <p class="m-0">Guy</p>
          </div>
        </div>
      </div>
    </section>
    <!-- TODO Replace with actual locations -->
    <div v-if="randomLocations" class="row gx-3 gy-2 mt-2">
      <h3 class="text-center">Discover new locations</h3>
      <div v-for="randomLocation in randomLocations" :key="randomLocation.id" class="col-md-4">
        <LocationsCard :locationProp="randomLocation" />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
textarea {
  resize: none;
}

.account-comment {
  background: none;
  border: none;
}

.guy {
  aspect-ratio: 1/1;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.visitor-container {
  max-width: fit-content;
}
</style>