<script setup>
import { onMounted, ref } from 'vue'
import Message from '../assets/js/message'
import debounce from '../assets/js/debounce';

// 定义派发事件
const emit = defineEmits(['exit'])
//绑定虚拟Dom
const main = ref()
const mask = ref()

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
            { bottom: -height  + 'px' }
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
        // 动画结束后执行的操作
        emit('exit')
    });
}
</script>

<template>
    <div ref="main"
        class="animate-[timing_0.4s] w-screen fixed z-50 bottom-0 bg-gray-100 rounded-t-2xl dark:bg-gray-900 p-2 dark:text-white">
        <h5 class="p-1 text-lg">定时关闭</h5>
        <div class="px-3 py-5 m-1 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h6>选择时间</h6>
            <div class="py-3 flex justify-around">
                <div :class="[selectedTime == time ? 'active' : '']" class="inline p-1 rounded-full shadow-md"
                    v-for="time in times" :key="time">
                    <p class="w-10 h-10 leading-10">{{ time }}</p>
                </div>
            </div>
            <div class="py-2 my-3 shadow-md rounded-lg text-gray-400">
                自定义
            </div>
            <div class="py-2 my-3 shadow-md rounded-lg text-gray-400">
                取消
            </div>
        </div>
    </div>
    <div @click="exit" ref="mask" class="animate-[mask_0.4s] opacity-60 bg-slate-950 w-screen h-screen fixed top-0 z-10">
    </div>
</template>

<style scoped></style>