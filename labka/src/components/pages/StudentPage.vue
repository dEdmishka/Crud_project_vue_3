<template>
  <div>
    <h1>Page with students</h1>
    <my-buttons @click="$router.push('/add_student')" style="padding: 10px;">Add Student</my-buttons>
    <my-table
        :heads="heads"
    >
      <my-table-row
          v-if="students.length > 0"
          v-for="student in students"
          :key="student.student_id"
      >

        <my-table-column>
          {{ student.group_name }}
        </my-table-column>
        <my-table-column>
          {{ student.group_course }}
        </my-table-column>
        <my-table-column>
          {{ student.student_name }}
        </my-table-column>
        <my-table-column>
          {{ student.email }}
        </my-table-column>
        <my-table-column>
          {{ student.phone }}
        </my-table-column>

        <my-table-column class="edit-delete-btns">
          <template #icon>
            <EditIcon
                @click="$router.push(`/student/${student.student_id}`)"
            />
            <DeleteIcon
                @click="deleteStudent(student)"
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
import DeleteIcon from "../icons/IconDelete.vue";
import EditIcon from "../icons/IconEdit.vue";
import StudentDataService from "../../services/StudentDataService";
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
    students: [],
    heads: [
      'group', 'course', 'name', 'email', 'phone', 'actions'
    ],
  }),
  methods: {
    getStudents() {
      StudentDataService.getAll()
          .then(res => {
            this.students = res.data;
            console.log(res.data);
            console.log(this.students)
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteStudent(student) {
      // console.log(1)
      // console.log(professor)
      // console.log(professor.id_p)
      StudentDataService.delete(student.student_id)
          .then(res => {
            alert('You have successfully deleted student: ' + student.student_name + ' !')
            console.log(res.data);
            this.getStudents();
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getStudents();
    start_toggle();
  }
};
</script>

<style scoped>
.edit-delete-btns{

  justify-content: space-between;
}
</style>