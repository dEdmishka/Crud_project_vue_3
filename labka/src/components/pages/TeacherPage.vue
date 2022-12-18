<template>
  <div>
    <h1>Page with teachers</h1>
    <my-buttons @click="$router.push('/add_teacher')" style="padding: 10px;">Add Teacher</my-buttons>
    <my-table
        :heads="heads"
    >
      <my-table-row
          v-if="teachers.length > 0"
          v-for="teacher in teachers"
          :key="teacher.teacher_id"
      >
        <my-table-column>
          {{ teacher.name }}
        </my-table-column>
        <my-table-column>
          {{ teacher.surname }}
        </my-table-column>
        <my-table-column>
          {{ teacher.email }}
        </my-table-column>
        <my-table-column>
          {{ teacher.phone }}
        </my-table-column>
        <my-table-column class="edit-delete-btns">
          <template #icon>
            <EditIcon
                @click="$router.push(`/teacher/${teacher.teacher_id}`)"
            />
            <DeleteIcon
                @click="deleteTeacher(teacher)"
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
import TeacherDataServices from "../../services/TeacherDataServices";
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
    MyTable,
  },
  data: () => ({
    teachers: [],
    heads: [
      'name', 'surname', 'email', 'phone', 'actions'
    ],
  }),
  methods: {
    getTeachers() {
      TeacherDataServices.getAll()
          .then(res => {
            this.teachers = res.data;
            console.log(res.data);
            console.log(this.teachers)
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteTeacher(teacher) {
      // console.log(1)
      // console.log(professor)
      // console.log(professor.id_p)
      TeacherDataServices.delete(teacher.teacher_id)
          .then(res => {
            alert('You have successfully deleted teacher: ' + teacher.name + ' !')
            console.log(res.data);
            this.getTeachers();
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getTeachers();
    start_toggle();
  }
};
</script>

<style scoped>
.edit-delete-btns{

  justify-content: space-between;
}
</style>