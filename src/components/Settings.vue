<template>
    <section>
        <div class="mb-2">
            <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 text-base leading-normal">Select a file</span>
                <input type="file" multiple accept="image/*" @change="updateImages" class="hidden" />
            </label>
        </div>
            
        <div class="mb-2">
            <label for="background-color" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Background Color</label>
            <select id="background-color" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :value="backgroundColor" @change="updateSettings('backgroundColor', $event.target.value)">
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="transparent">Transparent</option>
            </select>
        </div>

        <div class="mb-2">
            <label for="invert-colors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Invert Colors</label>
            <select id="invert-colors" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :value="invertColors" @change="updateSettings('invertColors', $event.target.value == 'true' ? true : false)">
                <option :value="false">No</option>
                <option :value="true">Yes</option>
            </select>
        </div>

        <div class="mb-2">
            <label for="threshold" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Brightness / alpha threshold</label>
            <input id="threshold" type="number" min="0" max="255" step="1" placeholder="0 - 255"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :value="threshold"
                @input="updateSettings('threshold', $event.target.value)" >
        </div>

        <div class="mb-2">
            <label for="scale" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Scaling</label>
            <select id="scale" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :value="scale" @change="updateSettings('scale', $event.target.value)">
                <option value="original">original size</option>
                <option value="scaleToFit">scale to fit, keeping proportions</option>
                <option value="stretchToFit">stretch to fill canvas</option>
                <option value="stretchToFitX">stretch to fill canvas horizontally</option>
                <option value="stretchToFitY">stretch to fill canvas vertically</option>
            </select>
        </div>

        <div class="mb-2">
            <label for="center-x" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Center horizontally</label>
            <select id="center-x" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :value="centerX" @change="updateSettings('centerX', $event.target.value == 'true' ? true : false)">
                <option :value="false">No</option>
                <option :value="true">Yes</option>
            </select>
        </div>

        <div class="mb-2">
            <label for="center-y" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Center vertically</label>
            <select id="center-y" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :value="centerY" @change="updateSettings('centerY', $event.target.value == 'true' ? true : false)">
                <option :value="false">No</option>
                <option :value="true">Yes</option>
            </select>
        </div>

        <div class="mb-2">
            <label for="rotate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Rotate</label>
            <select id="rotate" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :value="rotate" @change="updateSettings('rotate', $event.target.value)">
                <option :value="0">0</option>
                <option :value="180">180</option>
            </select>
        </div>

        <div class="mb-2">
            <label for="flip-x" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Flip horizontally</label>
            <select id="flip-x" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :value="flipX" @change="updateSettings('flipX', $event.target.value == 'true' ? true : false)">
                <option :value="false">No</option>
                <option :value="true">Yes</option>
            </select>
        </div>

        <div class="mb-2">
            <label for="flip-y" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Flip vertically</label>
            <select id="flip-y" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :value="flipY" @change="updateSettings('flipY', $event.target.value == 'true' ? true : false)">
                <option :value="false">No</option>
                <option :value="true">Yes</option>
            </select>
        </div>

        <div class="mb-2">
            <label for="prfix" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prefix</label>
            <input id="prefix" type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :value="prefix"
                @input="updateSettings('prefix', $event.target.value)" >
        </div>
        
    </section>
</template>

<script>

export default {
    name: 'Settings',
    props: ['images', 'backgroundColor', 'invertColors', 'threshold', 'scale', 'centerX', 'centerY', 'rotate', 'flipX', 'flipY', 'prefix'],
    emits: ['update:settings', 'update:images'],
    methods: {
        updateSettings(key, value) {
            this.$emit('update:settings', key, value);
        },

        updateImages(ev) {
            this.$emit('update:images', Array.from(ev.target.files));
        }
    }
}
</script>
