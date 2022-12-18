<template>
  <div>
    <div class="edit-form">
    <h1>Professor</h1>
      <form action="">
        <div class="form-group">
          <label for="name">Name</label>
          <my-inputs
              id="name"
              v-model="currentProfessor.name"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <my-inputs
              id="email"
              v-model="currentProfessor.email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <my-inputs
              id="password"
              v-model="currentProfessor.password"
          />
        </div>
        <router-link to="/professors">Back</router-link>

        <my-buttons type="submit" class="btn btn-submit"
          @click="updateProfessor"
        >
          Update
        </my-buttons>
      </form>
    </div>

  </div>
</template>

<script>
import ProfessorDataService from "../ProfessorDataService";
import MyButtons from "../../components/UI/MyButtons.vue";
import MyInputs from "../../components/UI/MyInputs.vue";

export default {
  components: {
    MyInputs,
    MyButtons
  },
  data() {
    return {
      currentProfessor: {
        name: '',
        email: '',
        password: ''
      },
    };
  },
  methods: {
    getProfessor(id) {
      ProfessorDataService.get(id)
          .then(res => {
            this.currentProfessor.name = res.data.professor.p_name;
            this.currentProfessor.email = res.data.professor.p_email;
            this.currentProfessor.password = res.data.professor.p_password;
            console.log(res.data);
          });
    },
    updateProfessor() {
      ProfessorDataService.update(this.$route.params.id, this.currentProfessor)
          .then(res => {
            alert("Professor successfully edited!");
            // this.submitted = true;
            console.log(res.data);
            // this.$router.push('/professors');
            // setTimeout(()=> router.push('/professors'), 2000);
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getProfessor(this.$route.params.id);
  },
}
</script>

<style scoped>

</style>