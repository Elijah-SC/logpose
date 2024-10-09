<script setup>
import { Location } from "@/models/Location.js";

defineProps({
  location: { type: Location, required: true }
})
</script>

<template>
  <div id="locationCarouselIndicator" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img :src="location?.coverImg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="https://thumbs.dreamstime.com/b/heavy-rain-outside-created-artificial-intelligence-320885240.jpg"
          class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDHPQg61WlYGkOYE-bW15jyXZzy8Pv-cXqg&s"
          class="d-block w-100" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#locationCarouselIndicator"
      data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#locationCarouselIndicator"
      data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>


<style lang="scss" scoped>
img {
  height: 500px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}
</style>