<template>
  <div>
    <router-view></router-view>
  </div>
</template>


<script>
import Home from './components/Home.vue';

export default {
  components: {
    Home,
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
}
</style>
