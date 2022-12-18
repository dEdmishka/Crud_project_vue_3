<template>
  <div>
    <h1>Page with schedules</h1>
    <my-buttons @click="$router.push('/add_schedule')" style="padding: 10px;">Add Schedule</my-buttons>
    <my-table
        :heads="heads"
    >
      <my-table-row
          v-if="schedules.length > 0"
          v-for="schedule in schedules"
          :key="schedule.schedule_id"
      >

        <my-table-column>
          {{ schedule.schedule_name }}
        </my-table-column>
        <my-table-column>
          {{ schedule.group_name }}
        </my-table-column>
        <my-table-column>
          {{ schedule.teacher_name }}
        </my-table-column>
        <my-table-column>
          {{ schedule.discipline_name }}
        </my-table-column>
        <my-table-column>
          {{ schedule.time }}
        </my-table-column>
        <my-table-column>
          {{ schedule.classroom }}
        </my-table-column>


        <my-table-column class="edit-delete-btns">
          <template #icon>
            <EditIcon
                @click="$router.push(`/schedule/${schedule.schedule_id}`)"
            />
            <DeleteIcon
                @click="deleteSchedule(schedule)"
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
import ScheduleDataService from "../../services/ScheduleDataService";
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
    schedules: [],
    heads: [
      'schedule_name', 'group_name', 'teacher_name', 'discipline_name', 'time', 'classroom', 'action'
    ],
  }),
  methods: {
    getSchedules() {
      ScheduleDataService.getAll()
          .then(res => {
            this.schedules = res.data;
            console.log(res.data);
            console.log(this.schedules)
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteSchedule(schedule) {
      // console.log(1)
      // console.log(professor)
      // console.log(professor.id_p)
      ScheduleDataService.delete(schedule.schedule_id)
          .then(res => {
            alert('You have successfully deleted schedule: ' + schedule.schedule_name + ' !')
            console.log(res.data);
            this.getSchedules();
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getSchedules();
    start_toggle();
  }
};
</script>

<style scoped>
.edit-delete-btns{

  justify-content: space-between;
}
</style>