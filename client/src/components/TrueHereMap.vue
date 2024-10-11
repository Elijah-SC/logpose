<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import H from '@here/maps-api-for-javascript';

const hMap = ref(null);
const route = useRoute();
let map = null;
const props = defineProps({
  coordinatesProp: { type: Object, default: () => { return { latitude: 34, longitude: 39 } } },
  exploreCoordinatesProp: { type: Array, default: () => [] },
  SavedLocationsCoordinatesProp: { type: Array },
})

const emit = defineEmits(['clickedMap'])

onMounted(() => initializeMap())
watch(() => props.exploreCoordinatesProp, disposeMap)

function disposeMap() {
  map.dispose();
  map = null;
  initializeMap();
}

function initializeMap() {
  // Initialize the platform object needed to actually work with API
  const platform = new H.service.Platform({
    apikey: 'eWA19joj95t3z3zNFgJdHrnjpC2fTFdPt6f1jCRRijU'
  });

  // Obtain the default map types from the platform object
  const defaultLayers = platform.createDefaultLayers();

  // instantiate & render map:
  map = new H.Map(
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
  else if (route.name === 'Account') {
    initializeAccountMap(map);
  }

  // Enable the event system for pan/zoom interactions
  const mapEvents = new H.mapevents.MapEvents(map);
  const behavior = new H.mapevents.Behavior(mapEvents);

  // Enable default UI interactions
  const ui = H.ui.UI.createDefault(map, defaultLayers);

  // ** NOTE this resizes the map when you change the browser size **//
  window.addEventListener('resize', () => {
    map.getViewPort().resize();
  });
}

function initializeExploreMap(map) {
  const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
  <circle cx="12" cy="10" r="9" fill="blue" opacity="0.7"/>
  <circle cx="12" cy="10" r="4" fill="white"/>
  <path d="M12 2A7 7 0 0 0 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9A7 7 0 0 0 12 2Z" fill="blue"/>
</svg>`

  const icon = new H.map.Icon(svgMarkup);

  map.setCenter({ lat: props.coordinatesProp.latitude, lng: props.coordinatesProp.longitude }); // Current Coordinates
  map.setZoom(13);
  // @ts-ignore
  const pinMarker = new H.map.Marker({ lat: props.coordinatesProp.latitude, lng: props.coordinatesProp.longitude }, { icon: icon });
  map.addObject(pinMarker);

  props.exploreCoordinatesProp.forEach(coord => {
    // @ts-ignore
    const pinMarker = new H.map.Marker({ lat: coord.latitude, lng: coord.longitude });
    map.addObject(pinMarker);
  })


  // map.addEventListener('tap', (e) => {
  //   const coord = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
  //   emit('clickedMap', { lat: coord.lat, lng: coord.lng })
  //   pinMarker.setGeometry(coord);
  // });
}

function initializeLocationMap(map) {
  // disable wheel zoom on the map
  // var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
  // behavior.disable(H.mapevents.Behavior.WHEELZOOM)

  map.setCenter({ lat: props.coordinatesProp.latitude, lng: props.coordinatesProp.longitude }); // Specific location on the map
  map.setZoom(8);
  const specificLocationMarker = new H.map.Marker({ lat: props.coordinatesProp.latitude, lng: props.coordinatesProp.longitude });
  map.addObject(specificLocationMarker);
  map.addEventListener('tap', (e) => {
    const coord = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
    emit('clickedMap', { lat: coord.lat, lng: coord.lng })
  });
}

function initializeAccountMap(map) {
  // @ts-ignore
  const visitedLocations = props.SavedLocationsCoordinatesProp.filter(location => location.visited === true);
  // @ts-ignore
  const SavedLocations = props.SavedLocationsCoordinatesProp.filter(location => location.visited === false);

  const visitedIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
  <circle cx="12" cy="10" r="9" fill="red" opacity="red"/>
  <circle cx="12" cy="10" r="4" fill="white"/>
  <path d="M12 2A7 7 0 0 0 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9A7 7 0 0 0 12 2Z" fill="red"/>
</svg>`

  const savedIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
  <circle cx="12" cy="10" r="9" fill="blue" opacity="1"/>
  <circle cx="12" cy="10" r="4" fill="white"/>
  <path d="M12 2A7 7 0 0 0 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9A7 7 0 0 0 12 2Z" fill="blue"/>
</svg>`
  const VisitedIcon = new H.map.Icon(visitedIcon);
  const SavedIcon = new H.map.Icon(savedIcon);

  visitedLocations.forEach(coord => {
    // @ts-ignore
    const visitedLocationMarker = new H.map.Marker({ lat: coord.location.latitude, lng: coord.location.longitude }, { icon: VisitedIcon });
    map.addObject(visitedLocationMarker);
  });

  SavedLocations.forEach(coord => {
    // @ts-ignore
    const nonVisitedLocationMarker = new H.map.Marker({ lat: coord.location.latitude, lng: coord.location.longitude }, { icon: SavedIcon });
    map.addObject(nonVisitedLocationMarker);
  });

  map.setCenter({ lat: 43.6150, lng: -116.2023 });
  map.setZoom(13);
}

</script>

<template>
  <div ref="hMap" class="hMap"></div>
</template>


<style lang="scss" scoped>
.hMap {
  width: 100%;
  height: 87dvh;
  border: 1px solid #333;
  margin: 1rem auto;
  cursor: grab;
}

.hMap:active {
  cursor: grabbing;
}
</style>