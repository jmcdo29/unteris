<template>
  <div class="unteris image">
    <img :src="url" :alt="alt" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'UnterisImage',
})
export default class UnterisImage extends Vue {
  @Prop()
  url: string;

  @Prop()
  alt: string;
}
</script>

<style scoped lang="scss">
.unteris {
  text-align: center;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
