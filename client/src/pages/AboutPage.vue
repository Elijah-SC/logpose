<script setup>

</script>

<template>
  <div class="about">
    <img class="ms-2" src="/img/logpose-logo.svg" alt="logo" />
  </div>
  <div class="container">
    <section class="row">
      <div class="text-center">
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, ea praesentium quidem aperiam accusantium
          voluptates, eos corporis nisi deleniti laboriosam explicabo sequi quia quibusdam, vero quos dolor ullam alias
          id possimus porro eveniet necessitatibus! Vitae aliquam saepe eveniet, vel harum adipisci rem iusto
          voluptatem, officia soluta doloremque architecto tempora neque.
        </p>
      </div>
    </section>

    <section class="row">
      <div class="text-center">
        <h1>Contributors</h1>
      </div>
      <div class=" d-flex bg-light shadow rounded mb-2">
          <img class="contributor-img img-fluid mb-2"
            src="https://images.unsplash.com/photo-1557109077-4caf3851fd3f?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="contributor name">
            <div class="flex-column align-self-center ms-2">
              <h4>Name</h4>
              <i class="mdi mdi-github fs-3"></i>
              <i class="mdi mdi-linkedin fs-3"></i>
            </div>
            <div class="align-self-center ms-4">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus tempore totam officiis velit voluptates assumenda doloribus labore corporis officia ut?</p>
            </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.contributor-img {
  height: 15dvh;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>