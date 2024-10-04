<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';

const locations = computed(() => AppState.locations)
</script>


<template>
    <h1>Saved location</h1>
    <div class="container">
        <section class="row">
            <div v-for="location in locations" :key="location.id" class="col-md-4">
                <LocationCard :location="location" />
            </div>
        </section>
    </div>
</template>


<style lang="scss" scoped></style>