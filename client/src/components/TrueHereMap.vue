<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import H from '@here/maps-api-for-javascript';
import { Location } from '@/models/Location.js';

const hMap = ref(null);
const route = useRoute();
const props = defineProps({
  specificLocationProp: { type: Location },
  currentCoordinatesProp: { type: Object, Default: { latitude: 88, longitude: -177 } }
})

onMounted(() => initializeMap())

function initializeMap() {
  // Initialize the platform object needed to actually work with API
  const platform = new H.service.Platform({
    apikey: 'eWA19joj95t3z3zNFgJdHrnjpC2fTFdPt6f1jCRRijU'
  });

  // Obtain the default map types from the platform object
  const defaultLayers = platform.createDefaultLayers();

  // instantiate & render map:
  const map = new H.Map(
    // @ts-ignore
    hMap.value,
    // @ts-ignore
    defaultLayers.vector.normal.map,
  );

  if (route.name === 'Explore') {
    initializeExploreMap(map);
  }
  else if (route.name === 'Location') {
    initializeLocationMap(map);
  }

  // Enable the event system for pan/zoom interactions
  const mapEvents = new H.mapevents.MapEvents(map);
  const behavior = new H.mapevents.Behavior(mapEvents);

  // Enable default UI interactions
  const ui = H.ui.UI.createDefault(map, defaultLayers);
}

function initializeExploreMap(map) {
  map.setCenter({ lat: props.currentCoordinatesProp.latitude, lng: props.currentCoordinatesProp.longitude }); // Current Coordinates
  map.setZoom(13);
  const currentLocationMarker = new H.map.Marker({ lat: props.currentCoordinatesProp.latitude, lng: props.currentCoordinatesProp.longitude });
  map.addObject(currentLocationMarker);
  map.addEventListener('tap', (e) => {
    const coord = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
    console.log(Math.abs(coord.lat.toFixed(4)) +
      (coord.lat > 0 ? "N" : "S") +
      " " +
      Math.abs(coord.lng.toFixed(4)) +
      (coord.lng > 0 ? "E" : "W"))

    const pinMarker = new H.map.Marker({ lat: coord.lat, lng: coord.lng });
    map.addObject(pinMarker);
  });
}

function initializeLocationMap(map) {
  map.setCenter({ lat: props.specificLocationProp.latitude, lng: props.specificLocationProp.longitude }); // Specific location on the map
  map.setZoom(13);
  const specificLocationMarker = new H.map.Marker({ lat: props.specificLocationProp.latitude, lng: props.specificLocationProp.longitude });
  map.addObject(specificLocationMarker);
}

</script>


<template>
  <div ref="hMap" class="hMap"></div>
</template>


<style lang="scss" scoped>
.hMap {
  width: 100%;
  height: 600px;
  border: 1px solid #333;
  margin: 1rem auto;
}
</style>