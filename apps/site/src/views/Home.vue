<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Unteris" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import HelloPage from '../components/HelloWorld.vue';

@Component({
  name: 'Home',
  components: {
    HelloWorld: HelloPage,
  },
})
export default class HomePage extends Vue {}
</script>
