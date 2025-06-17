<!-- <template>
  <div>
    <h3>{{ editing ? 'Edit Role' : 'New Role' }}</h3>
    <form @submit.prevent="save">
      <input v-model="form.name" placeholder="Role name" />

      <label v-for="perm in permissions" :key="perm.id">
        <input type="checkbox" :value="perm.id" v-model="form.permissions" />
        {{ perm.name }}
      </label>

      <button type="submit">Save</button>
      <button type="button" @click="$emit('close')">Cancel</button>
    </form>
  </div>
</template> -->

<template>
  <div class="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
    <h3 class="text-xl font-semibold mb-4">
      {{ editing ? 'Edit Role' : 'New Role' }}
    </h3>

    <form @submit.prevent="save" class="space-y-4">
      <!-- Role Name Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Enter role name"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Permissions Checkboxes -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
        <div class="flex flex-wrap gap-3">
          <label
            v-for="perm in permissions"
            :key="perm.id"
            class="flex items-center space-x-2"
          >
            <input
              type="checkbox"
              :value="perm.id"
              v-model="form.permissions"
              class="text-blue-600 rounded"
            />
            <span class="text-sm text-gray-800">{{ perm.name }}</span>
          </label>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-3 mt-4">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
        <button
          type="button"
          @click="$emit('close')"
          class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>


<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoleStore } from '@/stores/roleStore'
import { usePermissionStore } from '@/stores/permissionStore'

const roleStore = useRoleStore()
const permissionStore = usePermissionStore()
const emit = defineEmits(['close'])
const form = ref({ name: '', permissions: [] })
const editing = computed(() => !!roleStore.role?.id)

watch(() => roleStore.role, (r) => {
  if (r) {
    form.value = { name: r.name, permissions: r.permissions.map(p => p.id) }
  }
})

onMounted(() => permissionStore.fetchPermissions())

const permissions = computed(() => permissionStore.permissions)

async function save() {

  if (editing.value) {
    await roleStore.updateRole(roleStore.role.id, form.value)
  } else {
    await roleStore.createRole(form.value)
  }
  roleStore.role = null
  form.value = { name: '', permissions: [] }
  emit('close')
}
</script>
