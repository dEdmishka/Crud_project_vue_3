<template>
  <div>
    <div class="edit-form">
      <h1>Faculty</h1>
      <form action="" @submit.prevent>
        <div class="form-group">
          <label for="name">Name</label>
          <my-inputs
              id="name"
              v-model.trim="faculty.name"
              @:input="v$.faculty.name.$touch"
          />
          <span v-if="v$.faculty.name.$error" class="error">
          {{ v$.faculty.name.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="short_name">Short name</label>
          <my-inputs
              id="short_name"
              v-model.trim="faculty.short_name"
              @:input="v$.faculty.short_name.$touch"
          />
          <span v-if="v$.faculty.short_name.$error" class="error">
          {{ v$.faculty.short_name.$errors[0].$message }}
          </span>
        </div>
        <my-buttons
            @click="$router.push(`/faculty`)"
        >
          Back
        </my-buttons>

        <my-buttons class="btn btn-submit"
                    @click="updateFaculty"
        >
          Update
        </my-buttons>


      </form>
    </div>

  </div>
</template>

<script>
import FacultyDataService from "../../services/FacultyDataService";
import MyButtons from "../UI/MyButtons.vue";
import MyInputs from "../UI/MyInputs.vue";
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {required, helpers, minLength, maxLength} from '@vuelidate/validators';
import {namePattern} from "../../functions";

export default {
  components: {
    MyInputs,
    MyButtons
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      faculty: {
        name: '',
        short_name: '',
      },
      changed: false,
    };
  },
  validations() {
    return {
      faculty: {
        name: {
          required: helpers.withMessage('Name is required', required),
          minLength: minLength(2),
          maxLength: maxLength(64),
          namePattern: helpers.withMessage('Name is invalid', namePattern)

        },
        short_name: {
          required: helpers.withMessage('Short name is required', required),
          minLength: minLength(2),
          maxLength: maxLength(6),
          namePattern: helpers.withMessage('Short name is invalid', namePattern)
        },
      }
    }
  },
  methods: {
    getFaculty(id) {
      // this.changed = true;
      // if(!this.faculty.name) {
      FacultyDataService.get(id)
          .then(res => {
            this.faculty.name = res.data.faculty.name;
            this.faculty.short_name = res.data.faculty.short_name;
            console.log(res.data);
            // this.changed = false;
          });
      // }
    },
    updateFaculty() {
      // this.changed = true;
      this.v$.$validate();
      if (!this.v$.$error) {
        FacultyDataService.update(this.$route.params.id, this.faculty)
            .then(res => {
              alert("Faculty successfully edited!");
              // this.submitted = true;
              console.log(res.data);
              // this.$router.push('/professors');
              // setTimeout(()=> router.push('/professors'), 2000);
            })
            .catch(e => {
              console.log(e);
            });
        this.$router.push(`/faculty`);
      } else {
        alert("Form failed validation!")
      }
    },
  },

  mounted() {
    this.getFaculty(this.$route.params.id);
  },
}
</script>

<style scoped>

</style>