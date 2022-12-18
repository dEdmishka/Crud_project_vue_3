<template>
  <div>
    <h1>Add professor</h1>
    <div class="form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="name">Name</label>
          <my-inputs
              id="name"
              v-model="professor.name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <my-inputs
              id="email"
              v-model="professor.email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <my-inputs
              id="password"
              v-model="professor.password"
          />
        </div>

        <router-link to="/professors">Back</router-link>

        <my-buttons
            @click="createProfessor"
            class="btn btn-submit"
        >
          Create
        </my-buttons>
      </div>

      <div v-else>
        <h4>You create professor successfully!</h4>
        <router-link to="/professors">Back</router-link>
        <my-buttons
            class="btn btn-submit"
            @click="newProfessor"
        >
          Add
        </my-buttons>
      </div>

    </div>
  </div>
</template>

<script>
import ProfessorDataService from "../ProfessorDataService";
import myInputs from "../../components/UI/MyInputs.vue";
import myButtons from "../../components/UI/MyButtons.vue";

export default {
  components: {
    myButtons,
    myInputs
  },
  data() {
    return {
      professor: {
        id: null,
        name: '',
        email: '',
        password: ''
      },
      submitted: false
    };
  },
  methods: {
    createProfessor() {
      let data = {
        name: this.professor.name,
        email: this.professor.email,
        password: this.professor.password,
      };

      ProfessorDataService.create(data)
          .then(res => {
            this.professor.id = res.data.id;
            console.log(res.data)
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },

    newProfessor() {
      this.submitted = false;
      this.professor = {};
    }
    //New and other methods
  }

};
</script>

<style scoped>
.form {
  font-size: 24px;
  font-weight: 600;
  max-width: 400px;
  margin: auto;
}
</style>