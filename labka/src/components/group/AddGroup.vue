<template>
  <div>
    <h1>Add group</h1>
    <div class="form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="department_id">Department</label>
          <v-select
              label="department_name"
              :options="departments"
              v-model.trim="group.department_id"
              class="v-select"
          >
          </v-select>
          <span v-if="v$.group.department_id.$error" class="error">
          {{ v$.group.department_id.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <my-inputs
              id="name"
              v-model.trim="group.name"
              @:input="v$.group.name.$touch"
          />
          <span v-if="v$.group.name.$error" class="error">
          {{ v$.group.name.$errors[0].$message }}
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
            @click="createGroup"
            class="btn btn-submit"
        >
          Create
        </my-buttons>
      </div>

      <div v-else>
        <h4>You create group successfully!</h4>
        <my-buttons
            @click="$router.push(`/group`)"
        >
          Back
        </my-buttons>
        <my-buttons
            class="btn btn-submit"
            @click="newGroup"
        >
          Add
        </my-buttons>
      </div>

    </div>
  </div>
</template>

<script>
import myInputs from "../UI/MyInputs.vue";
import myButtons from "../UI/MyButtons.vue";
import GroupDataServices from "../../services/GroupDataServices";
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
import DepartmentDataService from "../../services/DepartmentDataService";
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {helpers, maxLength, maxValue, minLength, minValue, integer, required} from "@vuelidate/validators";
import {groupPattern} from "../../functions";

export default {
  components: {
    myButtons,
    myInputs,
    vSelect
  },
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      group: {
        id: null,
        department_id: '',
        name: '',
        course: '',
      },
      departments: [],
      submitted: false
    };
  },
  validations() {
    return {
      group: {
        department_id: {
          required: helpers.withMessage('Department is required', required),
        },
        name: {
          required: helpers.withMessage('Name is required', required),
          minLength: minLength(2),
          maxLength: maxLength(64),
          groupPattern: helpers.withMessage('Name is invalid', groupPattern)

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
            console.log(1)
            console.log(String(parseInt('3.9')))
            this.departments = res.data;
            // console.log(1);
            console.log(res.data);
            // console.log(2);
            console.log(this.departments)
          })
          .catch(e => {
            console.log(e);
          });
    },
    createGroup() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = {
          department_id: this.group.department_id.department_id,
          name: this.group.name,
          course: String(parseInt(this.group.course)),
        };
        GroupDataServices.create(data)
            .then(res => {
              this.group.id = res.data.id;
              console.log(res.data)
              this.submitted = true;
            })
            .catch(e => {
              console.log(e);
            });
      }
    },

    newGroup() {
      this.submitted = false;
      this.group = {};
    }
    //New and other methods
  },
  mounted() {
    this.getDepartment();
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