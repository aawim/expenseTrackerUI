<script setup>
import { ref, onMounted } from 'vue'
import { usePermissionStore } from '@/stores/permissionStore'
import PermissionForm from '@/components/PermissionForm.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
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


<template>
  <DefaultLayout>
    <div>
      <h2 class="text-xl font-bold mb-4">Permissions</h2>

      <button @click="openForm = true" class="bg-blue-500 text-white px-3 py-1 rounded mb-4">Add Permission</button>
      <PermissionForm v-if="openForm" @close="closeForm" />

      <div class="overflow-x-auto bg-white rounded shadow">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission Name
              </th>

              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="permission in permissionStore.permissions" :key="permission.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ permission.name }}</td>

              <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">

                <!-- <button @click="edit(permission)" class="text-yellow-500 mr-2">Edit</button> -->

                <button @click="edit(permission)"
                  class="inline-flex items-center justify-center w-8 h-8 mr-2 text-green-100 transition-colors duration-150 bg-green-600 rounded-full focus:shadow-outline hover:bg-green-700"
                  title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5h2m-1 0v2m-7.88 6.71a4 4 0 010-5.66L12 3l5.88 5.88a4 4 0 010 5.66L12 21l-8.88-8.88z" />
                  </svg>
                </button>
                <button @click="deletePermission(permission.id)"
                  class="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-full focus:shadow-outline hover:bg-pink-800">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </button>



              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>
  </DefaultLayout>
</template>
