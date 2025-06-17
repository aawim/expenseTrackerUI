<template>
  <div class="bg-gray-100 p-4 rounded mb-4">
    <h3 class="text-lg font-semibold mb-2">
      {{ editing ? 'Edit Permission' : 'New Permission' }}
    </h3>
    <form @submit.prevent="save">
      <input
        v-model="form.name"
        type="text"
        placeholder="Permission name"
        class="border p-2 w-full mb-2"
        required
      />
      <div class="flex gap-2">
        <button type="submit" class="bg-green-500 text-white px-3 py-1 rounded">
          Save
        </button>
        <button type="button" @click="$emit('close')" class="bg-gray-400 text-white px-3 py-1 rounded">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { usePermissionStore } from '@/stores/permissionStore'

const emit = defineEmits(['close'])
const permissionStore = usePermissionStore()
const editing = computed(() => !!permissionStore.permission?.id)

const form = ref({ name: '' })

watch(() => permissionStore.permission, (perm) => {
  if (perm) {
    form.value.name = perm.name
  }
}, { immediate: true })

async function save() {
  if (editing.value) {
    await permissionStore.updatePermission(permissionStore.permission.id, form.value)
  } else {
    await permissionStore.createPermission(form.value)
  }
  emit('close')
}
</script>
