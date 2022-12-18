<template>
  <div>
    <h1>Main page!</h1>
  </div>
</template>

<script>
import {start_toggle} from "../functions/function_toggle";

export default {
  name: 'main-page',
  mounted() {
    start_toggle();
  }
}
</script>

<style scoped>

</style>