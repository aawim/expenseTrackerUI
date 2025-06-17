<template>
  <DefaultLayout>
  <div>
    <h2 class="text-xl font-bold mb-4">Permissions</h2>

    <button @click="openForm = true" class="bg-blue-500 text-white px-3 py-1 rounded mb-4">Add Permission</button>
    <PermissionForm v-if="openForm" @close="closeForm" />
    <!-- <ul v-if="!loading">
      <li v-for="permission in permissionStore.permissions" :key="permission.id" class="mb-2 flex items-center justify-between">
        <span>{{ permission.name }}</span>
        <div>
          <button @click="edit(permission)" class="text-yellow-500 mr-2">Edit</button>
          <button @click="deletePermission(permission.id)" class="text-red-500">Delete</button>
        </div>
      </li>
    </ul> -->





 <div class="overflow-x-auto bg-white rounded shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission Name</th>

            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="permission in permissionStore.permissions" :key="permission.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ permission.name }}</td>

            <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">

   <button @click="edit(permission)" class="text-yellow-500 mr-2">Edit</button>
          <button @click="deletePermission(permission.id)" class="text-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
















  </div>
</DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePermissionStore } from '@/stores/permissionStore'
import PermissionForm from '@/components/PermissionForm.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
const permissionStore = usePermissionStore()
// const { permissions, fetchPermissions, deletePermission, loading } = permissionStore
const openForm = ref(false)


// onMounted(fetchPermissions)

onMounted(() => {
  permissionStore.fetchPermissions()
 })


function edit(permission) {
  permissionStore.permission = permission
  openForm.value = true
}


function deletePermission(permission) {
  permissionStore.permission = permission

}

function closeForm() {
  openForm.value = false
  permissionStore.permission = null
}
</script>
