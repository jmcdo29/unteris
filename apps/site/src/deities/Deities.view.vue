<template>
  <div class="deities">
    <BaseGrid id="search-bar">
      <div class="search">Search:</div>
      <input
        @input="search"
        v-model="searchVal"
        placeholder="Search on partial name, domain, title, or symbol"
      />
    </BaseGrid>
    <BaseGrid columns="auto-fill" class="cards" columnSize="minMax(400px, 1fr)">
      <DeityCard v-for="deity of deities" :key="deity.name" :deity="deity" />
    </BaseGrid>
  </div>
</template>

<script lang="ts">
import { BaseGrid } from '@unteris/components';
import { Component, Vue } from 'vue-property-decorator';

import DeityCard from './DeityCard.component.vue';
import type { Deity as DeityInterface } from './deity.interface';

interface DeitiesData {
  deities: DeityInterface[];
  allDeities: DeityInterface[];
  searchVal: string;
}

@Component({
  name: 'DeitiesPage',
  components: {
    DeityCard,
    BaseGrid,
  },
})
export default class DeitiesPage extends Vue {
  deities: DeityInterface[];
  allDeities: DeityInterface[];
  searchVal: string;
  async created(): Promise<void> {
    if (!this.allDeities.length) {
      this.allDeities = await this.getDeities();
    }
    this.deities = this.allDeities;
  }

  async getDeities(): Promise<DeityInterface[]> {
    return new Promise<DeityInterface[]>((resolve) => {
      setTimeout(
        () =>
          resolve([
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
            {
              name: 'Kor Amare',
              title: 'God of Life',
              alignment: 'NG',
              domain: ['Peace', 'Life'],
              symbol: 'A white gem',
            },
            {
              name: 'Vita Et Mors',
              title: 'God of Life and Death',
              alignment: 'N',
              domain: ['Death', 'Life'],
              symbol: 'A black raven and a white raven chasing each other',
            },
            {
              name: 'Tutor',
              title: 'Guardian of the Dead',
              alignment: 'N',
              domain: ['Grave'],
              symbol: 'A shield with a feline skull in the middle',
            },
            {
              name: 'Bestia',
              title: 'Goddess of War',
              alignment: 'CN',
              domain: ['War'],
              symbol: 'Two scimitars hilt up and parallel to each other',
            },
            {
              name: 'Richterin',
              title: 'Goddess of Order',
              alignment: 'LN',
              domain: ['Order', 'Knowledge'],
              symbol: 'Staff that has a circle with four spoke on the end',
            },
            {
              name: 'Misch',
              title: 'God of Mischief',
              alignment: 'CG',
              domain: ['Trickery'],
              symbol: 'Weasel with wings',
            },
          ]),
        500
      );
    });
  }
  data(): DeitiesData {
    return {
      searchVal: '',
      deities: [],
      allDeities: [],
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
