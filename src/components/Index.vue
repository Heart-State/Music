<script setup>
import { ref, shallowRef, reactive } from 'vue'
import PlayBar from './PlayBar.vue'
import Card from './Card.vue'
import MusicLibrary from './MusicLibrary.vue'
import Side from './Side.vue'
import Message from '../assets/js/message'
import PlayListCard from './PlayListCard.vue'
import { useRouter } from 'vue-router'

//动态组件绑定值
const currentView = shallowRef()
//传递给子组件的值的容器
const msg = ref({})
//动态组件渲染标志 
const compFlag = ref(false)
const router = useRouter()

const listInfo = reactive({
    title: '我喜欢的音乐',
    count: 108,
    times: 1200,
    cover: '../../public/img/aq-1.0.0.png'
})

//打开侧边组件
const openSide = () => {
    compFlag.value = true
    currentView.value = Side
    document.querySelector('body').classList.add("overflow-hidden")
}

//组件退出
const exit = () => {
    compFlag.value = false
    currentView.value = null
    document.querySelector('body').classList.remove("overflow-hidden")
}

//打开歌单
const openList = (e) => {
    //动画
    openAnimate(e.currentTarget, () => {
        router.push({
            path: '/play/list',
            query: {
                id: 1321312
            }
        })
    })
}

//新增歌单
const openAddList = (e) => {
    //动画
    openAnimate(e.currentTarget,()=>{
        
    })
}

//打开歌单动画
const openAnimate = (e,fn) => {
    let animation = e.animate(
        [
            { transform: 'scale(1)' },
            { transform: 'scale(0.96)' }
        ],
        {
            duration: 200, // 动画持续时间，单位毫秒
            easing: 'ease', // 缓动函数
            //fill: 'forwards' // 动画结束后保持最后一个状态
        }
    );
    animation.finished.then(() => {
        fn()
    })
}

</script>

<template>
    <div class="bg-white dark:bg-black dark:text-white flex flex-col min-h-screen">
        <div
            class="header flex items-center bg-white dark:bg-black px-3 py-2 sticky top-0 opacity-90 backdrop-blur-lg z-10">
            <div @click="openSide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-gray-600 dark:text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
            </div>
            <div class="grow pl-3">
                <label class="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <span class="flex items-center p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 text-gray-400">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </span>
                    <input placeholder="搜索" disabled class="outline-none bg-gray-100 dark:bg-gray-800 w-full" type="text"
                        name="search" />
                </label>
            </div>
        </div>
        <div class="main grow p-1.5">
            <MusicLibrary></MusicLibrary>
            <div class="pt-2">
                <h1 class="text-lg font-bold pl-2">推荐歌单</h1>
                <div class="flex overflow-x-auto">
                    <Card v-for="i in 10" :key="i" @click="openList($event)"></Card>
                </div>
            </div>
            <div class="pt-2">

                <h1 class="text-lg font-bold pl-2">我的歌单</h1>

                <div class="flex p-1.5 items-center" @click="openList($event)">
                    <div class="bg-gray-200 dark:bg-gray-800 rounded-lg w-16 h-16 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-10 h-10 text-gray-500">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </div>
                    <div class="flex-grow pl-2">
                        <div>
                            本地音乐
                        </div>
                        <div class="text-slate-400 text-xs">
                            <p>198首</p>
                        </div>
                    </div>
                </div>

                <div @click="openList($event)">
                    <PlayListCard v-bind="listInfo"></PlayListCard>
                </div>

                <div class="flex p-1.5 pb-0 items-center" @click="openAddList($event)">
                    <div class="bg-gray-200 dark:bg-gray-800 rounded-lg w-16 h-16 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-10 h-10 text-gray-500">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div class="flex-grow pl-2">
                        <div>
                            新建歌单
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sticky bottom-0 z-10">
            <!-- <TabBar></TabBar> -->
            <PlayBar></PlayBar>
        </div>
    </div>
    <!-- <Side></Side> -->
    <component @exit="exit" :is="currentView" v-if="compFlag" />
</template>

<style scoped></style>
