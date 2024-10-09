<script setup>
import { AppState } from "@/AppState.js";
import { Location } from "@/models/Location.js";
import { picturesService } from "@/services/PicturesService.js";
import Pop from "@/utils/Pop.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

defineProps({
  location: { type: Location, required: true }
})

onMounted(()=>{
  getAllPicture()
})

const route = useRoute()

const pictureData = ref({
  picture: '',
  locationId: null
})

const showUrlInput = ref(false)

async function toggleUrlInput() {
  showUrlInput.value = !showUrlInput.value;
}

async function createPicture() {
  try {
    pictureData.value.locationId = AppState.activeLocation.id
    await picturesService.createPicture(pictureData.value)
    Pop.confirm('Picture is create')
  }
  catch (error){
    Pop.error(error);
  }
}

async function getAllPicture() {
  try {
    await picturesService.getAllPicture(route.params.locationId)
  }
  catch (error){
    Pop.error(error);
  }
  
}

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
  <div class="container">
    <section class="row">
      <div class="col-md-6">
        <form @submit.prevent="createPicture()">
          <i class="mdi mdi-image-multiple fs-1 text-success" type="button"  @click="toggleUrlInput()"></i>
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