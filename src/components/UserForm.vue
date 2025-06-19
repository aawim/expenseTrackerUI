
<script setup>
import { ref, onMounted } from 'vue'
import { useRoleStore } from '@/stores/roleStore'
import { useUserStore } from '@/stores/userStore'

const props = defineProps({
  user: Object,
  editing: Boolean,
})

const emit = defineEmits(['saved', 'cancel'])

const roleStore = useRoleStore()
const userStore = useUserStore()

const roles = ref([])
const form = ref({
  name: '',
  email: '',
  password: '',
  role_id: '',
})

onMounted(async () => {
  // Fetch roles
  await roleStore.fetchRoles()
  roles.value = roleStore.roles

  // Set form data if editing
  if (props.editing && props.user) {
    form.value = {
      name: props.user.name,
      email: props.user.email,
      password: '',
      role_id: props.user.role_id || props.user.role?.id || '',
    }
  }
})

const save = async () => {
  try {
    if (props.editing) {
      
      await userStore.updateUser(props.user.id, form.value)
    } else {
      await userStore.createUser(form.value)
    }
    emit('saved')
  } catch (error) {
    console.error('Error saving user:', error)
  }
}
</script>

<template>
  <div class="relative">
    <h2 class="text-xl font-semibold mb-4">
      {{ editing ? 'Edit User' : 'Add New User' }}
    </h2>
    <form @submit.prevent="save" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>

      <div v-if="!editing">
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Role</label>
        <select
          v-model="form.role_id"
          class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          required
        >
          <option value="" disabled>Select Role</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          {{ editing ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>

