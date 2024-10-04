<script setup>
import { AppState } from "@/AppState.js";
import LocationCard from "@/components/globals/LocationCard.vue";
import HereMap from "@/components/HereMap.vue";
import { locationService } from "@/services/LocationService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";


onMounted(() => getLocations())

const locations = computed(() => AppState.locations)


// @ts-ignore
async function getLocations() {
  try {
    await locationService.getLocations()
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>


<template>
  <section class="container-fluid bg-light">
    <div class="row">
      <div class="order-1 order-md-0 col-md-4">
        <div class="row">
          <div v-for="location in locations" :key="location.id" class="col-12">
            <LocationCard :location="location" />
          </div>
        </div>
      </div>
      <div class="order-0 order-md-2 col-md-8">
        <HereMap class="map" />
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