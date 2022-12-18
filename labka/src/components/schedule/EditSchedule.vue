<template>
  <div>
    <div class="edit-form">
      <h1>Schedule</h1>
      <form action="">
        <div class="form-group">
          <label for="group_id">Group</label>
          <v-select
              label="group_name"
              :options="groups"
              v-model.trim="schedule.group_name"
              class="v-select"
          >
          </v-select>
          <span v-if="v$.schedule.group_name.$error" class="error">
          {{ v$.schedule.group_name.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="teacher_id">Teacher</label>
          <v-select
              label="name"
              :options="teachers"
              v-model.trim="schedule.teacher_name"
              @:input="v$.schedule.teacher_name.$touch"
              class="v-select"
          >
          </v-select>
          <span v-if="v$.schedule.teacher_name.$error" class="error">
          {{ v$.schedule.teacher_name.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="discipline_id">Disciplines</label>
          <v-select
              label="name"
              :options="disciplines"
              v-model.trim="schedule.discipline_name"
              @:input="v$.schedule.discipline_name.$touch"
              class="v-select"
          >
          </v-select>
          <span v-if="v$.schedule.discipline_name.$error" class="error">
          {{ v$.schedule.discipline_name.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <my-inputs
              id="name"
              v-model.trim="schedule.schedule_name"
              @:input="v$.schedule.schedule_name.$touch"
          />
          <span v-if="v$.schedule.schedule_name.$error" class="error">
          {{ v$.schedule.schedule_name.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="time">Time</label>
          <my-inputs
              id="time"
              v-model.trim="schedule.time"
              @:input="v$.schedule.time.$touch"
          />
          <span v-if="v$.schedule.time.$error" class="error">
          {{ v$.schedule.time.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="classroom">Classroom</label>
          <my-inputs
              id="classroom"
              v-model.trim="schedule.classroom"
              @:input="v$.schedule.classroom.$touch"
          />
          <span v-if="v$.schedule.classroom.$error" class="error">
          {{ v$.schedule.classroom.$errors[0].$message }}
          </span>
        </div>

        <my-buttons
            @click="$router.push(`/schedule`)"
        >
          Back
        </my-buttons>
        <my-buttons
            type="submit"
            class="btn btn-submit"
            @click="updateSchedule"
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
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
import GroupDataServices from "../../services/GroupDataServices";
import TeacherDataServices from "../../services/TeacherDataServices";
import DisciplineDataService from "../../services/DisciplineDataService";
import ScheduleDataService from "../../services/ScheduleDataService";
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {helpers, integer, maxLength, minLength, minValue, required} from "@vuelidate/validators";
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
      schedule: {
        group_id: '',
        group_name: '',
        teacher_id: '',
        teacher_name: '',
        discipline_id: '',
        discipline_name: '',
        schedule_name: '',
        time: '',
        classroom: '',
      },
      groups: [],
      teachers: [],
      disciplines: [],
    };
  },
  validations() {
    return {
      schedule: {
        group_name: {
          required: helpers.withMessage('Group is required', required),
        },
        teacher_name: {
          required: helpers.withMessage('Teacher is required', required),
        },
        discipline_name: {
          required: helpers.withMessage('Discipline is required', required),
        },
        schedule_name: {
          required: helpers.withMessage('Name is required', required),
          minLength: minLength(2),
          maxLength: maxLength(64),
          namePattern: helpers.withMessage('Name is invalid', namePattern)

        },
        time: {
          required: helpers.withMessage('Time is required', required),
        },
        classroom: {
          required: helpers.withMessage('Classroom is required', required),
          minLength: minValue(1),
          maxLength: maxLength(6),
          integer: helpers.withMessage('Name of classroom is integer)', integer),
        },
      }
    }
  },
  methods: {
    getGroups() {
      GroupDataServices.getAll()
          .then(res => {
            this.groups = res.data;
            console.log(res.data);
            console.log(this.groups)
          })
          .catch(e => {
            console.log(e);
          });
    },
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
    getDisciplines() {
      DisciplineDataService.getAll()
          .then(res => {
            this.disciplines = res.data;
            console.log(res.data);
            console.log(this.disciplines)
          })
          .catch(e => {
            console.log(e);
          });
    },
    getSchedule(id) {
      ScheduleDataService.get(id)
          .then(res => {
            this.schedule.group_id = res.data.schedule.group_id;
            this.schedule.group_name = res.data.schedule.group_name;
            this.schedule.teacher_id = res.data.schedule.teacher_id;
            this.schedule.teacher_name = res.data.schedule.teacher_name;
            this.schedule.discipline_id = res.data.schedule.discipline_id;
            this.schedule.discipline_name = res.data.schedule.discipline_name;
            this.schedule.schedule_name = res.data.schedule.schedule_name;
            this.schedule.time = res.data.schedule.time;
            this.schedule.classroom = res.data.schedule.classroom;
            console.log(res.data);
          });
    },
    updateSchedule() {
      this.v$.$validate();
      if (!this.v$.$error) {
        // let g_id;
        // if(!this.schedule.group_name.group_id) g_id = this.schedule.group_id
        // else g_id = this.schedule.group_name.group_id

        let g_id = (!this.schedule.group_name.group_id) ? this.schedule.group_id : this.schedule.group_name.group_id;
        let t_id = (!this.schedule.teacher_name.teacher_id) ? this.schedule.teacher_id : this.schedule.teacher_name.teacher_id;
        let d_id = (!this.schedule.discipline_name.discipline_id) ? this.schedule.discipline_id : this.schedule.discipline_name.discipline_id;

        let data = {
          group_id: g_id,
          teacher_id: t_id,
          discipline_id: d_id,
          name: this.schedule.schedule_name,
          time: this.schedule.time,
          classroom: this.schedule.classroom,
        };
        ScheduleDataService.update(this.$route.params.id, data)
            .then(res => {
              alert("Schedule successfully edited!");
              console.log(res.data);
            })
            .catch(e => {
              console.log(e);
            });
        this.$router.push(`/schedule`);
      }
    },
  },
  mounted() {
    this.getGroups();
    this.getTeachers();
    this.getDisciplines();
    this.getSchedule(this.$route.params.id);
  },
}
</script>

<style scoped>

</style>