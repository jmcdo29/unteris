<template>
  <div class="deities">
    Search:
    <input
      @input="search"
      v-model="searchVal"
      placeholder="Search on partial name, domain, title, or symbol"
    />
    <div class="cards">
      <Card v-for="deity of deities" :key="deity.name">
        <DeityCard :deity="deity" />
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Card from '../common/Card.component.vue';
import DeityCard from './DeityCard.component.vue';
import type { Deity as DeityInterface } from './deity.interface';

interface DeitiesData {
  deities: DeityInterface[];
  allDeities: DeityInterface[];
  searchVal: string;
}

@Component({
  name: 'Deities',
  components: {
    DeityCard,
    Card,
  },
})
export default class DeitiesPage extends Vue {
  deities: DeityInterface[];
  allDeities: DeityInterface[];
  searchVal: string;
  created(): void {
    this.deities = this.allDeities;
  }
  data(): DeitiesData {
    return {
      searchVal: '',
      deities: [],
      allDeities: [
        {
          name: 'Isa',
          title: 'God of the Wilds',
          alignment: 'CG',
          domain: ['Arcana', 'Nature'],
          symbol: 'Fanged jawbones',
        },
        {
          name: 'Chryko',
          title: 'Goddess of Winter',
          alignment: 'N',
          domain: ['Nature', 'Tempest'],
          symbol: 'Eight pointed Snowflake',
        },
        {
          name: 'Kunz',
          title: 'God of Weather',
          alignment: 'CN',
          domain: ['Tempest'],
          symbol: 'Nautilus shell',
        },
        {
          name: 'Viridi',
          title: 'Goddess of the Harvest',
          alignment: 'NG',
          domain: ['Life', 'Nature'],
          symbol: 'Two sickles crossed',
        },
        {
          name: 'Scien',
          title: 'God of Script',
          alignment: 'N',
          domain: ['Knowledge'],
          symbol: 'An open book',
        },
        {
          name: 'Lux',
          title: 'God of hte Light',
          alignment: 'CN',
          domain: ['Light'],
          symbol: 'A Black Sun and White Moon',
        },
        {
          name: 'Umbra',
          title: 'God of the Darkness',
          alignment: 'N',
          domain: ['Twilight'],
          symbol: 'A White Moon and Black Sun',
        },
        {
          name: 'Rz',
          title: 'Goddess of Creation',
          alignment: 'NG',
          domain: ['Forge'],
          symbol: 'Three Arrows overlapping',
        },
      ],
    };
  }

  search(): void {
    const searchVal = this.searchVal.toLowerCase();
    this.deities = this.allDeities.filter((deity) =>
      this.deityContainsSearchVal(deity, searchVal)
    );
  }

  private deityContainsSearchVal(
    deity: DeityInterface,
    searchVal: string
  ): boolean {
    const name = deity.name.toLowerCase();
    const { domain, title, symbol } = deity;
    return (
      name.includes(this.searchVal) ||
      domain.some((dom) => dom.toLowerCase().includes(searchVal)) ||
      [title, symbol].some((val) => val.toLowerCase().includes(searchVal))
    );
  }
}
</script>

<style scoped lang="scss">
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 0.25em;
}
</style>
