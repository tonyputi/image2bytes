<template>
    <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-64">
        <div class="flex justify-end px-2 pt-2">
            <button 
                @click="$emit('delete', image)"
                class="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-1.5" 
                type="button">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg>
            </button>
        </div>
        <div class="flex flex-col items-center pb-10">
            <img class="mb-3" :src="image.data.src" />
            <h3 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ image.name }}</h3>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ image.data.width }}x{{ image.data.height }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['image']
}
</script>