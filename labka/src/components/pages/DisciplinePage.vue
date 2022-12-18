<template>
  <div>
    <h1>Page with disciplines</h1>
    <my-buttons @click="$router.push('/add_discipline')" style="padding: 10px;">Add Discipline</my-buttons>
    <my-table
        :heads="heads"
    >
      <my-table-row
          v-if="disciplines.length > 0"
          v-for="discipline in disciplines"
          :key="discipline.discipline_id"
      >
        <my-table-column>
          {{ discipline.name }}
        </my-table-column>
        <my-table-column class="edit-delete-btns">
          <template #icon>
            <EditIcon
                @click="$router.push(`/discipline/${discipline.discipline_id}`)"
            />
            <DeleteIcon
                @click="deleteDiscipline(discipline)"
            />
          </template>
        </my-table-column>
      </my-table-row>
    </my-table>
  </div>
</template>

<script>
import MyTable from "../UI/MyTable.vue";
import MyTableRow from "../UI/MyTableRow.vue";
import MyTableColumn from "../UI/MyTableColumn.vue";
import MyButtons from "../UI/MyButtons.vue";
import DisciplineDataService from "../../services/DisciplineDataService";
import DeleteIcon from "../icons/IconDelete.vue";
import EditIcon from "../icons/IconEdit.vue";
import {start_toggle} from "../../functions/function_toggle";

export default {
  components: {
    DeleteIcon,
    EditIcon,
    MyButtons,
    MyTableColumn,
    MyTableRow,
    MyTable
  },
  data: () => ({
    disciplines: [],
    heads: [
      'name', 'actions'
    ],
  }),
  methods: {
    getDisciplines() {
      DisciplineDataService.getAll()
          .then(res => {
            this.disciplines = res.data;
            console.log(res.data);
            console.log(this.disciplines)
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteDiscipline(discipline) {
      // console.log(1)
      // console.log(professor)
      // console.log(professor.id_p)
      DisciplineDataService.delete(discipline.discipline_id)
          .then(res => {
            alert('You have successfully deleted discipline: ' + discipline.name + ' !')
            console.log(res.data);
            this.getDisciplines();
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getDisciplines();
    start_toggle();
  }
};
</script>

<style scoped>
.edit-delete-btns {
  /*display: flex;*/
  /*justify-content: center;*/
}
</style>