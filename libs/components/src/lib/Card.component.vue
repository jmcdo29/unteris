<template>
  <div class="card">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Grid from './Grid.component.vue';

@Component({
  name: 'Card',
  components: {
    Grid,
  },
})
export default class CardComponent extends Vue {}
</script>

<style scoped lang="scss">
.card {
  padding: 1em;
  border: 2px solid black;
  border-radius: 10px;
  background-color: #eee;
}
</style>
