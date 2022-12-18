<template>
  <div>
    <div class="edit-form">
      <h1>FAQ</h1>
      <form action="" @submit.prevent>
        <div class="form-group">
          <label for="faq_order">Number</label>
          <my-inputs
              id="faq_order"
              v-model.trim="faq.faq_order"
              @:input="v$.faq.faq_order.$touch"
          />
          <span v-if="v$.faq.faq_order.$error" class="error">
          {{ v$.faq.faq_order.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <my-inputs
              id="content"
              v-model.trim="faq.content"
              @:input="v$.faq.content.$touch"
          />
          <span v-if="v$.faq.content.$error" class="error">
          {{ v$.faq.content.$errors[0].$message }}
          </span>
        </div>
        <my-buttons
            @click="$router.push(`/faq`)"
        >
          Back
        </my-buttons>

        <my-buttons class="btn btn-submit"
                    @click="updateFaq"
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
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {required, helpers, minLength, maxLength, minValue, maxValue, integer} from '@vuelidate/validators';
import FaqDataService from "../../services/FaqDataService";

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
      faq: {
        faq_order: '',
        content: '',
      },
    };
  },
  validations() {
    return {
      faq: {
        faq_order: {
          required: helpers.withMessage('Number is required', required),
          minValue: minValue(1),
          maxValue: maxValue(100),
          integer: helpers.withMessage('Number is integer)', integer),
        },
        content: {
          required: helpers.withMessage('Content is required', required),
          minLength: minLength(5),
          maxLength: maxLength(256),
        },
      }
    }
  },
  methods: {
    getFaq(id) {
      // this.changed = true;
      // if(!this.faculty.name) {
      FaqDataService.get(id)
          .then(res => {
            this.faq.faq_order = res.data.faq.faq_order;
            this.faq.content = res.data.faq.content;
            console.log(res.data);
            // this.changed = false;
          });
      // }
    },
    updateFaq() {
      // this.changed = true;
      this.v$.$validate();
      if (!this.v$.$error) {
        FaqDataService.update(this.$route.params.id, this.faq)
            .then(res => {
              alert("FAQ successfully edited!");
              // this.submitted = true;
              console.log(res.data);
              // this.$router.push('/professors');
              // setTimeout(()=> router.push('/professors'), 2000);
            })
            .catch(e => {
              console.log(e);
            });
        this.$router.push(`/faq`);
      } else {
        alert("Form failed validation!")
      }
    },
  },

  mounted() {
    this.getFaq(this.$route.params.id);
  },
}
</script>

<style scoped>

</style>