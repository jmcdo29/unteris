<template>
  <div class="unteris image">
    {{ url }}
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
}
</script>

<style scoped lang="scss">
.unteris {
  padding-top: 30%;
  text-align: center;
}
</style>
