<template>
  <div class="unteris grid" :style="styleComponent">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface StyleComponent {
  gridTemplateColumns: string | undefined;
  gridTemplateRows?: string;
}

@Component({
  name: 'BaseGrid',
})
export default class BaseGridComponent extends Vue {
  @Prop({ default: 12, type: [Number, String] })
  readonly columns: number | string;

  @Prop({ type: Number })
  readonly rows: number;

  @Prop({ default: '1fr', type: String })
  readonly columnSize: string;

  @Prop({ default: '1fr', type: String })
  readonly rowSize: string;

  get styleComponent(): StyleComponent {
    const style: StyleComponent = {
      gridTemplateColumns: this.makeRepeat(this.columns, this.columnSize),
    };
    if (this.rows) {
      style.gridTemplateRows = this.makeRepeat(this.rows, this.rowSize);
    }
    return style;
  }

  private makeRepeat(num: number | string, size: string): string {
    return `repeat(${num}, ${size})`;
  }
}
</script>

<style scoped lang="scss">
.unteris.grid {
  display: grid;
}
</style>
