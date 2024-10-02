<!-- eslint-disable no-undef -->
<script setup>
  import { onMounted, ref } from 'vue';

  const mapContainer = ref(null);
  const apiKey = 'eWA19joj95t3z3zNFgJdHrnjpC2fTFdPt6f1jCRRijU';

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
        zoom: 10,
        center: { lat: 43.6150, lng: -116.2023 } // Boise
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
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 600px;
    height: 600px;
    border: 1px solid #333;
  }
</style>