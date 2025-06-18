<script setup>

import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import UserForm from '@/components/UserForm.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

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


<template>
  <DefaultLayout>
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Users</h2>

        <template v-if="authStore.hasPermission('create_user')">
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
            <tr v-for="user in userStore.users" :key="user.id" class="odd:bg-white even:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.roles[0]?.name || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">

                <template v-if="authStore.hasPermission('edit_user')">
                  <button @click="openForm(user)"
                    class="inline-flex items-center justify-center w-8 h-8 mr-2 text-green-100 transition-colors duration-150 bg-green-600 rounded-full focus:shadow-outline hover:bg-green-700"
                    title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5h2m-1 0v2m-7.88 6.71a4 4 0 010-5.66L12 3l5.88 5.88a4 4 0 010 5.66L12 21l-8.88-8.88z" />
                    </svg>
                  </button>


                </template>

                <template v-if="authStore.hasPermission('delete_user')">

                  <button @click="deleteUser(user.id)"
                    class="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-full focus:shadow-outline hover:bg-pink-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </button>
                </template>

                <template v-if="authStore.hasPermission('view_user')">

                  <button @click="viewProfile(user.id)"
                    class="inline-flex items-center justify-center w-8 h-8 mr-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-full focus:shadow-outline hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>


                </template>



                <router-link
                  class="inline-flex items-center justify-center w-8 h-8 mr-2 text-purple-100 bg-purple-600 hover:bg-purple-700 transition-colors duration-150 rounded-full"
                  :to="`/user-permissions/${user.id}`" active-class="ring-2 ring-purple-300" title="User Permissions">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.354l6 2.182v4.548c0 3.108-2.133 6.473-6 8.916-3.867-2.443-6-5.808-6-8.916V6.536l6-2.182z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4-4" />
                  </svg>
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
