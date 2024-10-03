<script setup>
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { onMounted, ref, watch } from 'vue';
import H from '@here/maps-api-for-javascript';

const mapContainer = ref('');
const apiKey = 'eWA19joj95t3z3zNFgJdHrnjpC2fTFdPt6f1jCRRijU'; // Enter API KEY here

onMounted(() => {
  getCurrentLocation();
})

const coords = ref(null)
watch(coords, initializeMap)

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      coords.value = position.coords;
      logger.log(coords.value);
    })
  }
  else {
    Pop.error('browser does not support geolocation');
  }
}

function acquireCoordinates(map) {
  map.addEventListener('tap', (e) => {
    const coord = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
    logger.log(Math.abs(coord.lat.toFixed(4)) +
      (coord.lat > 0 ? "N" : "S") +
      " " +
      Math.abs(coord.lng.toFixed(4)) +
      (coord.lng > 0 ? "E" : "W"))

    const pinMarker = new H.map.Marker({ lat: coord.lat, lng: coord.lng });
    map.addObject(pinMarker);
  })
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
    // @ts-ignore
    mapContainer.value,
    // @ts-ignore
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: { lat: coords.value.latitude, lng: coords.value.longitude } // Boise
    }
  );

  // Enable the event system for pan/zoom interactions
  const mapEvents = new H.mapevents.MapEvents(map);
  const behavior = new H.mapevents.Behavior(mapEvents);

  // Enable default UI interactions
  const ui = H.ui.UI.createDefault(map, defaultLayers);

  // Add marker
  const svgMarkup = '<svg class="map-marker" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>map-marker</title><path  style="fill: blue;" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>';
  const icon = new H.map.Icon(svgMarkup);

  // @ts-ignore
  const boiseMarker = new H.map.Marker({ lat: coords.value.latitude, lng: coords.value.longitude }, { icon: icon });
  map.addObject(boiseMarker);

  acquireCoordinates(map);
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