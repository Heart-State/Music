<script setup>
import { ref } from 'vue'
import TabBar from './TabBar.vue'


</script>

<template>
    <div class="bg-white dark:bg-black dark:text-white flex flex-col min-h-screen">
        <div class="header">
            home
        </div>
        <div class="main grow">

        </div>
        <div class="sticky bottom-0">
            <TabBar></TabBar>
        </div>
    </div>
</template>

<style scoped>

</style>
