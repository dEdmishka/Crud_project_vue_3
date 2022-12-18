<template>
  <div class="list">
    <h1>Professor List</h1>
    <div class="professors" v-if=" professors.length > 0">
      <professor-item
          v-for="professor in professors"
          :professor="professor"
          :key="professor.id_p"
          @remove="$emit('remove', professor)"
      />
    </div>
    <h2 v-else>
      Your table is empty!
    </h2>
  </div>

</template>

<script>
import professorItem from "./ProfessorItem.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {
    professorItem
  },
  props: {
    professors: {
      type: Array,
      required: true
    }
  },
});
</script>

<style scoped>
.list {
  font-size: 26px;
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>