<script setup>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'
import {ref} from 'vue'

const time = ref(0)

//拖动进度条改变播放进度
const changePlay = ()=>{
    console.log(time.value);
}

</script>

<template>
    <div class="relative pt-4 overflow-x-hidden">
        <div class="absolute top-2 left-0 w-screen z-10">
            <vue-slider v-model="time" 
                :contained="true" 
                :drag-on-click="true" 
                tooltip="none" 
                :duration="0" 
                :use-keyboard="false" 
                :dotSize="10" 
                :lazy="true" 
                :max="120" 
                @change="changePlay">
            </vue-slider>
        </div>
        <div class="flex items-center px-3 py-1 w-screen bg-white dark:bg-black opacity-[.98]">
            <div class="rounded-full bg-black dark:bg-gray-800 p-2">
                <img class="w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=666&q=80"
                    alt="">
            </div>
            <div class="flex-grow pl-3">
                <span>
                    虚拟
                    <span class="opacity-60">-陈粒</span>
                </span>
            </div>
            <div class="border border-gray-500 dark:border-white rounded-full h-6 w-6 flex justify-center items-center">
                <svg v-if="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <div class="pl-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8 text-gray-800 dark:text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped></style>