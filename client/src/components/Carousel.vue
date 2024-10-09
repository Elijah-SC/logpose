<script setup>
import { AppState } from "@/AppState.js";
import { Location } from "@/models/Location.js";
import { picturesService } from "@/services/PicturesService.js";
// import { logger } from "@/utils/Logger.js"
import Pop from "@/utils/Pop.js";
import { computed, ref } from "vue";

const locationPictures = computed(() => AppState.pictures)
const showUrlInput = ref(false);

defineProps({
  location: { type: Location, required: true }
})

const pictureData = ref({
  picture: '',
  locationId: null
})

async function toggleUrlInput() {
  showUrlInput.value = !showUrlInput.value;
}

async function createPicture() {
  try {
    pictureData.value.locationId = AppState.activeLocation.id
    await picturesService.createPicture(pictureData.value)
    resetForm()
    Pop.confirm('Picture is create')
  }
  catch (error) {
    Pop.error(error);
  }
}

function resetForm(){
  pictureData.value = {
    picture: '',
    locationId: null
  }
}


// async function deletePicture() {
//   try {
//     await picturesService.deletePicture();
//   } catch (e) {
//     Pop.error(e);
//     logger.error(e);
//   }
// }

</script>

<template>
  <div v-if="locationPictures.length !== 0" id="locationCarouselIndicator" class="carousel slide carousel-fade"
    data-bs-ride="carousel">
    <div class="carousel-inner">
      <div v-for="locationPicture in locationPictures" :key="locationPicture.id" class="carousel-item active"
        data-bs-interval="3000">
        <img :src="locationPicture.picture" class="d-block w-100" :alt="locationPicture.id">
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
  <div v-else>
    <img class="w-100"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/1200px-Clouds_over_the_Atlantic_Ocean.jpg"
      alt="">
  </div>
  <div class="container">
    <section class="row">
      <div class="col-md-6">
        <form @submit.prevent="createPicture()">
          <i class="mdi mdi-image-multiple fs-1 text-success" type="button" @click="toggleUrlInput()"></i>
          <input type="url" v-if="showUrlInput" v-model="pictureData.picture" required minlength="3" maxlength="500">
          <button class="btn btn-outline-success" v-if="showUrlInput">Submit</button>
        </form>
      </div>
    </section>
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