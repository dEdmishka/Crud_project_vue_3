<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {

}
</script>

<style scoped>
.btn{
  cursor: pointer;
  padding: 15px;
  margin: 10px 10px 0 10px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  background: none;
  color: green;
}
</style>