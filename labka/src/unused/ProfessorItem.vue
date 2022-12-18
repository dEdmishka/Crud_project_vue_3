<template>
  <div>
    <div class="">
      <div class="">Name: {{ professor.p_name }}</div>
      <div class="">Email: {{ professor.p_email }}</div>
      <div class="">Password: {{ professor.p_password }}</div>
    </div>
    <div class="">
      <my-buttons
          @click="$router.push(`/professors/${professor.id_p}`)"
      >
        Edit
      </my-buttons>
      <my-buttons
          @click="$emit('remove', professor)"
      >
        Delete
      </my-buttons>
    </div>
  </div>
</template>

<script>
import myButtons from "../components/UI/MyButtons.vue";

export default {
  components: {
    myButtons
  },
  props: {
    professor: {
      type: Object,
      required: true,
    }
  },
};
</script>

<style scoped>

</style>