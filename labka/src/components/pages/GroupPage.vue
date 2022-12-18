<template>
  <div>
    <h1>Page with groups</h1>
    <my-buttons @click="$router.push('/add_group')" style="padding: 10px;">Add Group</my-buttons>
    <my-table
        :heads="heads"
    >
      <my-table-row
          v-if="groups.length > 0"
          v-for="group in groups"
          :key="group.group_id"
      >

        <my-table-column>
          {{ group.department_name }}
        </my-table-column>
        <my-table-column>
          {{ group.group_name }}
        </my-table-column>
        <my-table-column>
          {{ group.course }}
        </my-table-column>

        <my-table-column class="edit-delete-btns">
          <template #icon>
            <EditIcon
                @click="$router.push(`/group/${group.group_id}`)"
            />
            <DeleteIcon
                @click="deleteGroup(group)"
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
import GroupDataServices from "../../services/GroupDataServices";
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
    MyTable
  },
  data: () => ({
    groups: [],
    heads: [
      'department_short_name', 'name', 'course', 'actions'
    ],
  }),
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
    deleteGroup(group) {
      // console.log(1)
      // console.log(professor)
      // console.log(professor.id_p)
      GroupDataServices.delete(group.group_id)
          .then(res => {
            alert('You have successfully deleted group: ' + group.name + ' !')
            console.log(res.data);
            this.getGroups();
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getGroups();
    start_toggle();
  }
};
</script>

<style scoped>
.edit-delete-btns{

  justify-content: space-between;
}
</style>