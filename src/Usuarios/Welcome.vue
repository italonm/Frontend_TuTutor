<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
  </v-carousel>
</template>

<script>
import image1 from "../imagenes/img1.jpg";
import image2 from "../imagenes/img2.jpg";
import image3 from "../imagenes/img3.jpg";
import image4 from "../imagenes/img4.jpg";
export default {
  data() {
    return {
      items: [
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 }
      ]
    };
  }
};
</script>

<style>
</style>>