<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useEventListener } from '../assets/js/event'

// 定义派发事件
const emit = defineEmits(['exit'])
//绑定虚拟Dom
const main = ref()
const mask = ref()
const hour = ref(null)
const minute = ref(null)
//自定义flag
const flag = ref(false)

const times = [10, 15, 20, 30, 45, 60]
const selectedTime = ref(localStorage.getItem("selectedTime"))

//退出组件
const exit = () => {
    let computedStyle = window.getComputedStyle(main.value);
    let currentBottom = parseFloat(computedStyle.getPropertyValue('bottom'));
    let height = parseFloat(computedStyle.getPropertyValue('height'));
    console.log(height);
    // 创建动画效果
    let animation = main.value.animate(
        [
            { bottom: currentBottom + 'px' },
            { bottom: -height + 'px' }
        ],
        {
            duration: 400, // 动画持续时间，单位毫秒
            easing: 'ease', // 缓动函数
            fill: 'forwards' // 动画结束后保持最后一个状态
        }
    );
    main.value.classList.remove("animate-[timing_0.4s]")
    let maskStyle = window.getComputedStyle(mask.value);
    let currentOpacity = parseFloat(maskStyle.getPropertyValue('opacity'));
    mask.value.animate(
        [
            { opacity: currentOpacity },
            { opacity: 0 }
        ],
        {
            duration: 400, // 动画持续时间，单位毫秒
            easing: 'ease', // 缓动函数
            fill: 'forwards' // 动画结束后保持最后一个状态
        }
    );
    mask.value.classList.remove("animate-[mask_0.4s]")
    // 等待动画结束
    animation.finished.then(() => {
        //清楚监听
        hour.value.removeEventListener("scroll", handleScroll);
        minute.value.removeEventListener("scroll", handleScroll);
        emit('exit')
    });

}



const handleScroll = (event) => {
    // 震动
    console.log();
    navigator.vibrate([50]);
};


onMounted(() => {
    if (hour.value) {
        hour.value.addEventListener("scroll", handleScroll);
    }
    if (minute.value) {
        minute.value.addEventListener("scroll", handleScroll);
    }
});

</script>

<template>
    <div ref="main"
        class="animate-[timing_0.4s] w-screen fixed z-50 bottom-0 bg-gray-100 rounded-t-2xl dark:bg-gray-900 p-2 dark:text-white">
        <h5 class="p-1 text-lg">
            {{ flag ? "自定义关闭" : "定时关闭" }}
        </h5>
        <div v-show="!flag" class="px-3 py-5 m-1 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h6>选择时间</h6>
            <div class="py-3 flex justify-around">
                <div :class="[selectedTime == time ? 'bg-indigo-600 text-white' : '']"
                    class="inline p-1 rounded-full shadow-md active:text-white active:bg-indigo-600" v-for="time in times"
                    :key="time">
                    <p class="w-10 h-10 leading-10">{{ time }}</p>
                </div>
            </div>
            <div class="py-2 my-3 shadow-md rounded-lg text-gray-400 active:text-white active:bg-indigo-600 dark:bg-gray-700"
                @click="flag = true">
                自定义
            </div>
            <div
                class="py-2 my-3 shadow-md rounded-lg text-gray-400 active:text-white active:bg-indigo-600 dark:bg-gray-700">
                取消
            </div>
        </div>
        <div v-show="flag" class="px-3 py-5 m-1 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm">

            <div class="flex justify-center pb-1 text-2xl">

                <div class="flex items-center pr-3">
                    <div class="overflow-y-scroll no-scrollbar py-16 h-36 snap-y" ref="hour">
                        <div class="py-2 px-1 snap-center" v-for="hour in 24" :key="hour">
                            {{ (hour - 1) < 10 ? '0' + (hour - 1) : hour - 1 }} </div>
                        </div>
                        <div class="text-sm text-gray-400">小时</div>
                    </div>

                    <div class="flex items-center pl-3">
                        <div class="overflow-y-scroll no-scrollbar py-16 h-36 snap-y" ref="minute">
                            <div class="py-2 px-1 snap-center" v-for="minute in 60" :key="minute">
                                {{ (minute - 1) < 10 ? '0' + (minute - 1) : minute - 1 }} </div>
                            </div>
                            <div class="text-sm text-gray-400">分钟</div>
                        </div>

                    </div>

                    <div class="flex">
                        <div class="py-2 mr-1 my-3 shadow-md rounded-lg text-gray-400 flex-1 active:text-white active:bg-indigo-600 dark:bg-gray-700"
                            @click="flag = false">
                            取消
                        </div>
                        <div class="py-2 ml-1 my-3 shadow-md rounded-lg text-white bg-indigo-600 flex-1">
                            确定
                        </div>
                    </div>

                </div>
            </div>
            <div @click="exit" ref="mask"
                class="animate-[mask_0.4s] opacity-60 bg-slate-950 w-screen h-screen fixed top-0 z-10"></div>
</template>

<style scoped></style>