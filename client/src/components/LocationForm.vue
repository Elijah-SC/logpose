<script setup>
import { ref } from 'vue';
import HereMap from './HereMap.vue';

const locationCategories = ['hiking', 'skiing', 'snowboarding', 'wilderness'];
const editableFormData = ref({
  name: '',
  coverImg: '',

})
</script>

<template>
  <section class="container">
    <form class="row">
      <div v-if="" class="col-12">
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
        <label for="locationDirections">Directions</label>
        <input class="form-control" id="locationDirections" name="locationDirections">
      </div>
      <div class="col-12">
        <label for="locationDescription">Description</label>
        <textarea name="locationDescription" id="locationDescription"></textarea>
      </div>
      <div class="col-md-12">
        <div class="d-flex">
          <label for="locationCategories">Location Type</label>
          <select class="form-control" name="locationCategories" id="locationCategories">
            <option disabled selected value="">Select location category</option>
            <option v-for="locationCategory in locationCategories" :key="locationCategory" :value="locationCategory">{{
              locationCategory }}></option>
          </select>
        </div>
        <div>
          <label class="form-label" for="locationCheck"></label>
          <input class="form-control" type="checkbox" name="locationCheck" id="locationCheck">
        </div>
      </div>
      <div class="col-md-12">
        <HereMap />
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped></style>