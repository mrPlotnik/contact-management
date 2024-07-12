<template>
  <li class="items">
    <transition
      name="item"
      mode="out-in"
    >
      <div :key="isEditing">
        <span>{{ contact.name }}</span>
        <span>{{ contact.phone }}</span>
        <span>{{ contact.email }}</span>
      </div>
    </transition>
    <div class="items__actions">
      <button
        class="btn btn-sm btn-warning"
        @click="editContact"
      >
        Edit
      </button>
      <button
        class="btn btn-sm btn-danger"
        @click="deleteContact"
      >
        Delete
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import {
  defineProps, PropType, defineEmits, watch, ref,
} from 'vue';
import { Contact } from '@/types/types';

const props = defineProps({
  contact: {
    type: Object as PropType<Contact>,
    required: true,
  },
});

const emit = defineEmits(['delete', 'edit']);

const isEditing = ref(1);

watch(
  () => props.contact,
  () => {
    isEditing.value += 1;
  },
  { deep: true },
);

const deleteContact = () => {
  emit('delete', props.contact.id);
};

const editContact = () => {
  emit('edit', props.contact);
};
</script>

<style scoped lang="scss">
.item {

  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

}

.items {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .5em;
  padding-bottom: .5em;
  &:not(:last-child) {
    border-bottom: 1px solid #e4e4e4;
  }

  span {
    margin-right: .75em;
  }

  &__actions {
    display: flex;
  }

  .btn {
    &:not(:last-child) {
      margin-right: 0.25em;
    }
  }
}
</style>
