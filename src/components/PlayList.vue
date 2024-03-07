<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useEventListener } from '../assets/js/event'
import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs'
import { useRoute } from 'vue-router';
import axios from '../axios/axios';

const route = useRoute()
const colorThief = new ColorThief();
//dom
const header = ref(null)
const cover = ref(null)
const bg = ref(null)
const imageElement = ref(null)
let rgb


//获取歌曲
const getList = async () => {
    const { data: res } = await axios.get('')
}

//监听滚动改变顶部背景颜色
useEventListener(document, "scroll", (e) => {
    let scrollTop = document.documentElement.scrollTop
    let range = cover.value.offsetHeight
    if (scrollTop <= range) {
        header.value.style.backgroundColor = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + scrollTop / range + ')'
    } else {
        header.value.style.backgroundColor = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',1)'
    }
})

onMounted(() => {
    imageElement.value.onload = () => {
        rgb = colorThief.getColor(imageElement.value)
        bg.value.style.backgroundColor = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',1)'
    }
})
</script>

<template>
    <div ref="bg" class="fixed z-0 w-screen h-screen dark:brightness-75"></div>
    <div class="dark:text-white flex flex-col  min-h-screen z-10">
        <div ref="header" class="header p-1 flex justify-between sticky top-0 z-50 dark:brightness-75">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-10 h-10 p-1 rounded-full active:bg-gray-200 dark:active:bg-gray-800"
                    @click="$router.back(-1)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <h6 class="pl-1">歌单</h6>
            </div>
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor"
                    class="w-10 h-10 p-1.5 rounded-full active:bg-gray-200 dark:active:bg-gray-800">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-10 h-10 p-1 rounded-full active:bg-gray-200 dark:active:bg-gray-800">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
            </div>
        </div>
        <div ref="cover" class="py-10 z-10 text-center">
            <img ref="imageElement" class="w-28 h-28 object-cover rounded-lg m-auto bg-blue-300"
                src="http://p2.music.126.net/Cl0-NpZ0ESTDjJ1HmZ33KA==/109951163460576279.jpg" alt="cover"
                crossorigin="anonymous">
            <h5>koto</h5>
            <p class="text-xs text-gray-500">Redamancy</p>
        </div>
        <div class="flex-auto rounded-t-2xl bg-white opacity-90 dark:bg-black dark:opacity-50 py-3 z-10">
            <div class="flex justify-between px-3 py-2 sticky top-12 bg-white opacity-98 dark:bg-black">
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-indigo-500">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                    </svg>
                    <p class="pl-1">
                        播放全部
                        <span class="text-xs text-gray-400">(10)</span>
                    </p>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
            </div>
            <div class="pt-1">
                <div v-for="i in 100" class="flex items-center text-sm py-1.5 px-3 first:pt-0">
                    <div class="w-5 text-center text-gray-400">
                        <p>{{ i }}</p>
                    </div>
                    <div class="flex-1 pl-3">
                        <h6>小半</h6>
                        <p class="text-xs flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-4 h-4 text-indigo-500" v-if="true">
                                <path
                                    d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                            <span>陈粒—小梦大半</span>

                        </p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>