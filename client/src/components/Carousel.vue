<script setup>
import { AppState } from "@/AppState.js";
import { Location } from "@/models/Location.js";
import { Picture } from "@/models/Picture.js";
import { picturesService } from "@/services/PicturesService.js";
import { logger } from "@/utils/Logger.js";
// import { logger } from "@/utils/Logger.js"
import Pop from "@/utils/Pop.js";
import { computed, ref } from "vue";

const locationPictures = computed(() => {
  const locationPicture = new Picture(
    {
      id: props.location.id,
      locationId: props.location.id,
      picture: props.location.coverImg,
      creatorId: props.location.creatorId
    }
  )
  return [locationPicture, ...AppState.pictures]
});
const account = computed(() => AppState.account);

const props = defineProps({
  location: { type: Location, required: true }
})

const revealCreate = ref(false);

const pictureData = ref({
  picture: '',
  locationId: null
});

const YouAreAVisitor = computed(() => {
  if (AppState.identity == null) return false
  const visited = AppState.locationVisitors.find(visitor => visitor.creatorId == AppState.account?.id && visitor.visited)
  if (!visited) return false
  return true
})

const toggleCreate = () => {
  revealCreate.value = !revealCreate.value;
}

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

async function deletePicture(locationPictureId) {
  try {
    const deleteConfirmation = await Pop.confirm('You sure you want to delete this photo?');
    if (!deleteConfirmation) return
    await picturesService.deletePicture(locationPictureId);
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
      <div v-for="(locationPicture, index) in locationPictures" :key="locationPicture.id" class="carousel-item active"
        data-bs-interval="3000">
        <img :src="locationPicture.picture" class="d-block w-100 position-relative" :alt="locationPicture.id">
        <div v-if="YouAreAVisitor"
          class="position-absolute w-100 h-100 top-0 start-0 d-flex align-items-end justify-content-center">
          <div class="create-design mb-2">
            <div @click="toggleCreate()">
              <i type="button" class="fa-solid fa-camera fa-lg" style="color: #8ca6d5;"></i>
            </div>
            <div v-if="revealCreate">
              <form @submit.prevent="createPicture()">
                <label class="form-label" for="pictureUrl">Picture:</label>
                <input class="form-control" type="url" v-model="pictureData.picture" minlength="3" maxlength="500"
                  id="pictureUrl" name="pictureUrl" required>
                <button class="btn btn-outline-light mt-2">Submit</button>
              </form>
            </div>
          </div>

          <div v-if="account?.id === locationPicture.creatorId && index !== 0" class="delete-design ms-2 mb-2">
            <i @click="deletePicture(locationPicture.id)" type="button" class="fa-solid fa-trash fa-lg"
              style="color: #dd0000;"></i>
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
    <img class="w-100 d-block" :src="location?.coverImg" alt="Location Image">
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
  background-color: rgba(0, 0, 0, 60%);
  border-radius: 10px;
  z-index: 999;
}
</style>