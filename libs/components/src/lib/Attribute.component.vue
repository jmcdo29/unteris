<template>
  <div class="attr">
    <Grid :columns="2">
      <span class="name">{{ attribute.name }}:</span>
      <span class="value">{{
        Array.isArray(attribute.value)
          ? attribute.value.join(', ')
          : attribute.value
      }}</span>
    </Grid>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Grid from './Grid.component.vue';

interface AttributeProps {
  name: string;
  value: string | number | boolean | string[];
}

@Component({
  name: 'Attribute',
  components: { Grid },
})
export default class Attribute extends Vue {
  @Prop()
  attribute: AttributeProps;
}
</script>

<style scoped lang="scss">
.attr {
  margin-top: 0.2em;
  .name,
  .value {
    text-align: center;
  }
}
</style>
