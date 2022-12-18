<template>
  <div>
    <div class="edit-form">
      <h1>Student</h1>
      <form action="" @submit.prevent>
        <div class="form-group">
          <label for="group_id">Group</label>
          <v-select
              label="group_name"
              :options="groups"
              v-model.trim="student.group_name"
              @:input="v$.student.group_name.$touch"
              class="v-select"
          >
          </v-select>
          <span v-if="v$.student.group_name.$error" class="error">
          {{ v$.student.group_name.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <my-inputs
              id="name"
              v-model.trim="student.student_name"
              @:input="v$.student.student_name.$touch"
          />
          <span v-if="v$.student.student_name.$error" class="error">
          {{ v$.student.student_name.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <my-inputs
              id="email"
              v-model.trim="student.email"
              @:input="v$.student.email.$touch"
          />
          <span v-if="v$.student.email.$error" class="error">
          {{ v$.student.email.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <my-inputs
              id="phone"
              v-model.trim="student.phone"
              @:input="v$.student.phone.$touch"
              v-mask="'38(0##)###-##-##'"
              placeholder="38(0__)___-__-__"
          />
          <span v-if="v$.student.phone.$error" class="error">
          {{ v$.student.phone.$errors[0].$message }}
          </span>
        </div>

        <my-buttons
            @click="$router.push(`/student`)"
        >
          Back
        </my-buttons>
        <my-buttons
            type="submit"
            class="btn btn-submit"
            @click="updateStudent"
        >
          Update
        </my-buttons>
      </form>
    </div>

  </div>
</template>

<script>
import MyButtons from "../UI/MyButtons.vue";
import MyInputs from "../UI/MyInputs.vue";
import GroupDataServices from "../../services/GroupDataServices";
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
import StudentDataService from "../../services/StudentDataService";
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {mask} from "vue-the-mask";
import {email, helpers, maxLength, minLength, required} from "@vuelidate/validators";
import {personNamePattern} from "../../functions";

export default {
  components: {
    MyInputs,
    MyButtons,
    vSelect
  },
  directives: {
    mask,
  },
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      student: {
        group_id: '',
        group_name: '',
        student_name: '',
        email: '',
        phone: '',
      },
      groups: [],
    };
  },
  validations() {
    return {
      student: {
        group_name: {
          required: helpers.withMessage('Group is required', required),
        },
        student_name: {
          required: helpers.withMessage('Name is required', required),
          minLength: minLength(2),
          maxLength: maxLength(22),
          personNamePattern: helpers.withMessage('Name is invalid', personNamePattern)
        },
        email: {
          required: helpers.withMessage('Email is required', required),
          email: helpers.withMessage('Email is invalid', email),
        },
        phone: {
          required: helpers.withMessage('Phone is required', required),
          minLength: minLength(16),
        },
      }
    }
  },
  methods: {
    getGroups() {
      GroupDataServices.getAll()
          .then(res => {
            console.log(0);
            this.groups = res.data;
            console.log(this.groups);
            console.log(1);
            console.log(res.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    getStudent(id) {
      StudentDataService.get(id)
          .then(res => {
            this.student.group_id = res.data.student.group_id;
            this.student.group_name = res.data.student.group_name;
            this.student.student_name = res.data.student.student_name;
            this.student.email = res.data.student.email;
            this.student.phone = res.data.student.phone;
            console.log(res.data);
          });
    },
    updateStudent() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let g_id = (!this.student.group_name.group_id) ? this.student.group_id : this.student.group_name.group_id;

        let data = {
          group_id: g_id,
          name: this.student.student_name,
          email: this.student.email,
          phone: this.student.phone,
        };
        StudentDataService.update(this.$route.params.id, data)
            .then(res => {
              alert("Student successfully edited!");
              console.log(res.data);
            })
            .catch(e => {
              console.log(e);
            });
        this.$router.push(`/student`);
      }
    },
  },
  mounted() {
    this.getGroups();
    this.getStudent(this.$route.params.id);
  },
}
</script>

<style scoped>

</style>