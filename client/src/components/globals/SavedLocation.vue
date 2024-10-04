<script setup>
import { savedLocations } from '@/services/SavedLocationsService.js';
import Pop from '@/utils/Pop.js';
import { useRoute } from 'vue-router';

const route = useRoute()

async function createSavedLocation() {
    try {
        const locationData = { locationId: route.params.locationId }
        await savedLocations.createSavedLocation(locationData)
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <h1>saved location</h1>
    <div>
        <button @click="createSavedLocation()" class="btn btn-outline-secondary">Log it</button>
    </div>
</template>


<style lang="scss" scoped></style>