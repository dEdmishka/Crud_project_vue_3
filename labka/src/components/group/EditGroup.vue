<template>
  <div>
    <div class="edit-form">
      <h1>Group</h1>
      <form action="" @submit.prevent>
        <div class="form-group">
          <label for="department_id">Department</label>
          <v-select
              label="department_name"
              :options="departments"
              v-model.trim="group.department_name"
              @:input="v$.group.department_name.$touch"
              class="v-select"
          >
          </v-select>
          <span v-if="v$.group.department_name.$error" class="error">
          {{ v$.group.department_name.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <my-inputs
              id="name"
              v-model.trim="group.group_name"
              @:input="v$.group.group_name.$touch"
          />
          <span v-if="v$.group.group_name.$error" class="error">
          {{ v$.group.group_name.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="course">Course</label>
          <my-inputs
              id="course"
              type="number"
              v-model.trim="group.course"
              @:input="v$.group.course.$touch"
          />
          <span v-if="v$.group.course.$error" class="error">
          {{ v$.group.course.$errors[0].$message }}
          </span>
        </div>

        <my-buttons
            @click="$router.push(`/group`)"
        >
          Back
        </my-buttons>
        <my-buttons
            type="submit"
            class="btn btn-submit"
            @click="updateGroup"
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
import DepartmentDataService from "../../services/DepartmentDataService";
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {helpers, integer, maxLength, maxValue, minLength, minValue, required} from "@vuelidate/validators";
import {namePattern} from "../../functions";

export default {
  components: {
    MyInputs,
    MyButtons,
    vSelect
  },
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      group: {
        department_id: '',
        department_name: '',
        group_name: '',
        course: '',
      },
      departments: [],
    };
  },
  validations() {
    return {
      group: {
        department_name: {
          required: helpers.withMessage('Department is required', required),
        },
        group_name: {
          required: helpers.withMessage('Name is required', required),
          minLength: minLength(2),
          maxLength: maxLength(64),
          namePattern: helpers.withMessage('Name is invalid', namePattern)

        },
        course: {
          required: helpers.withMessage('Course is required', required),
          minValue: helpers.withMessage('Course must be between 1 and 6', minValue(1)),
          maxValue: helpers.withMessage('Course must be between 1 and 6', maxValue(6)),
          integer: helpers.withMessage('Course is integer)', integer),
        },
      }
    }
  },
  methods: {
    getDepartment() {
      DepartmentDataService.getAll()
          .then(res => {
            this.departments = res.data;
            console.log(this.departments)
            console.log(res.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    getGroup(id) {
      GroupDataServices.get(id)
          .then(res => {
            this.group.department_id = res.data.group.department_id;
            this.group.department_name = res.data.group.department_name;
            this.group.group_name = res.data.group.group_name;
            this.group.course = res.data.group.course;
            console.log(res.data);
          });
    },
    updateGroup() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let d_id = (!this.group.department_name.department_id) ? this.group.department_id : this.group.department_name.department_id;
        // console.log(55)
        // console.log(d_id)
        // console.log(this.group.department_name.department_id)
        // console.log(this.group.department_id)

        let data = {
          department_id: d_id,
          name: this.group.group_name,
          course: this.group.course,
        };
        GroupDataServices.update(this.$route.params.id, data)
            .then(res => {
              alert("Group successfully edited!");
              console.log(res.data);
            })
            .catch(e => {
              console.log(e);
            });
        this.$router.push(`/group`);
      }
    },
  },
  mounted() {
    this.getGroup(this.$route.params.id);
    this.getDepartment();
  },
}
</script>

<style scoped>

</style>