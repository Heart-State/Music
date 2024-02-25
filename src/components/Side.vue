<script setup>
import { computed, onMounted, ref } from 'vue'
import Message from '../assets/js/message'
import debounce from '../assets/js/debounce';

// 定义派发事件
const emit = defineEmits(['exit'])
//深色模式标志
const darkMode = ref(false)
//绑定虚拟Dom
const main = ref()
const rocket = ref()


//深色模式切换
const SwitchingModes = () => {
    darkMode.value = !darkMode.value
    if (darkMode.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.removeItem('theme')
    }
}

//退出组件
const exit = (e) => {
    // main.value.style.animationPlayState = 'paused'
    let computedStyle = window.getComputedStyle(main.value);
    let currentLeft = parseFloat(computedStyle.getPropertyValue('left'));

    // 创建动画效果
    let animation = main.value.animate(
        [
            { left: currentLeft + 'px' },
            { left: '-84vw' }
        ],
        {
            duration: 400, // 动画持续时间，单位毫秒
            easing: 'ease', // 缓动函数
            fill: 'forwards' // 动画结束后保持最后一个状态
        }
    );
    main.value.classList.remove("animate-[side_0.4s]")
    let maskStyle = window.getComputedStyle(e.target);
    let currentOpacity = parseFloat(maskStyle.getPropertyValue('opacity'));
    e.target.animate(
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
    e.target.classList.remove("animate-[mask_0.4s]")
    // 等待动画结束
    animation.finished.then(() => {
        // 动画结束后执行的操作
        emit('exit')
    });
}


//清理缓存
const clear = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    rocket.value.classList.add("animate-bounce")
    if (registration) {
        await registration.unregister();
        setTimeout(() => {
            Message({ message: "清理成功" })
            rocket.value.classList.remove("animate-bounce")
        }, 1000)
    } else {
        setTimeout(() => {
            Message({ message: "您已经清理过了" })
            rocket.value.classList.remove("animate-bounce")
        }, 1000)
    }
}

//清理绑定防抖
const debounceClear = debounce(clear, 1000)

onMounted(() => {
    if (localStorage.theme === 'dark') {
        darkMode.value = true
    } else {
        darkMode.value = false
    }
})
</script>

<template>
    <div ref="main"
        class="animate-[side_0.4s] w-10/12 h-screen fixed z-50 top-0 bg-gray-100 dark:bg-black p-2 dark:text-white">
        <div class="flex items-center flex-col pb-2">
            <div>
                <img class="w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=666&q=80"
                    alt="">
            </div>
            <div>Heart的音乐平台</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg px-3 py-2">
            <div class="flex items-center py-1">
                <p class="flex-grow">深色模式</p>
                <div>
                    <label class="swap swap-rotate">

                        <!-- this hidden checkbox controls the state -->
                        <input type="checkbox" :checked="!darkMode" @change="SwitchingModes" />

                        <!-- sun icon -->
                        <svg class="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        <!-- moon icon -->
                        <svg class="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>


                    </label>
                </div>
            </div>
            <div class="flex items-center py-1 border-t-[0.1px] dark:border-gray-500">
                <p class="flex-grow">清理缓存</p>
                <div @click="debounceClear()" ref="rocket">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="absolute top-[30%]">
            <img src="../../public/img/aya-1.0.0.png" alt="aya" class="w-[80%] m-auto">
        </div>
    </div>
    <div @click="exit" class="animate-[mask_0.4s] opacity-60 bg-slate-950 w-screen h-screen fixed top-0 z-10"></div>
</template>

<style scoped></style>