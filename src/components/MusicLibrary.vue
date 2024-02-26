<script setup>

</script>

<template>
    <div class="p-1.5">
        <div class="flex items-center">
            <div>
                <img class="w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=666&q=80"
                    alt="">
            </div>
            <div class="pl-2">
                <h1 class="text-lg font-bold">Heart的音乐库</h1>
            </div>
        </div>
        <div class="p-2 mt-3 bg-[rgb(75,81,157)] dark:bg-gray-800 rounded-lg relative">
            <img src="../../public//img//sumireko-1.0.0.png" alt="sumireko" class="w-[50%] absolute top-[-75px] right-0 block">
            <div class="text-xs text-white">
                <p class="text-sm">
                    <span class="bg-gradient-to-r from-sky-500 to-indigo-500 bg-[length:0_1px] bg-no-repeat bg-left-bottom transition-all duration-1000 hover:bg-[length:100%_1px]">我期待的不是雪</span>
                </p>
                <p>而是有你的冬天</p>
                <p>而是有你的冬天</p>
            </div>
            <div class="pt-8 text-white flex items-center">
                <div class="flex-grow">
                    <h2 class="font-bold">我喜欢的音乐</h2>
                    <p class="text-xs">49首歌</p>
                </div>
                <div>
                    <div class="border border-white rounded-full h-6 w-6 flex justify-center items-center">
                        <svg v-if="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 drop-shadow-md">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>