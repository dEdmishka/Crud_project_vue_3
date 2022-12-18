<template>
  <div>
    <h1>Add FAQ</h1>
    <div class="form">
      <div v-if="!submitted">
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

        <my-buttons
            @click="createFaq"
            class="btn btn-submit"
        >
          Create
        </my-buttons>
      </div>

      <div v-else>
        <h4>You create FAQ successfully!</h4>
        <my-buttons
            @click="$router.push(`/faq`)"
        >
          Back
        </my-buttons>
        <my-buttons
            class="btn btn-submit"
            @click="newFaq"
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
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {required, helpers, minLength, maxLength, integer, minValue, maxValue} from '@vuelidate/validators';
import FaqDataService from "../../services/FaqDataService";

export default {
  components: {
    myButtons,
    myInputs,
  },
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      faq: {
        id: null,
        faq_order: '',
        content: '',
      },
      submitted: false,
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
    createFaq() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = {
          faq_order: this.faq.faq_order,
          content: this.faq.content,
        };

        FaqDataService.create(data)
            .then(res => {
              this.faq.id = res.data.id;
              console.log(res.data)
              this.submitted = true;
            })
            .catch(e => {
              console.log(e);
            });
      } else {
        alert("Form failed validation!")
      }
    },

    newFaq() {
      this.submitted = false;
      this.faq = {};
    }
    //New and other methods
  },

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