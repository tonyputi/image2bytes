<template>
    <div class="rounded-lg border shadow-md p-2 flex-none">
        <canvas ref="canvas" :width="image.data.width" :height="image.data.width" />
    </div>
</template>

<script>
import { render } from '../utils';

export default {
    props: ['settings', 'image'],
    mounted() {
		render(this.image.data, this.$refs.canvas, this.settings);
    },
    watch: {
        settings() {
            render(this.image.data, this.$refs.canvas, this.settings);
        },
		image() {
            render(this.image.data, this.$refs.canvas, this.settings);
        }
    }
}
</script>