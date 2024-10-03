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

  <section class="container-fluid d-flex justify-content-center align-items-center">
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
          <div class="col-md-6">
            <div class="">

            </div>
            <img class="logo-piece-img" src="/img/logpose-logo-piece.svg" alt="logo">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  min-height: 90dvh;
  background-image: url(https://images.unsplash.com/photo-1621178734002-ad899f4fec71?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  background-size: cover;
  background-position: center;
}

section {
  &:not(.hero) {
    min-height: 100dvh;
    background-color: #333;
  }
}

.about-msg-1 {
  line-height: 1.5em;
}

.about-msg-2 {
  line-height: 2em;
}

.logo-piece-img {
  height: 100%;
  max-width: 100%;
}
</style>
