<template>
  <div>
    <h1>Page with faculties</h1>
    <my-buttons @click="$router.push('/add_faculty')" style="padding: 10px;">Add Faculty</my-buttons>
    <my-table
        :heads="heads"
    >
      <my-table-row
          v-if="faculties.length > 0"
          v-for="faculty in faculties"
          :key="faculty.faculty_id"
      >
        <my-table-column>
          {{ faculty.name }}
        </my-table-column>
        <my-table-column>
          {{ faculty.short_name }}
        </my-table-column>
        <my-table-column class="edit-delete-btns">
          <template #icon>
            <EditIcon
                @click="$router.push(`/faculty/${faculty.faculty_id}`);"
            />
            <DeleteIcon
                @click="deleteFaculty(faculty)"
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
import FacultyDataService from "../../services/FacultyDataService";
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
    faculties: [],
    heads: [
      'name', 'short_name', 'actions'
    ],
  }),
  methods: {
    getFaculties() {
      FacultyDataService.getAll()
          .then(res => {
            this.faculties = res.data;
            console.log(res.data);
            console.log(1);
            console.log(this.faculties)
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteFaculty(faculty) {
      // console.log(1)
      // console.log(professor)
      // console.log(professor.id_p)
      FacultyDataService.delete(faculty.faculty_id)
          .then(res => {
            alert('You have successfully deleted faculty: ' + faculty.name + ' !')
            console.log(res.data);
            this.getFaculties();
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getFaculties();
    start_toggle();
  }
};
</script>

<style scoped>
.edit-delete-btns{

  justify-content: space-between;
}
</style>