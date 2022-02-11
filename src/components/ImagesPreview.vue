<template>
    <section class="border p-2">
        <h1>Images Preview</h1>
        <div class="flex flex-wrap gap-4 my-4 justify-center">
            <Thumbnail v-for="(image, index) in images" :key="index" :image="image" @delete="$emit('delete', $event)" />
        </div>
    </section>
</template>

<script>

import Thumbnail from './Thumbnail.vue'

export default {
    name: 'ImagesUpload',
    components: {
        Thumbnail
    },
    props: {
        images: {
            type: Array,
        }
    }
}
</script>