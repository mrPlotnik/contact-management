<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <form
    id="form"
    class="mb-3"
    @submit.prevent="onSubmit"
  >
    <div class="row mb-2">
      <div class="col-12 col-md-6 mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model.trim="contact.name"
          class="form-control"
          type="text"
          placeholder="Name"
          required
        >
      </div>
      <div class="col-12 col-md-6 mb-2">
        <label for="phone">Phone</label>
        <input
          id="phone"
          v-model.trim="contact.phone"
          class="form-control"
          type="tel"
          placeholder="Phone"
          required
        >
      </div>
      <div class="col-12 col-md-6 mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model.trim="contact.email"
          class="form-control"
          type="email"
          placeholder="Email"
          required
        >
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="btn-wrap">
          <button
            type="submit"
            class="btn btn-success"
          >
            Save
          </button>
          <button
            class="btn btn-secondary"
            @click.prevent="clearForm"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  defineProps, defineEmits, reactive, onMounted, watch,
} from 'vue';
import { Contact } from '@/types/types';

const emit = defineEmits(['save']);

const props = defineProps({
  contact: {
    type: Object as () => Contact | null,
    required: true,
  },
});

const contact = reactive({ ...props.contact });

onMounted(() => {
  Object.assign(contact, props.contact);
});

watch(
  () => props.contact,
  (newValue) => {
    Object.assign(contact, newValue);
  },
);

const clearForm = () => {
  contact.name = '';
  contact.phone = '';
  contact.email = '';
  contact.id = undefined;
};

const onSubmit = () => {
  // Отправляем событие save с локальной копией объекта contact
  emit('save', { ...contact });

  // Очищаем поля формы после сохранения
  clearForm();
};

</script>

<style scoped lang="scss">
#form {
  margin-bottom: .5em;

  .btn-wrap {
    .btn {
      &:not(:last-child) {
        margin-right: 0.5em;
      }
    }
  }

}
</style>
