<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/navBar'
export default {
  components: {
    NavBar
  },
  created() {
    // whenever refresh update the state.
    this.$store.dispatch('tokenModel/fetchTokens')
  }
}
</script>

<style lang="scss" scoped></style>
