<script setup>
import Login from './Login.vue';
</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark px-3 sticky-top">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <img class="ms-2" src="/img/logpose-logo.svg" alt="logo" />
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav ms-auto">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-light lighten-30 selectable">
            About
          </router-link>
        </li>
        <li class="mx-3">
          <router-link :to="{ name: 'Explore' }" class="btn text-light lighten-30 selectable">
            Explore
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<style scoped>
img {
  height: 45px;
  background-color: azure;
  border-radius: 10px;
  padding: 0 .6rem 0 .6rem;
}
</style>
