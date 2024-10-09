<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import H from '@here/maps-api-for-javascript';

const hMap = ref(null);
const route = useRoute();
const props = defineProps({
  coordinatesProp: { type: Object, Default: { latitude: 34, longitude: 39 } },
  SavedLocationsCoordinatesProp: { type: Array },
})

const emit = defineEmits(['clickedMap'])

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
  else if (route.name === 'Account') {
    initializeAccountMap(map);
  }

  // Enable the event system for pan/zoom interactions
  const mapEvents = new H.mapevents.MapEvents(map);
  const behavior = new H.mapevents.Behavior(mapEvents);

  // Enable default UI interactions
  const ui = H.ui.UI.createDefault(map, defaultLayers);

  // NOTE Disabled for now
  // const svgMarkup = '<svg class="map-marker" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>map-marker</title><path  style="fill: blue;" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>';
  // const icon = new H.map.Icon(svgMarkup);

  // ** NOTE this resizes the map when you change the browser size **//
  window.addEventListener('resize', () => {
    map.getViewPort().resize();
  });
}

function initializeExploreMap(map) {
  map.setCenter({ lat: props.coordinatesProp.latitude, lng: props.coordinatesProp.longitude }); // Current Coordinates
  map.setZoom(13);

  const pinMarker = new H.map.Marker({ lat: props.coordinatesProp.latitude, lng: props.coordinatesProp.longitude });
  map.addObject(pinMarker);

  map.addEventListener('tap', (e) => {
    const coord = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
    emit('clickedMap', { lat: coord.lat, lng: coord.lng })
    pinMarker.setGeometry(coord);
  });
}

function initializeLocationMap(map) {
  // disable wheel zoom on the map
  // var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
  // behavior.disable(H.mapevents.Behavior.WHEELZOOM)

  map.setCenter({ lat: props.coordinatesProp.latitude, lng: props.coordinatesProp.longitude }); // Specific location on the map
  map.setZoom(13);
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
  const nonVisitedLocations = props.SavedLocationsCoordinatesProp.filter(location => location.visited === false);

  // NOTE Temporary only used to display locations that have been visited. Plan to make unqiue markers for visitedLocations & nonVisitedLocations
  const svgIcon = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#0000FF" />
</svg>`;
  const icon = new H.map.Icon(svgIcon);

  visitedLocations.forEach(coord => {
    // @ts-ignore
    const visitedLocationMarker = new H.map.Marker({ lat: coord.location.latitude, lng: coord.location.longitude }, { icon: icon });
    map.addObject(visitedLocationMarker);
  });

  nonVisitedLocations.forEach(coord => {
    // @ts-ignore
    const nonVisitedLocationMarker = new H.map.Marker({ lat: coord.location.latitude, lng: coord.location.longitude });
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
  height: 600px;
  border: 1px solid #333;
  margin: 1rem auto;
}
</style>