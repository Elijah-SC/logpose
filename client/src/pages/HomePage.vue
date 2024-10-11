<script setup>
import Globe from "@/components/Globe.vue";
import HomeNaveBar from "@/components/HomeNavBar.vue";

</script>

<template>
  <!-- SECTION Hero -->
  <section class="container-fluid position-relative hero">
    <div>
      <HomeNaveBar />
    </div>
    <div class="hero-child d-flex flex-column justify-content-center align-items-center">


      <!-- <video class="vid" src="/src/assets/vid/Explore.mp4" autoplay loop playsinline muted></video> -->
      <div class="earth">
        <Globe />
      </div>
      <div class="text-center text-light mb-5 hero-msg">
        <h1 class="mb-4">Find Your Outside</h1>
        <h4>Explore Locations</h4>
      </div>

    </div>
  </section>

  <!-- SECTION About & Explore logpose -->
  <section class="container-fluid">
    <div class="mx d-flex justify-content-center align-items-center explore p-4 rounded my-5">

      <div class="row justify-content-start">
        <div class="col-md-5">
          <div class="text-light about-msgs">
            <h5 class="fw-bold about-msg-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
              perferendis
              natus,
              deserunt
              necessitatibus</h5>
            <p class="about-msg-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus autem iure
              laudantium
              assumenda ad
              praesentium doloribus delectus eligendi recusandae ratione sapiente, cupiditate iste eos non officiis.
              Beatae officia facilis unde, doloremque, qui enim molestias quam facere quae vitae eum ullam.</p>
          </div>
          <div class="explore-msg mt-3">
            <div class="p-1 rounded mb-3">
              <h3 class="adventure-text">Adventure awaits you</h3>
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
  </section>
</template>

<style scoped lang="scss">
.adventure-text {
  color: #fffafa;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.625);
}

.mx {
  margin-right: 1em;
  margin-left: 1em;
}

.hero {
  min-height: 68dvh;
}

.hero-child {
  min-height: 65dvh;
}

.explore {
  min-height: 80dvh;
  background-image: url('https://www.travelandleisure.com/thmb/kfcKH88gBt_d1ZJPFg_rUcyMekU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-grand-teton-USMNTNSIPOG0823-2538d183b9094e3fb59dd5e54bbe791c.jpg');
  background-size: cover;
}

.hero-msg {
  background-color: rgba($color: #000000, $alpha: 0.3);
  text-shadow: 1px 1px 7px #fffafa;
  padding: .9rem;
  border-radius: 10px;
  max-width: 50%;
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

.earth {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}
</style>
