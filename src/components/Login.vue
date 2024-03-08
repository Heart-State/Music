<script setup>
import axios from '../axios/axios';
import { onMounted, onUnmounted, ref } from 'vue'
import Message from '../assets/js/message'
import { useRouter } from 'vue-router';

const qr = ref(null)
const flag = ref(false)
const info = ref('')
const router = useRouter()
let timer

const getQRCode = async () => {
    flag.value = false
    qr.value = ''
    const { data: key } = await axios.post('/login/qr/key?timestamp=' + Date.now())
    if (key.code != 200) {
        Message({ message: key.msg })
        return
    }
    const { data: res } = await axios.post('/login/qr/create', { qrimg: true, key: key.data.unikey, timestamp: Date.now() })
    if (res.code != 200) {
        Message({ message: key.msg })
        return
    }
    qr.value = res.data.qrimg
    clearInterval(timer)
    timer = setInterval(async () => {
        const statusRes = await checkStatus(key.data.unikey)
        if (statusRes.code === 800) {
            //二维码过期
            info.value = "二维码已失效"
            flag.value = true
            clearInterval(timer)
        }
        if (statusRes.code === 801) {
            //待确认
            info.value = ""
            flag.value = false
        }
        if (statusRes.code === 802) {
            //待确认
            info.value = "待确认"
            flag.value = true
        }
        if (statusRes.code === 803) {
            // 这一步会返回cookie
            clearInterval(timer)
            // alert('授权登录成功')
            Message({ message: '授权登录成功' })
            localStorage.setItem('cookie', statusRes.cookie)
            setTimeout(() => {
                router.back(-1)
            }, 500)
        }
    }, 3000)
}

//检查二维码状态
const checkStatus = async (key) => {
    const res = await axios({
        url: `/login/qr/check?key=${key}&timestamp=${Date.now()}&noCookie=true`,
    })
    return res.data
}

onMounted(() => {
    getQRCode()
})

onUnmounted(() => {
    clearInterval(timer)
})
</script>

<template>
    <div class="bg-gradient-to-b from-blue-100 to-white w-screen h-screen text-center flex justify-center items-center">
        <div class="absolute top-0 left-0 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-10 h-10 p-1 rounded-full active:bg-blue-200 dark:active:bg-gray-800"
                @click="$router.back()">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </div>
        <div class="bg-white flex flex-col items-center p-2 rounded-lg shadow-md">
            <div>
                扫码登录
            </div>
            <div class="relative">
                <img :src="qr" alt="二维码" v-if="qr != ''" :class="flag ? 'brightness-50' : ''" class="w-44 h-44">
                <div v-else class="w-44 h-44 flex justify-center items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-16 w-16 text-blue-300" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </div>
                <div @click="getQRCode" v-if="flag"
                    class="absolute top-0 w-full h-full flex flex-col justify-center items-center text-gray-50">
                    <p>{{ info }}</p>
                    <p>点击刷新</p>
                </div>
            </div>
            <div>
                请使用网易云客户端扫码登录
            </div>
        </div>
    </div>
</template>