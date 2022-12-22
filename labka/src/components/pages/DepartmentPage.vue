<template>
  <div>
    <h1>Page with departments</h1>
    <my-buttons @click="$router.push('/add_department')" style="padding: 10px;">Add Department</my-buttons>
    <my-table
        :heads="heads"
    >
      <my-table-row
          v-if="departments.length > 0"
          v-for="department in departments"
          :key="department.department_id"
      >
        <my-table-column>
          {{ department.faculty_name }}
        </my-table-column>
        <my-table-column>
          {{ department.department_name }}
        </my-table-column>
        <my-table-column>
          {{ department.short_name }}
        </my-table-column>
        <my-table-column class="edit-delete-btns">
          <template #icon>
            <EditIcon
                @click="$router.push(`/department/${department.department_id}`)"
            />
            <DeleteIcon
                @click="deleteDepartment(department)"
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
import DepartmentDataService from "../../services/DepartmentDataService";
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
    departments: [],
    heads: [
      'faculty_short_name', 'name', 'short_name', 'actions'
    ],
  }),
  methods: {
    getDepartment() {
      DepartmentDataService.getAll()
          .then(res => {
            this.departments = res.data;
            console.log(1);
            console.log(res.data);
            console.log(2);
            console.log(this.departments)
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteDepartment(department) {
      // console.log(1)
      // console.log(professor)
      // console.log(professor.id_p)
      DepartmentDataService.delete(department.department_id)
          .then(res => {
            alert('You have successfully deleted department: ' + department.department_name + ' !')
            console.log(res.data);
            this.getDepartment();
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getDepartment();
    start_toggle();
  }
};
</script>

<style scoped>
.edit-delete-btns{

  justify-content: space-between;
}
</style>