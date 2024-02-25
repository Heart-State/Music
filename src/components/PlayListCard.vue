<script setup>
import { defineProps } from 'vue'

const listInfo = defineProps({
    title: String,
    count: Number,
    times: Number,
    cover: String
})

</script>

<template>
    <div class="flex p-1.5 items-center">
        <div>
            <img class="w-16 h-16 object-cover rounded-lg" :src="listInfo.cover" alt="cover">
        </div>
        <div class="flex-grow pl-2">
            <div>
                {{ listInfo.title }}
            </div>
            <div class="text-slate-400">
                <p>{{ listInfo.count }}首-{{ listInfo.times }}次播放</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>