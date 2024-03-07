<script setup>
import axios from '../axios/axios';
import { onMounted, ref } from 'vue'
import Message from '../assets/js/message'

const qr = ref(null)

const getQRCode = async()=>{
    const {data:key} = await axios.post('/login/qr/key')
    if(key.code!=200){
        Message({ message: key.msg })
        return
    }
    const {data:res} = await axios.post('/login/qr/create',{key:key.data.unikey})
    console.log(res);
}

onMounted(()=>{
    
})
</script>

<template>
    <div>
        <img :src="qr" alt="">
    </div>
</template>