<template>
    <section class="border p-2">
        <h1>Output Preview</h1>
        <div class="flex flex-wrap gap-4 my-4 justify-center">
            <Preview v-for="(image, index) in images" :key="index" :image="image" :settings="settings" />
        </div>
    </section>
</template>

<script>

import Preview from './Preview.vue'

export default {
    name: 'OutputPreview',
    components: {
        Preview
    },
    props: ['settings', 'images']
}
</script>