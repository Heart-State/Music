<script setup>
import { onMounted, ref } from 'vue'

const audio = ref()

onMounted(() => {
  // setTimeout(() => {
  //   audio.value.play()
  // }, 1000)
})
</script>

<template>
  <router-view></router-view>
  <!-- <audio ref="audio" src="../public/song/郭顶-水星记.mp3" v-show="false"></audio> -->
</template>

<style scoped></style>
