<script setup>
import HereMap from "@/components/HereMap.vue";
import Navbar from "@/components/Navbar.vue";


</script>


<template>
  <header>
    <Navbar />
  </header>

  <body class="container-fluid">
    <div class="row">
      <div class="order-1 order-md-0 col-md-4">
        location card sections
      </div>
      <div class="order-0 order-md-2 col-md-8">
        <HereMap />
      </div>
    </div>
  </body>
</template>


<style lang="scss" scoped></style>