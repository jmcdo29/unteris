<template>
  <div class="attr">
    <span class="name">{{ attribute.name }}:</span>
    <span class="value">{{
      Array.isArray(attribute.value)
        ? attribute.value.join(', ')
        : attribute.value
    }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface AttributeProps {
  name: string;
  value: string | number | boolean | string[];
}

@Component({
  name: 'Attribute',
})
export default class Attribute extends Vue {
  @Prop()
  attribute: AttributeProps;
}
</script>

<style scoped lang="scss">
.attr {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 0.2em;
  span {
    text-align: center;
  }
}
</style>
