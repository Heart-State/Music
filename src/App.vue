<script setup>
import { onMounted, ref } from 'vue'
import { usePlayStore } from './states/play';

const audio = ref()
const play = usePlayStore()



onMounted(() => {
  //订阅仓库变化
  play.$subscribe((mutation,state)=>{
    // console.log(state.isPaused);
    if(state.isPaused){
      audio.value.pause()
    }else{
      audio.value.play()
    }
  })
})
</script>

<template>
  <router-view></router-view>
  <audio ref="audio" :src="play.playLink" v-show="false"></audio>
</template>

<style scoped></style>
