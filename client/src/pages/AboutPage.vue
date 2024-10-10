<script setup>
import Navbar from "@/components/Navbar.vue";


</script>

<template>
  <div class="about jim-nightshade-regular d-flex justify-content-center">
    <div class="align-self-center">
      <h4 class="fs-2">Home</h4>
    </div>
    <div class="">
      <img class="ms-2 logposeLogImg" src="/img/logpose-logo.svg" alt="logo" />
    </div>
    <div class="align-self-end">
      <h4 class="fs-2">Explore</h4>
    </div>
    <div class="align-self-center">
      <h4 class="fs-2">LogIn</h4>
    </div>
  </div>


  <div class="container">
    <section class="row">
      <div class="text-center">
        <h1 class="jim-nightshade-regular">About</h1>
        <p class="karla">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, ea praesentium quidem aperiam accusantium
          voluptates, eos corporis nisi deleniti laboriosam explicabo sequi quia quibusdam, vero quos dolor ullam alias
          id possimus porro eveniet necessitatibus! Vitae aliquam saepe eveniet, vel harum adipisci rem iusto
          voluptatem, officia soluta doloremque architecto tempora neque.
        </p>
      </div>
    </section>

    <div class="text-center">
<<<<<<< HEAD
      <h1>Contributors</h1>
    </div>
    <div class=" d-flex bg-light shadow rounded mb-2">
=======
      <h1 class="jim-nightshade-regular">Contributors</h1>
    </div>
    <div class=" d-flex bg-light shadow rounded mb-3 col-md-8">
>>>>>>> 402fc8d (styling about page)
      <img class="contributor-img img-fluid mb-2 m-2"
        src="https://images.unsplash.com/photo-1557109077-4caf3851fd3f?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="contributor name">
      <div class="flex-column align-self-center ms-2">
        <h4>Name</h4>
        <i class="mdi mdi-github fs-3"></i>
        <i class="mdi mdi-linkedin fs-3"></i>
      </div>
<<<<<<< HEAD
      <div class="align-self-center ms-4">
=======
      <div class="align-self-center ms-4 karla">
>>>>>>> 402fc8d (styling about page)
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus tempore totam officiis velit voluptates
          assumenda doloribus labore corporis officia ut?</p>
      </div>
    </div>

<<<<<<< HEAD
    <div class=" d-flex bg-light shadow rounded mb-2">
=======
    <div class=" d-flex flex-row-reverse bg-light shadow rounded mb-3 col-md-8 offset-4">
>>>>>>> 402fc8d (styling about page)
      <img class="contributor-img img-fluid mb-2 m-2"
        src="https://images.unsplash.com/photo-1557109077-4caf3851fd3f?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="contributor name">
      <div class="flex-column align-self-center ms-2">
        <h4>Name</h4>
        <i class="mdi mdi-github fs-3"></i>
        <i class="mdi mdi-linkedin fs-3"></i>
      </div>
<<<<<<< HEAD
      <div class="align-self-center ms-4">
=======
      <div class="align-self-center ms-4 karla">
>>>>>>> 402fc8d (styling about page)
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus tempore totam officiis velit voluptates
          assumenda doloribus labore corporis officia ut?</p>
      </div>
    </div>

<<<<<<< HEAD
    <div class=" d-flex bg-light shadow rounded mb-2">
=======
    <div class=" d-flex bg-light shadow rounded mb-3 col-md-8">
>>>>>>> 402fc8d (styling about page)
      <img class="contributor-img img-fluid mb-2 m-2"
        src="https://images.unsplash.com/photo-1557109077-4caf3851fd3f?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="contributor name">
      <div class="flex-column align-self-center ms-2">
        <h4>Name</h4>
        <i class="mdi mdi-github fs-3"></i>
        <i class="mdi mdi-linkedin fs-3"></i>
      </div>
<<<<<<< HEAD
      <div class="align-self-center ms-4">
=======
      <div class="align-self-center ms-4 karla">
>>>>>>> 402fc8d (styling about page)
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus tempore totam officiis velit voluptates
          assumenda doloribus labore corporis officia ut?</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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