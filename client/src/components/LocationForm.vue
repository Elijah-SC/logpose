<script setup>
import { ref } from 'vue';
import HereMap from './HereMap.vue';

const locationCategories = ['hiking', 'skiing', 'snowboarding', 'wilderness'];
const locationData = ref({
  name: '',
  coverImg: '',
  directions: '',
  description: '',
  category: '',

})
</script>

<template>
  <section class="container">
    <form class="row">
      <div v-if="locationData.coverImg" class="col-12">
        <h4>Image Preview</h4>
      </div>
      <div class="col-md-6">
        <label class="form-label" for="locationName">Location Name</label>
        <input class="form-control" id="locationName" name="locationName">
      </div>
      <div class="col-md-6">
        <label class="form-label" for="locationCoverImg">Cover Image</label>
        <input type="url" class="form-control" id="locationCoverImg" name="locaitonCoverImg">
      </div>
      <div class="col-12">
        <label class="form-label" for="locationDirections">Directions</label>
        <input class="form-control" id="locationDirections" name="locationDirections">
      </div>
      <div class="col-12">
        <label class="form-label" for="locationDescription">Description</label>
        <textarea class="form-control" name="locationDescription" id="locationDescription" rows="5"></textarea>
      </div>
      <div class="col-md-12">
        <div class="d-flex align-items-center">
          <div class="w-75">
            <label class="form-label" for="locationCategories">Location Type</label>
            <select class="form-control" name="locationCategories" id="locationCategories">
              <option disabled selected value="">Select location category</option>
              <option v-for="locationCategory in locationCategories" :key="locationCategory" :value="locationCategory">
                {{
                  locationCategory }}</option>
            </select>
          </div>

          <div class="w-25 mx-auto">
            <label class="form-label" for="locationCheck">Use my location</label>
            <input class="align-self-center" type="checkbox" name="locationCheck" id="locationCheck">
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <HereMap />
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>