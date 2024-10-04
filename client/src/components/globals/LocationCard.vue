<script setup>
import { Location } from "@/models/Location.js";


defineProps({
  location: { type: Location, required: true }
}) 
</script>


<template>
  <router-link :to="{ name: 'Location', params: { locationId: location?.id } }">
    <div class="my-2">
      <img :src="location?.coverImg" alt="location Cover Img">
      <div>
        <h5>{{ location?.name }}</h5>
        <span>Long:{{ location?.longitude }} Lat:{{ location?.latitude }}</span>
      </div>
    </div>
  </router-link>
</template>


<style lang="scss" scoped>
img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  border-radius: 5%;
}

span {
  color: rgba(0, 0, 0, 0.477);
}

h5 {
  margin-bottom: 1px;
}

a {
  color: black;
  text-decoration: none;
}
</style>