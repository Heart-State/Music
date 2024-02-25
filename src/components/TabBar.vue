<script setup>
import PlayBar from './PlayBar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const active = ref('');
const router = useRouter();

onMounted(() => {
    active.value = router.currentRoute.value.fullPath;
})
</script>

<template>
    <PlayBar></PlayBar>

    <div class="flex justify-around bg-white dark:bg-black px-5 py-3 text-xs text-gray-600">
        <div :class="active == '/index' ? 'text-blue-500' : ''">
            <router-link to="/index">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                主页
            </router-link>
        </div>
        <div :class="active == '/home' ? 'text-blue-500' : ''">
            <router-link to="/home" class="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                我的
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>