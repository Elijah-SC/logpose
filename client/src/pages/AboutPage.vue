<script setup>
</script>

<template>
  <div class="jim-nightshade-regular">
    <div class="d-flex justify-content-center">
      <div class="align-self-center">
        <router-link :to="{ name: 'Home' }">
          <h4 class="fs-2 m-2">Home</h4>
        </router-link>
      </div>
      <div class="">
        <img class="logposeLogImg" src="/img/logpose.svg" alt="logo" />
      </div>
      <div class="align-self-center">
        <router-link :to="{ name: 'Account' }">
          <h4 class="fs-2 m-2">Account</h4>
        </router-link>
      </div>
    </div>
    <div class="text-center">
      <router-link :to="{ name: 'Explore' }">
        <h4 class="fs-2">Explore</h4>
      </router-link>
    </div>
  </div>

  <div class="container">
    <section class="d-flex row about">
      <div class="align-self-center text-center">
        <h1 class="jim-nightshade-regular">About</h1>
        <p class="karla">
          LogPose is a full-stack app designed to have users share interesting out-door locations they found with other
          users. This app is designed to encourage exploration getting outside and exploring.
        </p>
      </div>
    </section>

    <div class="text-center mt-5 pt-5">
      <h1 class="jim-nightshade-regular">Contributors</h1>
    </div>
    <div class=" d-flex bg-light shadow rounded mb-3 col-md-8 mt-3">
      <img class="contributor-img img-fluid mb-2 m-2"
        src="https://images.unsplash.com/photo-1557109077-4caf3851fd3f?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="contributor name">
      <div class="flex-column align-self-center ms-2">
        <h4>Name</h4>
        <i class="mdi mdi-github fs-3"></i>
        <i class="mdi mdi-linkedin fs-3"></i>
      </div>
      <div class="align-self-center ms-4 karla">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus tempore totam officiis velit voluptates
          assumenda doloribus labore corporis officia ut?
        </p>
      </div>
    </div>

    <div class=" d-flex flex-row-reverse bg-light shadow rounded mb-3 col-md-8 offset-4 mt-3">
      <img class="contributor-img img-fluid mb-2 m-2"
        src="https://images.unsplash.com/photo-1557109077-4caf3851fd3f?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="contributor name">
      <div class="flex-column align-self-center ms-2">
        <h4>Name</h4>
        <i class="mdi mdi-github fs-3"></i>
        <i class="mdi mdi-linkedin fs-3"></i>
      </div>
      <div class="align-self-center ms-4 karla">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus tempore totam officiis velit voluptates
          assumenda doloribus labore corporis officia ut?
        </p>
      </div>
    </div>

    <div class=" d-flex bg-light shadow rounded mb-3 col-md-8 mt-3">
      <img class="contributor-img img-fluid mb-2 m-2"
        src="https://images.unsplash.com/photo-1557109077-4caf3851fd3f?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="contributor name">
      <div class="flex-column align-self-center ms-2">
        <h4>Name</h4>
        <i class="mdi mdi-github fs-3"></i>
        <i class="mdi mdi-linkedin fs-3"></i>
      </div>
      <div class="align-self-center ms-4 karla">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus tempore totam officiis velit voluptates
          assumenda doloribus labore corporis officia ut?
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  height: 90dvh;
}

.jim-nightshade-regular {
  font-family: "Jim Nightshade", cursive;
  font-weight: 400;
  font-style: normal;
}

.karla {
  font-family: "Karla", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
}

.contributor-img {
  height: 15dvh;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.logposeLogImg {
  height: 60dvh;
}
</style>