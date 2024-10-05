<script setup>

</script>

<template>
  <!-- SECTION Hero -->
  <section class="container-fluid d-flex justify-content-center align-items-center position-relative hero">
    <video class="vid" src="/src/assets/vid/Explore.mp4" autoplay loop playsinline muted></video>
    <div class="text-center text-light mb-5 hero-msg">
      <h1 class="mb-4">Find Your Outside</h1>
      <h2>Explore Locations</h2>
    </div>
  </section>

  <!-- SECTION About & Explore logpose -->
  <section class="container-fluid d-flex justify-content-center align-items-center explore py-2">
    <div class="row justify-content-center">
      <div class="col-9">
        <div class="row gy-3">
          <div class="col-md-6">
            <div class="text-light about-msgs">
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
            <div class="logpose-logo-piece-container h-100">
              <img class="logo-piece-img" src="/img/logpose-logo-piece.svg" alt="logo">
            </div>
          </div>
          <div class="col-md-6">
            <div class="explore-msg">
              <div class="p-1 rounded bg-light mb-3">
                <h3>Adventure awaits you</h3>
              </div>
              <div class="text-center">
                <router-link :to="{ name: 'Explore' }">
                  <button class="btn btn-light rounded-pill px-3" type="button">Explore</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  min-height: 93dvh;
}

.explore {
  min-height: 100dvh;
  background-image: url(https://images.unsplash.com/photo-1621178734002-ad899f4fec71?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  background-size: cover;
}

.hero-msg {
  background-color: rgba($color: #000000, $alpha: 0.3);
  text-shadow: 1px 1px 7px #fffafa;
  padding: .9rem;
  border-radius: 10px;
}

.about-msgs {
  background-color: rgba($color: #000000, $alpha: 0.3);
  padding: .9rem;
  border-radius: 10px;
}

.about-msg-1 {
  line-height: 1.5em;
}

.about-msg-2 {
  line-height: 2em;
}

.explore-msg {
  max-width: fit-content;
  margin: 0 auto;
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

.vid {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>
