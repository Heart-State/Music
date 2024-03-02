<script setup>
import { defineProps } from 'vue';

const item = defineProps({
    name: String,
    playCount: Number,
    picUrl: String
});

</script>

<template>
    <div class="p-1.5">
        <div>
            <img class="w-20 h-20 rounded-lg"
                :src="item.picUrl"
                alt="">
        </div>
        <div class="pt-1.5">
            <p class="text-ellipsis line-clamp-2 text-xs overflow-hidden w-20">{{item.name}}</p>
        </div>
    </div>
</template>

<style scoped>

</style>