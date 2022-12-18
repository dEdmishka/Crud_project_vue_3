<template>
  <div>
    <h1>Page with professors</h1>
    <my-buttons @click="$router.push('/add_professor')" style="padding: 10px;">Add Professor</my-buttons>
    <my-table
        :heads="heads"
    >
        <my-table-row
            v-if="professors.length > 0"
            v-for="professor in professors"
            :key="professor.id"
        >
          <my-table-column>
            {{ professor.p_name }}
          </my-table-column>
          <my-table-column>
            {{ professor.p_email }}
          </my-table-column>
          <my-table-column>
            {{ professor.p_password }}
          </my-table-column>
          <my-table-column>
            <my-buttons
                @click="$router.push(`/professors/${professor.id_p}`)"
            >
              Edit
            </my-buttons>
            <my-buttons
                @click="deleteProfessor(professor)"
            >
              Delete
            </my-buttons>
          </my-table-column>
        </my-table-row>
    </my-table>
  </div>
</template>

<script>
import AddProfessor from "./professor/AddProfessor.vue";
import ProfessorDataService from "./ProfessorDataService";
import MyTable from "../components/UI/MyTable.vue";
import MyTableRow from "../components/UI/MyTableRow.vue";
import MyTableColumn from "../components/UI/MyTableColumn.vue";
import MyButtons from "../components/UI/MyButtons.vue";

export default {
  components: {
    MyButtons,
    MyTableColumn,
    MyTableRow,
    MyTable,
    AddProfessor
  },
  data: () => ({
    professors: [],
    heads: [
      'name', 'email', 'password', 'actions'
    ],
    // subjects: [
    //   {
    //     id: 1,
    //     name: "Name1",
    //     email: "Email1",
    //     password: "Password1",
    //   },
    //   {
    //     id: 2,
    //     name: "Name2",
    //     email: "Email2",
    //     password: "Password2",
    //   },
    // ],
  }),
  computed: {},
  methods: {
    getProfessors() {
      ProfessorDataService.getAll()
          .then(res => {
            this.professors = res.data;
            console.log(res.data);
            console.log(this.professors)
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteProfessor(professor) {
      // console.log(1)
      // console.log(professor)
      // console.log(professor.id_p)
      ProfessorDataService.delete(professor.id_p)
          .then(res => {
            alert('You have successfully deleted professor: ' + professor.p_name + ' !')
            console.log(res.data);
            this.getProfessors();
            // this.$router.push({ name: "professors" });
          })
          .catch(e => {
            // console.log(this.professors)
            // console.log(this.professor)
            // console.log(professor)
            console.log(e);
          });
    },
  },
  mounted() {
    this.getProfessors();
  }
};
</script>

<style scoped>

</style>