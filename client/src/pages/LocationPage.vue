<script setup>
import { AppState } from '@/AppState.js';
import HereMap from '@/components/HereMap.vue';
import LocationMap from "@/components/LocationMap.vue";
import { locationService } from '@/services/LocationService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
watch(() => route.params.locationId, () => {
  getActiveLocation();
},
  { immediate: true });

const activeLocation = computed(() => AppState.activeLocation);


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
</script>


<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-12">
        {{ activeLocation }}
      </div>
      <div class="col-12">
        <LocationMap :location="activeLocation" />
      </div>

      <div class="col-md-6">
        <div>
          <h3>About this location</h3>
          <p>{{ activeLocation.description }}</p>
        </div>
      </div>
      <div class="col-md-6"></div>
    </div>
  </section>
</template>


<style lang="scss" scoped></style>