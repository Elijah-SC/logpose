<script setup>
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, ref, watch } from 'vue';

const mapContainer = ref('');
const apiKey = ''; // Enter API KEY here

onMounted(() => {
  initializeMap();
})

function initializeMap() {
  // Initialize the platform object needed to actually work with API
  const platform = new H.service.Platform({
    apikey: apiKey
  });

  // Obtain the default map types from the platform object
  const defaultLayers = platform.createDefaultLayers();

  // instantiate & render map:
  const map = new H.Map(
    mapContainer.value,
    defaultLayers.vector.normal.map,
    {
      zoom: 19,
      center: { lat: coords.value.latitude, lng: coords.value.longitude } // Boise
    }
  );

  // Enable the event system for pan/zoom interactions
  const mapEvents = new H.mapevents.MapEvents(map);
  const behavior = new H.mapevents.Behavior(mapEvents);

  // Enable default UI interactions
  const ui = H.ui.UI.createDefault(map, defaultLayers);
}
</script>


<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style lang="scss" scoped>
.map-container {
  width: 600px;
  height: 600px;
  border: 1px solid #333;
  margin: 1rem auto;
}
</style>