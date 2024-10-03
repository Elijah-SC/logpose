<script setup>
import HereMap from '@/components/HereMap.vue';
</script>

<template>
  <section class="hero container-fluid d-flex justify-content-center align-items-center">
    <div class="row">
      <div class="col-12">
        <div class="text-center text-light mb-5">
          <h1 class="mb-4">Find Your outside</h1>
          <h2>Explore Locations</h2>
        </div>
      </div>
    </div>
  </section>

  <section class="container-fluid d-flex justify-content-center align-items-center about-section">
    <div class="row justify-content-center">
      <div class="col-9">
        <div class="row text-light">
          <div class="col-md-6">
            <div>
              <h2 class="fw-bold about-msg-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                perferendis
                natus,
                deserunt
                necessitatibus</h2>
              <p class="about-msg-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus autem iure
                laudantium
                assumenda ad
                praesentium doloribus delectus eligendi recusandae ratione sapiente, cupiditate iste eos non officiis.
                Beatae officia facilis unde, doloremque, qui enim molestias quam facere quae vitae eum ullam.</p>
            </div>
          </div>
          <div class="col-md-6 h-100">
            <div class="logpose-logo-piece-container">
              <img class="logo-piece-img" src="/img/logpose-logo-piece.svg" alt="logo">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container-fluid explore-section d-flex justify-content-center align-items-center">
    <div class="row">
      <div class="col-12">
        <div class="p-2 rounded bg-light explore-msg mb-3">
          <h2>Adventure awaits you</h2>
        </div>
        <div class="text-center">
          <router-link :to="{ name: 'Explore' }">
            <button class="btn btn-light rounded-pill px-3" type="button">Explore</button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  min-height: 90dvh;
}

section {
  &:not(.hero) {
    min-height: 100dvh;
  }
}

.about-section {
  background-color: #333;
}

.explore-section {
  background-image: url(https://images.unsplash.com/photo-1519289455504-3510c41b7cc3?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  background-size: cover;
  background-position: center;
}

.about-msg-1 {
  line-height: 1.5em;
}

.about-msg-2 {
  line-height: 2em;
}

.explore-msg {
  max-width: fit-content;
}

.logpose-logo-piece-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-piece-img {
  height: 250px;
  aspect-ratio: 1/1;
}
</style>
