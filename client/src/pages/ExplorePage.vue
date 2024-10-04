<script setup>
import HereMap from "@/components/HereMap.vue";
import { locationService } from "@/services/LocationService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { onMounted } from "vue";


onMounted(() => getLocations())



async function getLocations() {
  try {
    await locationService.getLocations()
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>


<template>
  <section class="container-fluid bg-light">
    <div class="row">
      <div class="order-1 order-md-0 col-md-4">
        location card sections
      </div>
      <div class="order-0 order-md-2 col-md-8">
        <HereMap />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped></style>