<template>
  <div class="deities">
    <Grid id="search-bar">
      <div class="search">Search:</div>
      <input
        @input="search"
        v-model="searchVal"
        placeholder="Search on partial name, domain, title, or symbol"
      />
    </Grid>
    <Grid columns="auto-fill" class="cards" columnSize="minMax(400px, 1fr)">
      <Card v-for="deity of deities" :key="deity.name">
        <DeityCard :deity="deity" />
      </Card>
    </Grid>
  </div>
</template>

<script lang="ts">
import { Card, Grid } from '@unteris/components';
import { Component, Vue } from 'vue-property-decorator';

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
    Grid,
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
          title: 'God of the Light',
          alignment: 'CN',
          domain: ['Light'],
          symbol: 'A White Sun and Black Moon',
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
      name.includes(searchVal) ||
      domain.some((dom) => dom.toLowerCase().includes(searchVal)) ||
      [title, symbol].some((val) => val.toLowerCase().includes(searchVal))
    );
  }
}
</script>

<style scoped lang="scss">
.cards {
  gap: 0.25em;
}
.search {
  grid-column: 9 / 10;
  text-align: right;
  padding-right: 1em;
}
input {
  grid-column: 10 / 12;
}
#search-bar {
  margin-bottom: 0.25em;
}
</style>
