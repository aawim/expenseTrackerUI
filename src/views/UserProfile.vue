<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
const authStore = useAuthStore()
const user = ref({})

onMounted(async () => {
  // Assuming your auth store fetches the current user
  await authStore.fetchUser()
  user.value = authStore.user
})

const editProfile = () => {
  // Navigate to an edit profile page or open a modal
  console.log('Edit clicked')
}
</script>

<template>
  <DefaultLayout>
    <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 class="text-2xl font-bold mb-4">User Profile</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-gray-600 text-sm">Name</p>
          <p class="text-lg font-medium text-gray-900">{{ user.name }}</p>
        </div>

        <div>
          <p class="text-gray-600 text-sm">Email</p>
          <p class="text-lg font-medium text-gray-900">{{ user.email }}</p>
        </div>

        <div>
          <p class="text-gray-600 text-sm">Role</p>
          <p class="text-lg font-medium text-gray-900">{{ user.role?.name || '—' }}</p>
        </div>

        <div>
          <p class="text-gray-600 text-sm">Permissions</p>
          <ul class="text-gray-900 text-sm list-disc list-inside">
            <li v-for="perm in user.role?.permissions || []" :key="perm.id">
              {{ perm.name }}
            </li>
            <li v-if="(user.role?.permissions?.length ?? 0) === 0">No permissions assigned</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" @click="editProfile">
          Edit Profile
        </button>
      </div>
    </div>
  </DefaultLayout>
</template>
