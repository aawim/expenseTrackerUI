<script setup>
import { ref, onMounted } from 'vue'
import { useRoleStore } from '@/stores/roleStore'
import RoleForm from '@/components/RoleForm.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const roleStore = useRoleStore()
const openForm = ref(false)
onMounted(() => {
  roleStore.fetchRoles()
})

function edit(role) {
  roleStore.role = role
  openForm.value = true
}
// function deleteRole(role) {
//   roleStore.role = role

// }

async function deleteRole(id) {
  if (confirm('Are you sure you want to delete this role?')) {
    await roleStore.deleteRole(id)
  }
}


</script>
<template>
  <DefaultLayout>
    <div class="container">

      <div class="flex justify-between items-center mb-4">
        <!-- <h2 class="text-2xl font-bold">Users</h2> -->

        <template v-if="authStore.hasPermission('create roles')">
          <button @click="openForm = true"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Add Role
          </button>

        </template>
      </div>


      <RoleForm v-if="openForm" @close="openForm = false" />
      <h2 class="text-xl font-bold mb-4">Roles</h2>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th class=" px-4 py-2 text-left">#</th>
            <th class=" px-4 py-2 text-left">Role</th>
            <th class=" px-4 py-2 text-left">Permissions</th>
            <th class=" px-4 py-2 text-left w-30 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(role, index) in roleStore.roles" :key="role.id" class="odd:bg-white even:bg-gray-100">
            <td class=" px-4 py-2">{{ index + 1 }}</td>
            <td class=" px-4 py-2">{{ role.name }}</td>
            <td class=" px-4 py-2">
              <span v-if="role.permissions && role.permissions.length">
                <span v-for="perm in role.permissions" :key="perm.id"
                  class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1">
                  {{ perm.name }}
                </span>
              </span>
              <span v-else class="text-gray-400">No Permissions</span>
            </td>
            <td class=" px-4 py-2">
              <template v-if="authStore.hasRole('Admin') || authStore.hasPermission('edit roles')">

                <button @click="edit(role)"
                  class="inline-flex items-center justify-center w-8 h-8 mr-2 text-green-100 transition-colors duration-150 bg-green-600 rounded-full focus:shadow-outline hover:bg-green-700"
                  title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5h2m-1 0v2m-7.88 6.71a4 4 0 010-5.66L12 3l5.88 5.88a4 4 0 010 5.66L12 21l-8.88-8.88z" />
                  </svg>
                </button>

              </template>
              <template v-if="authStore.hasRole('Admin') || authStore.hasPermission('delete roles')">
                <button @click="deleteRole(role)"
                  class="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-full focus:shadow-outline hover:bg-pink-800">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </button>

              </template>
            </td>

          </tr>
        </tbody>
      </table>


    </div>
  </DefaultLayout>
</template>
