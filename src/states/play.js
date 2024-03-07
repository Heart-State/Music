import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayStore = defineStore('play', () => {

  //暂停标识
  const isPaused = ref(true)
  const playLink = ref('')
  const id = ref(0)
  const cover = ref('')
  const title = ref('')
  const author = ref('')

  function playAndPause() {
    isPaused.value = !isPaused.value
  }

  return { isPaused, playLink, id, cover, title, author, playAndPause }
})