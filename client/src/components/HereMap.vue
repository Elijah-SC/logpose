<script setup>
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, ref, watch } from 'vue';

const mapContainer = ref('');
const apiKey = 'eWA19joj95t3z3zNFgJdHrnjpC2fTFdPt6f1jCRRijU'; // Enter API KEY here

onMounted(() => {
  getCurrentLocation()
})

const coords = ref(null)
watch(coords, initializeMap)

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      coords.value = position.coords
      logger.log(coords.value)
    })
  } else Pop.error(`browser does not support geolocation`)
}

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
  const LocationOfMarker = { lat: 43.136812, lng: -115.694474 };
  clickListener(map)
}


function clickListener(map) {
  map.addEventListener('tap', function (evt) {
    const coord = map.screenToGeo(evt.currentPointer.viewportX,
      evt.currentPointer.viewportY);
    console.log('Click');
    console.log('Clicked at ' + Math.abs(coord.lat.toFixed(4)) +
      ((coord.lat > 0) ? 'N' : 'S') +
      ' ' + Math.abs(coord.lng.toFixed(4)) +
      ((coord.lng > 0) ? 'E' : 'W'));
  });
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