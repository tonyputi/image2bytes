<template>
  <div class="container mx-auto mb-4">
    <Header />
    <div class="flex gap-2">
      <div class="flex-none border p-2 w-96">
        <Settings v-bind="settings" @update:settings="updateSettings" @update:images="updateImages" />
      </div>
      <div class="flex-1">
        <ImagesPreview :images="images" @delete="deleteImage" class="mb-2" />
        <OutputPreview :images="images" :settings="settings" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Settings from './components/Settings.vue'
import ImagesPreview from './components/ImagesPreview.vue'
import OutputPreview from './components/OutputPreview.vue'

export default {
  name: 'App',
  components: {
    Header,
    Settings,
    ImagesPreview,
    OutputPreview
  },
  data: () => ({
    images: [],
    settings: {
      backgroundColor: 'white',
      invertColors: false,
      threshold: 128,
      scale: 'original',
      centerX: false,
      centerY: false,
      rotate: 0,
      flipX: false,
      flipY: false,
      conversionMethod: 'horizontal1bit',
      prefix: 'epd_bitmap_',
      screenWidth: 128,
			screenHeight: 64,
    }
  }),
  methods: {
    updateSettings(key, value) {
      this.settings = { ...this.settings, [key]: value };
    },
    updateImages(images) {
      images.forEach((image) => {
        const reader = new FileReader();

        reader.onload = (ev) => {
          const element = new Image();
          element.src = ev.target.result;

          this.images.push({
            name: image.name.split('.')[0],
            data: element
          });
        };
        reader.readAsDataURL(image);
      });
    },
    deleteImage(selectedImage) {
      this.images = this.images.filter(image => image.name !== selectedImage.name);
    }
  }
}
</script>