<script setup>
import { onActivated, onMounted, ref } from 'vue'

// 定义派发事件
const emit = defineEmits(['exit'])
//绑定虚拟Dom
const main = ref(null)
const mask = ref(null)
const hour = ref(null)
const minute = ref(null)
const textHeight = ref(null)
//自定义页面flag
const flag = ref(false)
//是否自定义定时
const customized = ref(JSON.parse(localStorage.getItem("customized")))
//记录上一次滚动震动的位置
let lastVibrationPosition = 0
//标题(有时间就倒计时)
const title = ref("选择时间")
let timer;

const times = [10, 15, 20, 30, 45, 60]
const selectedTime = ref(localStorage.getItem("selectedTime"))
const selected = ref(localStorage.getItem("selected"))

const titleComputed = () => {
    let m = Math.floor(selectedTime.value / 60);
    let s = selectedTime.value % 60;
    if (selectedTime.value > 0 && selectedTime.value != null) {
        title.value = ((m < 10) ? ('0' + m) : m) + ':' + ((s < 10) ? ('0' + s) : s);
    } else {
        //取消定时走这里
        window.localStorage.removeItem("selectedTime");
        window.localStorage.removeItem("selected");
        window.localStorage.setItem("customized", false);
        customized.value = false
        clearInterval(timer);
        title.value = "选择时间";
        return
    }
    clearInterval(timer);
    timer = setInterval(() => {
        selectedTime.value -= 1
        window.localStorage.setItem("selectedTime", selectedTime.value)
        m = Math.floor(selectedTime.value / 60);
        s = selectedTime.value % 60;
        if (selectedTime.value > 0 && selectedTime.value != null) {
            title.value = ((m < 10) ? ('0' + m) : m) + ':' + ((s < 10) ? ('0' + s) : s);
        } else {
            //定时完整结束走这里
            window.localStorage.removeItem("selectedTime");
            window.localStorage.removeItem("selected");
            window.localStorage.setItem("customized", false);
            customized.value = false
            clearInterval(timer);
            title.value = "选择时间";
            //关闭音乐
            pause();
            return;
        }
    }, 1000)
}

//关闭音乐
const pause = () => {
    console.log("音乐已关闭");
}

//退出组件
const exit = () => {
    let computedStyle = window.getComputedStyle(main.value);
    let currentBottom = parseFloat(computedStyle.getPropertyValue('bottom'));
    let height = parseFloat(computedStyle.getPropertyValue('height'));
    // 创建动画效果
    let animation = main.value.animate(
        [
            { bottom: currentBottom + 'px' },
            { bottom: -height + 'px' }
        ],
        {
            duration: 400, // 动画持续时间，单位毫秒
            easing: 'ease', // 缓动函数
            //fill: 'forwards' // 动画结束后保持最后一个状态
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
            //fill: 'forwards' // 动画结束后保持最后一个状态
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

//设置时间
const setTiming = (time) => {
    if (typeof time === 'number') {
        selectedTime.value = time * 60
        selected.value = time
        window.localStorage.setItem("selectedTime", time * 60);
        window.localStorage.setItem("selected", time);
        window.localStorage.setItem("customized", false);
        customized.value = false;
        titleComputed()
        return
    }
    // 获取容器滚动的距离
    const scrollTop = hour.value.scrollTop;
    const scrollTop1 = minute.value.scrollTop;
    // 计算当前被捕捉到的元素是第几个元素
    const currentIndex = Math.round(scrollTop / hour.value.querySelector('.snap-center').offsetHeight);
    const currentIndexMinute = Math.round(scrollTop1 / minute.value.querySelector('.snap-center').offsetHeight);
    // 获取当前被捕捉到的元素
    const currentElement = hour.value.querySelectorAll('.snap-center')[currentIndex];
    const currentElement1 = minute.value.querySelectorAll('.snap-center')[currentIndexMinute];
    //计算总时间分钟结尾
    time = (parseInt(currentElement.innerText) * 60) + parseInt(currentElement1.innerText)
    if (time == 0) {
        cancel()
        flag.value = false;
        return;
    }
    flag.value = false;
    selectedTime.value = time * 60;
    selected.value = 0;
    window.localStorage.setItem("selectedTime", time * 60);
    window.localStorage.removeItem("selected");
    window.localStorage.setItem("customized", true);
    customized.value = true;
    titleComputed()

}

//取消定时
const cancel = () => {
    window.localStorage.removeItem("selectedTime");
    window.localStorage.removeItem("selected");
    window.localStorage.setItem("customized", false);
    customized.value = false;
    selectedTime.value = 0;
    selected.value = 0;
    titleComputed()
}

//滚动回调添加震动
const handleScroll = (event) => {
    const container = event.target;
    const childHeight = container.querySelector('.snap-center').offsetHeight;
    const scrollPosition = container.scrollTop;
    const containerHeight = container.offsetHeight;
    //计算中心位置
    const centerIndex = Math.floor((scrollPosition + containerHeight / 2) / childHeight);

    //获取 "分钟" 文本元素的位置信息
    const minuteTextPosition = textHeight.value.offsetTop;
    const txtHeight = textHeight.value.offsetHeight;
    //计算 "分钟" 文本元素的中心位置
    const centerTextPosition = minuteTextPosition + txtHeight / 2;

    //判断中心位置是否满足条件
    const isCenter = (scrollPosition + containerHeight / 2 >= centerIndex * childHeight) && (scrollPosition + containerHeight / 2 <= (centerIndex + 1) * childHeight);
    const isTextCenter = (scrollPosition + containerHeight / 2 >= centerTextPosition - textHeight / 2) && (scrollPosition + containerHeight / 2 <= centerTextPosition + textHeight / 2);

    if ((isCenter || isTextCenter) && centerIndex !== lastVibrationPosition) {
        //更新上次震动位置
        lastVibrationPosition = centerIndex;
        navigator.vibrate([30]);
    }
}

onMounted(() => {

    //关闭网页回调，清除定时
    window.addEventListener('beforeunload', function (e) {
        window.localStorage.removeItem("selectedTime");
        window.localStorage.removeItem("selected");
        window.localStorage.setItem("customized", false);
        e.returnValue = '';
    });
    titleComputed()
});

onActivated(() => {
    //再次进入回调
    if (hour.value) {
        hour.value.addEventListener("scroll", handleScroll);
    }
    if (minute.value) {
        minute.value.addEventListener("scroll", handleScroll);
    }
    main.value.classList.add("animate-[timing_0.4s]")
    mask.value.classList.add("animate-[mask_0.4s]")
})
</script>

<template>
    <div ref="main"
        class="animate-[timing_0.4s] w-screen fixed z-50 bottom-0 bg-gray-100 rounded-t-2xl dark:bg-gray-900 p-2 dark:text-white">
        <h5 class="p-1 text-lg">
            {{ flag ? "自定义关闭" : "定时关闭" }}
        </h5>
        <div v-show="!flag" class="px-3 py-5 m-1 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h6 :class="title != '选择时间' ? 'text-indigo-600' : ''">{{ title }}</h6>
            <div class="py-3 flex justify-around">
                <div :class="[selected == time ? 'bg-indigo-600 text-white' : '']"
                    class="inline p-1 rounded-full shadow-md active:text-white active:bg-indigo-600"
                    v-for="time in times" :key="time" @click="setTiming(time)">
                    <p class="w-10 h-10 leading-10">{{ time }}</p>
                </div>
            </div>
            <div :class="customized ? 'text-indigo-600' : ''"
                class="py-2 my-3 shadow-md rounded-lg text-gray-400 active:text-white active:bg-indigo-600 dark:bg-gray-700"
                @click="flag = true">
                自定义
            </div>
            <div @click="cancel"
                class="py-2 my-3 shadow-md rounded-lg text-gray-400 active:text-white active:bg-indigo-600 dark:bg-gray-700">
                取消定时
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
                            <div class="text-sm text-gray-400" ref="textHeight">分钟</div>
                        </div>

                    </div>

                    <div class="flex">
                        <div class="py-2 mr-1 my-3 shadow-md rounded-lg text-gray-400 flex-1 active:text-white active:bg-indigo-600 dark:bg-gray-700"
                            @click="flag = false">
                            取消
                        </div>
                        <div @click="setTiming"
                            class="py-2 ml-1 my-3 shadow-md rounded-lg text-white bg-indigo-600 flex-1">
                            确定
                        </div>
                    </div>

                </div>
            </div>
            <div @click="exit" ref="mask"
                class="animate-[mask_0.4s] opacity-60 bg-slate-950 w-screen h-screen fixed top-0 z-10"></div>
</template>

<style scoped></style>