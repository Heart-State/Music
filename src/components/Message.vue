<template>
  <div class="flex fixed items-center justify-center z-50 top-1/4 w-screen">
    <transition name="down">
      <div class="rounded-lg bg-gray-900 text-white px-3 py-2 backdrop-saturate-[180%] backdrop-blur opacity-90" v-if="isShow">
        <span>{{ message }}</span>
      </div>
    </transition>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'XtxMessage',
  props: {
    message: {
      type: String,
      default: ''
    },
  },
  setup() {
    const isShow = ref(false)
    onMounted(() => {
      isShow.value = true
    })
    return { isShow }
  }
}
</script>
<style scoped lang="less">
.down {
  &-enter {
    &-from {
      transform: translateY(-75px);
      opacity: 0;
    }

    &-active {
      transition: all 0.5s;
    }

    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
</style>
  