<template>
  <div class="deity">
    <Grid :rows="2" :columns="1">
      <Grid>
        <UnterisImage class="profile pic" url="Picture" />
        <Grid :rows="2" :columns="1" class="profile info">
          <h3>{{ deity.name }}</h3>
          <h5>{{ deity.title }}</h5>
        </Grid>
      </Grid>
      <Grid class="body">
        <Grid class="attributes" :columns="1" :rows="3">
          <Attribute
            :attribute="{ name: 'Alignment', value: deity.alignment }"
          />
          <Attribute :attribute="{ name: 'Symbol', value: deity.symbol }" />
          <Attribute :attribute="{ name: 'Domain', value: deity.domain }" />
        </Grid>
        <UnterisImage class="symbol" url="Symbol" />
      </Grid>
    </Grid>
  </div>
</template>

<script lang="ts">
import { Attribute, UnterisImage, Grid } from '@unteris/components';
import { Component, Prop, Vue } from 'vue-property-decorator';

import type { Deity } from './deity.interface';

@Component({
  name: 'DietyCard',
  components: {
    Attribute,
    UnterisImage,
    Grid,
  },
})
export default class DeityCardComponent extends Vue {
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
