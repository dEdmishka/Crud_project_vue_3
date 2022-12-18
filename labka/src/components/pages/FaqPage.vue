<template>
  <div>
    <h1>FAQ</h1>
    <my-buttons @click="$router.push('/add_faq')" style="padding: 10px;">Add FAQ</my-buttons>
    <my-table
        :heads="heads"
    >
      <my-table-row
          v-if="faqs.length > 0"
          v-for="faq in faqs"
          :key="faq.faq_id"
      >
        <my-table-column>
          {{ faq.faq_order }}
        </my-table-column>
        <my-table-column>
          {{ faq.content }}
        </my-table-column>
        <my-table-column class="edit-delete-btns">
          <template #icon>
            <EditIcon
                @click="$router.push(`/faq/${faq.faq_id}`);"
            />
            <DeleteIcon
                @click="deleteFaq(faq)"
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
import FacultyDataService from "../../services/FacultyDataService";
import DeleteIcon from "../icons/IconDelete.vue";
import EditIcon from "../icons/IconEdit.vue";
import {start_toggle} from "../../functions/function_toggle";
import FaqDataService from "../../services/FaqDataService";

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
    faqs: [],
    heads: [
      '#', 'content', 'actions'
    ],
  }),
  methods: {
    getFaqs() {
      FaqDataService.getAll()
          .then(res => {
            this.faqs = res.data;
            console.log(res.data);
            console.log(1);
            console.log(this.faqs)
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteFaq(faq) {
      // console.log(1)
      // console.log(professor)
      // console.log(professor.id_p)
      FaqDataService.delete(faq.faq_id)
          .then(res => {
            alert('You have successfully deleted faq: ' + faq.faq_order + ' !')
            console.log(res.data);
            this.getFaqs();
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getFaqs();
    start_toggle();
  }
};
</script>

<style scoped>
.edit-delete-btns{

  justify-content: space-between;
}
</style>