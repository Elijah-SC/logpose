<script setup>
import LocationForm from './components/LocationForm.vue';
import ModalWrapper from './components/ModalWrapper.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <ModalWrapper id="location-form">
    <LocationForm />
  </ModalWrapper>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}
</style>
