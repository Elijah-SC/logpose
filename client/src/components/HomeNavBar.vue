<script setup>
import Login from './Login.vue';
</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-dark px-3 sticky-top">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <img class="ms-2" src="/img/LogPose-WhiteText.svg" alt="logo" />
    </router-link>
    <button class="navbar-toggler btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav ms-auto text-center">
        <li>
          <router-link :to="{ name: 'About' }" class="btn btn-outline-light text-light lighten-30 selectable">
            About
          </router-link>
        </li>
        <li class="mx-3">
          <router-link :to="{ name: 'Explore' }" class="btn btn-outline-light text-light lighten-30 selectable">
            Explore
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login class="text-center" />
    </div>
  </nav>
</template>

<style scoped>
img {
  height: 65px;
  border-radius: 10px;
  padding: 0 .6rem 0 .6rem;
}
</style>