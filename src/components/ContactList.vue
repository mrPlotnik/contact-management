<template>
  <div>
    <ul>
      <TransitionGroup
        name="list"
        tag="ul"
      >
        <ContactItem
          v-for="contact in props.contacts"
          :key="contact.id"
          :contact="contact"
          @delete="deleteContact"
          @edit="editContact"
        />
      </TransitionGroup>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue';
import ContactItem from '@/components/ContactItem.vue';
import { Contact } from '@/types/types';

const props = defineProps({
  contacts: {
    // type: Object as () => Contact | null,
    type: Array as PropType<Contact[]>,
    required: true,
  },
});

const emit = defineEmits(['delete', 'edit']);

const deleteContact = (id: number) => {
  emit('delete', id);
};

// Указываем тип contact как Contact
const editContact = (contact: Contact) => {
  emit('edit', contact);
};
</script>

<style scoped lang="scss">

.list {

  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

}

ul {
  padding: 0;
}
</style>
