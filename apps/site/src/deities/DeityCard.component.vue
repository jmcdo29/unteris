<template>
  <BaseCard>
    <BaseGrid :rows="2" :columns="1">
      <BaseGrid>
        <UnterisImage class="profile pic" url="Picture" />
        <BaseGrid :rows="2" :columns="1" class="profile info">
          <h3>{{ deity.name }}</h3>
          <h5>{{ deity.title }}</h5>
        </BaseGrid>
      </BaseGrid>
      <BaseGrid class="body">
        <BaseGrid class="attributes" :columns="1">
          <BaseAttribute
            :attribute="{ name: 'Alignment', value: deity.alignment }"
          />
          <BaseAttribute :attribute="{ name: 'Symbol', value: deity.symbol }" />
          <BaseAttribute :attribute="{ name: 'Domain', value: deity.domain }" />
        </BaseGrid>
        <UnterisImage class="symbol" url="Symbol" />
      </BaseGrid>
    </BaseGrid>
  </BaseCard>
</template>

<script lang="ts">
import {
  BaseAttribute,
  UnterisImage,
  BaseGrid,
  BaseCard,
} from '@unteris/components';
import { Component, Prop, Vue } from 'vue-property-decorator';

import type { Deity } from './deity.interface';

@Component({
  name: 'DietyCard',
  components: {
    BaseAttribute,
    UnterisImage,
    BaseGrid,
    BaseCard,
  },
})
export default class DeityBaseCardComponent extends Vue {
  @Prop()
  deity: Deity;
}
</script>

<style scoped lang="scss">
.profile {
  &.pic {
    grid-column: 1 / 5;
    background: lightgreen;
  }
  &.info {
    grid-column: 5/ 13;
  }
}
.body {
  .symbol {
    grid-column: 9/ 13;
    background-color: lightblue;
  }
  .attributes {
    grid-column: 1/ 9;
  }
}

h3,
h5 {
  text-align: center;
}
</style>
