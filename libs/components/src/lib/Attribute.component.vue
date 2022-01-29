<template>
  <div class="attr">
    <BaseGrid :columns="2">
      <span class="name">{{ attribute.name }}:</span>
      <span class="value">{{
        Array.isArray(attribute.value)
          ? attribute.value.join(', ')
          : attribute.value
      }}</span>
    </BaseGrid>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import BaseGrid from './Grid.component.vue';

interface AttributeProps {
  name: string;
  value: string | number | boolean | string[];
}

@Component({
  name: 'BaseAttribute',
  components: { BaseGrid },
})
export default class BaseAttribute extends Vue {
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
