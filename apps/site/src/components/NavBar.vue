<template>
  <div id="nav">
    <router-link v-for="link of links" :key="link.link" :to="link.link">{{
      link.text
    }}</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface NavBarLink {
  link: string;
  text: string;
}

interface NavBarData {
  links: NavBarLink[];
}

@Component({
  name: 'NavBar',
})
export default class NavBar extends Vue {
  @Prop()
  prop: string;
  data(): NavBarData {
    return {
      links: [
        {
          link: '/',
          text: 'Home',
        },
        { link: '/about', text: 'About' },
        { link: '/uma', text: 'UMA' },
        { link: '/maps', text: 'Maps' },
        { link: 'deities', text: 'Deities' },
      ],
    };
  }
}
</script>

<style scoped lang="scss">
#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0.5em;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
