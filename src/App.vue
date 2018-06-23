<template>
  <div id="app">
    <Header/>
    <Bookshelve/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Bookshelve from "./components/Bookshelve.vue";

export default {
    name: "App",
    
    components: {
        Bookshelve,
        Header
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
