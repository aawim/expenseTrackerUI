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
      <table class="min-w-full border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-4 py-2 text-left">#</th>
            <th class="border px-4 py-2 text-left">Role</th>
            <th class="border px-4 py-2 text-left">Permissions</th>
            <th class="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(role, index) in roleStore.roles" :key="role.id">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ role.name }}</td>
            <td class="border px-4 py-2">
              <span v-if="role.permissions && role.permissions.length">
                <span v-for="perm in role.permissions" :key="perm.id"
                  class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1">
                  {{ perm.name }}
                </span>
              </span>
              <span v-else class="text-gray-400">No Permissions</span>
            </td>
            <td class="border px-4 py-2">
              <template v-if="authStore.hasRole('Admin')">
                <button @click="edit(role)">

                  <svg class="feather feather-edit" fill="none" height="24" stroke="#ffc900" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </template>
              <template v-if="authStore.hasRole('Admin')">
               <button @click="deleteRole(role.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fb1300" class="size-6">
                    <path fill-rule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clip-rule="evenodd" />
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


<script setup>
import { ref, onMounted } from 'vue'
import { useRoleStore } from '@/stores/roleStore'
import RoleForm from '../components/RoleForm.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

import { useAuthStore } from '../stores/authStore'

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
function deleteRole(role) {
  roleStore.role = role

}
</script>