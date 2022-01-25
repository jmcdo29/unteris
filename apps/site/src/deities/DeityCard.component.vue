<template>
  <div class="deity">
    <div class="header">
      <UnterisImage class="profile pic" url="Picture" />
      <div class="profile info">
        <h3>{{ deity.name }}</h3>
        <h5>{{ deity.title }}</h5>
      </div>
    </div>
    <div class="body">
      <div class="attributes">
        <Attribute :attribute="{ name: 'Alignment', value: deity.alignment }" />
        <Attribute :attribute="{ name: 'Symbol', value: deity.symbol }" />
        <Attribute :attribute="{ name: 'Domain', value: deity.domain }" />
      </div>
      <UnterisImage class="symbol" url="Symbol" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Attribute from '../common/Attribute.component.vue';
import UnterisImage from '../common/UnterisImage.component.vue';
import type { Deity } from './deity.interface';

@Component({
  name: 'DietyCard',
  components: {
    Attribute,
    UnterisImage,
  },
})
export default class DeityCardComponent extends Vue {
  @Prop()
  deity: Deity;
}
</script>

<style scoped lang="scss">
.deity {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
.header {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
.profile {
  &.pic {
    grid-column: 1 / 3;
    background: lightgreen;
  }
  &.info {
    grid-column: 3/ 7;
    display: grid;
  }
}
.body {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  .symbol {
    grid-column: 5/ 7;
    background-color: lightblue;
  }
  .attributes {
    display: grid;
    grid-column: 1/ 5;
  }
}

h3,
h5 {
  text-align: center;
}
</style>
