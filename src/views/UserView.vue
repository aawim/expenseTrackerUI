<template>
  <DefaultLayout>
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Users</h2>

        <template v-if="authStore.hasPermission('create user')">
          <button @click="openForm()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Add User
          </button>

        </template>
      </div>

      <!-- Users Table -->
      <div class="overflow-x-auto bg-white rounded shadow">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <!-- {{ userStore.users[0].roles[0].permissions }} -->

          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in userStore.users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.roles[0]?.name || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">

                <template v-if="authStore.hasPermission('edit user')">
                  <button @click="openForm(user)">
                    <svg class="feather feather-edit" fill="none" height="24" stroke="#ffc900" stroke-linecap="round"
                      stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </template>

                <template v-if="authStore.hasPermission('delete user')">

                  <button @click="deleteUser(user.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fb1300" class="size-6">
                      <path fill-rule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clip-rule="evenodd" />
                    </svg>

                  </button>
                </template>

                <template v-if="authStore.hasPermission('view user')">
                  <button @click="viewProfile(user.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0c7df5" class="size-6">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fill-rule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clip-rule="evenodd" />
                    </svg>

                  </button>
                </template>


                <!-- <router-link 
                   class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  :to="{ name: 'user-permissions', params: { id: user.id } }">
                    User Permissions
                  </router-link> -->


                <router-link
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  :to="`/user-permissions/${user.id}`" active-class="bg-gray-800 text-white">
                  User Permissions
                </router-link>



              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- User Form Modal -->
      <div v-if="showForm" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative">
          <UserForm :user="selectedUser" :editing="isEditing" @saved="handleSaved" @cancel="closeForm" />
          <!-- Optional Close Button -->
          <button class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl" @click="closeForm">
            &times;
          </button>
        </div>

      </div>

    </div>
  </DefaultLayout>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import UserForm from '@/components/UserForm.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const router = useRouter()
const userStore = useUserStore()
const showForm = ref(false)
const selectedUser = ref(null)
const isEditing = ref(false)

onMounted(async () => {
  await userStore.fetchUsers()
})

const openForm = (user = null) => {
  selectedUser.value = user
  isEditing.value = !!user
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  selectedUser.value = null
  isEditing.value = false
}

const handleSaved = () => {
  closeForm()
  userStore.fetchUsers()
}

const viewProfile = (userId) => {
  router.push({ name: 'UserProfile', params: { id: userId } })
}


const deleteUser = async (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await userStore.deleteUser(id)
    userStore.fetchUsers()
  }
}
</script>
