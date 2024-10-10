<script setup>
import { AppState } from '@/AppState.js';
import Carousel from '@/components/Carousel.vue';
import DiscoverLocCard from '@/components/DiscoverLocCard.vue';
import Comment from '@/components/globals/Comment.vue';
import LocationPickerDev from "@/components/globals/LocationPickerDev.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import Navbar from "@/components/Navbar.vue";
import TrueHereMap from '@/components/TrueHereMap.vue';
import { commentsService } from '@/services/CommentsService.js';
import { locationService } from '@/services/LocationService.js';
import { picturesService } from '@/services/PicturesService.js';
import { savedLocations } from '@/services/SavedLocationsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { Modal } from "bootstrap";
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const account = computed(() => AppState.account)
const activeLocation = computed(() => AppState.activeLocation);
const randomLocations = computed(() => AppState.randomLocations);
const locationVisitors = computed(() => AppState.locationVisitors.filter(visitor => visitor.visited));
const comments = computed(() => AppState.comments)

const toggler = () => {
  toggle.value = !toggle.value;
}

const toggle = ref(null);
const editableCommentData = ref({
  body: '',
});

const YouAreAVisitor = computed(() => {
  if (AppState.identity == null) return false
  const visited = AppState.locationVisitors.find(visitor => visitor.creatorId == AppState.account?.id && visitor.visited)
  if (!visited) return false
  return true
})

// const LocationSaved = computed(()=> {
//   if (AppState.identity == null) return false
//   const savedLocation = AppState
// })

const foundUserVisitedLocation = computed(() => AppState.locationVisitors.find(lv => lv.creatorId == AppState.account?.id))

watch(() => route.params.locationId, () => {
  getActiveLocation();
  getRandomLocations();
  getAllVisitors();
  getAllComment();
  getAllPicture()
},
  { immediate: true }
);

// @ts-ignore
async function getActiveLocation() {
  try {
    const locationId = route.params.locationId;
    await locationService.getActiveLocation(locationId);
  }
  catch (e) {
    Pop.error(e);
    logger.error(e);
  }
}

// @ts-ignore
async function getRandomLocations() {
  try {
    await locationService.getRandomLocations();
  }
  catch (e) {
    Pop.error(e);
    logger.error(e);
  }
}

async function createSavedLocation(visited) {
  try {
    const locationData = { locationId: route.params.locationId, visited: visited }
    await savedLocations.createSavedLocation(locationData)
    Pop.success(`locationSaved`)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function checkIn() {
  try {
    await savedLocations.checkIn({
      visited: !foundUserVisitedLocation.value.visited,
      id: foundUserVisitedLocation.value.id
    }, foundUserVisitedLocation.value.id)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getAllPicture() {
  try {
    await picturesService.getAllPicture(route.params.locationId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getAllVisitors() {
  try {
    await savedLocations.getAllVisitors(route.params.locationId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getAllComment() {
  try {
    await commentsService.getAllComment(route.params.locationId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function editComment(commentId) {
  try {
    const updateConfirmation = await Pop.confirm('Confirm Changes?');
    if (!updateConfirmation) return;
    const updatedCommentData = editableCommentData.value;
    await commentsService.editComment(commentId, updatedCommentData);
    toggle.value = !toggle.value;
    editableCommentData.value = {
      body: ''
    }
  }
  catch (error) {
    Pop.error(error);
  }
}

async function deleteComment(commentId) {
  try {
    await commentsService.deleteComment(commentId)
  }
  catch (error) {
    Pop.error(error);
  }
}

function handleCheckIn() {
  Modal.getOrCreateInstance('#location-picker').hide()
  Pop.success(`Checked in`)
  if (foundUserVisitedLocation.value) {
    checkIn()
  }
  else {
    createSavedLocation(true)
  }
}
</script>

<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <div v-if="activeLocation" class="container-fluid">
    <section class="row">
      <div class="col-12">
        <Carousel :location="activeLocation" />
      </div>
      <div class="col-12">
        <TrueHereMap :coordinatesProp="{ latitude: activeLocation.latitude, longitude: activeLocation.longitude }" />
      </div>
      <ModalWrapper id="location-picker">
        <LocationPickerDev :activeLocation="activeLocation" @within-distance="handleCheckIn()" />
      </ModalWrapper>
      <!-- SECTION About Location -->
      <div class="col-md-6">
        <div>
          <h3 class="text-center">About this location</h3>
          <p>{{ activeLocation.description }}</p>
        </div>
      </div>
      <!-- SECTION Directions -->
      <div class="col-md-6">
        <div>
          <h3 class="text-center">Directions</h3>
          <p>{{ activeLocation.directions }}</p>
          <div class="text-center">
            <div>
              <button v-if="!foundUserVisitedLocation" @click="createSavedLocation(false)" type="button"
                class="btn btn-outline-dark rounded me-2">
                Log it
              </button>
            </div>
            <div>
              <button v-if="YouAreAVisitor" @click="checkIn()" type="button" class="btn btn-outline-danger rounded">
                Leave </button>
              <button v-else type="button" class="btn btn-outline-dark rounded" data-bs-toggle="modal"
                data-bs-target="#location-picker">
                Check in
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- NOTE Comments -->
      <div class="col-md-6">
        <div class="bg-light p-2 rounded">
          <div class="d-flex justify-content-between">
            <h4>Comments</h4>
            <div>
              <p>Latest | Popular</p>
            </div>
          </div>
          <!-- Create Comment -->
          <Comment />
          <!-- Account | User Comments -->
          <div v-for="comment in comments" :key="comment.id">
            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-center mb-2">
                <img class="guy me-2" :src="comment.creator.picture" :alt="comment.creator.name">
                <p class="m-0">{{ comment.creator.name }}</p>
              </div>
              <div v-if="account && account.id === comment.creatorId" class="dropdown mx-3 account-comment">
                <i class="mdi mdi-dots-horizontal fs-4" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false"></i>
                <ul class="dropdown-menu rounded-0">
                  <li>
                    <button @click="toggler" class="dropdown-item">Edit
                    </button>
                  </li>
                  <hr />
                  <li>
                    <button :disabled="comment.creator.id != account?.id" @click="deleteComment(comment.id)"
                      class="dropdown-item">Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="toggle && account.id === comment.creatorId">
              <form @submit.prevent="editComment(comment.id)">
                <textarea rows="5" v-model="editableCommentData.body" placeholder="Editing Comment" class="form-control"
                  name="body" id="body">
                </textarea>
                <div class="mt-2">
                  <button @click="toggler()" type="button" class="btn btn-outline-dark">Cancel</button>
                  <button class="btn btn-outline-dark ms-2">Finish Editing</button>
                </div>
              </form>
            </div>
            <div v-else>
              <p>{{ comment.body }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h3>People who have checked in</h3>
        <div v-for="visitor in locationVisitors" :key="visitor.id" class="p-2 bg-light visitor-container">
          <div class="d-flex align-items-center border-start border-2 border-dark">
            <i class="fa-solid fa-certificate fa-lg mx-2" style="color: #B197FC;"></i>
            <img class="guy me-2" :src="visitor.creator?.picture" :alt="visitor.creator?.name">
            <p class="m-0">{{ visitor.creator?.name }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- TODO Replace with actual locations -->
    <div v-if="randomLocations" class="row gx-3 gy-2 mt-2">
      <h3 class="text-center">Discover new locations</h3>
      <div v-for="randomLocation in randomLocations" :key="randomLocation.id" class="col-md-4">
        <DiscoverLocCard :locationProp="randomLocation" />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
textarea {
  resize: none;
}

.account-comment {
  background: none;
  border: none;
}

.guy {
  aspect-ratio: 1/1;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.visitor-container {
  max-width: fit-content;
}
</style>