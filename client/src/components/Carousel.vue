<script setup>
import { AppState } from "@/AppState.js";
import { Location } from "@/models/Location.js";
import { picturesService } from "@/services/PicturesService.js";
import { logger } from "@/utils/Logger.js";
// import { logger } from "@/utils/Logger.js"
import Pop from "@/utils/Pop.js";
import { computed, ref } from "vue";

const locationPictures = computed(() => AppState.pictures);

const toggleCreate = () => {
  revealCreate.value = !revealCreate.value;
}
const toggleDelete = () => {
  revealDelete.value = !revealDelete.value;
}

const revealCreate = ref(false);
const revealDelete = ref(false);

defineProps({
  location: { type: Location, required: true }
})

const pictureData = ref({
  picture: '',
  locationId: null
});

async function createPicture() {
  try {
    pictureData.value.locationId = AppState.activeLocation.id
    await picturesService.createPicture(pictureData.value);
    revealCreate.value = !revealCreate.value;
    pictureData.value = {
      picture: '',
      locationId: null
    }
  }
  catch (e) {
    Pop.error(e);
    logger.error(e)
  }
}


async function deletePicture() {
  try {
    await picturesService.deletePicture();
  } catch (e) {
    Pop.error(e);
    logger.error(e);
  }
}

</script>

<template>
  <div v-if="locationPictures.length !== 0" id="locationCarouselIndicator" class="carousel slide carousel-fade"
    data-bs-ride="carousel">
    <div class="carousel-inner">
      <div v-for="locationPicture in locationPictures" :key="locationPicture.id" class="carousel-item active">
        <img :src="locationPicture.picture" class="d-block w-100 position-relative" :alt="locationPicture.id">
        <div class="position-absolute top-0 start-50 end-50">
          <div class="dropdown">
            <button class="btn btn-outline-light dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Create | Delete
            </button>
            <ul class="dropdown-menu">
              <li @click="toggleCreate()" class="dropdown-item selectable">Create Image <i class="fa-solid fa-plus"></i>
              </li>
              <li @click="toggleDelete()" class="dropdown-item selectable">Delete Image <i class="fa-solid fa-trash"
                  style="color: #ff0000;"></i></li>
            </ul>
          </div>
          <div v-if="revealCreate" class="create-design mt-2">
            <form @submit.prevent="createPicture()">
              <label class="form-label" for="pictureUrl">Picture:</label>
              <input class="form-control" type="url" v-model="pictureData.picture" minlength="3" maxlength="500"
                id="pictureUrl" name="pictureUrl" required>
              <button class="btn btn-outline-light mt-2">Submit</button>
            </form>
          </div>
          <div v-if="revealDelete" class="delete-design mt-2">

          </div>
        </div>
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
      alt="Default">
  </div>
</template>


<style lang="scss" scoped>
img {
  height: 500px;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}

.create-design,
.delete-design {
  color: azure;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 30%);
  border-radius: 10px;
  width: 300px;
}
</style>