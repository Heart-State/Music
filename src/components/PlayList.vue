<script setup>

</script>

<template>
    <div class="dark:text-white flex flex-col bg-slate-400 min-h-screen">
        <div class="header py-2 px-1 flex justify-between sticky top-0 z-10">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-10 h-10 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800" @click="$router.back(-1)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <h6 class="pl-1">歌单</h6>
            </div>
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-10 h-10 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-10 h-10 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
            </div>
        </div>
        <div class="py-10">
            <div class="text-center">
                <img class="w-28 h-28 object-cover rounded-lg m-auto bg-blue-300" src="../../public/img/aq-1.0.0.png" alt="cover">
                <h6>koto</h6>
                <p class="text-sm text-gray-500">Redamancy</p>
            </div>
        </div>
        <div class="flex-auto rounded-t-2xl bg-white opacity-9 dark:opacity-50 px-3 py-2">
            <div>
                455
            </div>
        </div>
    </div>
</template>