<script setup>
import { useAuthStore } from '../stores/authStore'
import NavBarItems from './common/NavBarItems.vue'
import { onMounted } from 'vue'
const authStore = useAuthStore()
// Fetch user details if logged in
const logout = async () => {
  await authStore.logout()
  // Optionally redirect to login page after logout
  localStorage.removeItem("token");
  window.location.href = '/login'
}

onMounted(() => {
  if (authStore.token && !authStore.user) {
    authStore.fetchUser();
  }
});

</script>
<template>

  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
       
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <!-- <div class="flex shrink-0 items-center">
            <img class="h-8 w-auto hidden sm:ml-6 sm:block" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company">
          </div> -->
          <div class="hidden sm:ml-6 sm:block">

           <div class="flex space-x-4">
            <NavBarItems/>
           </div>

          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <div>
              <template v-if="!authStore.isAuthenticated">
                <router-link
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  to="/login">Login</router-link>
                <router-link
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  to="/register">Register</router-link>
              </template>
              <template v-else>
                <span class=" px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"> {{
                  authStore.user.name }}</span>
                <button @click="logout"
                  class=" px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white">Logout</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <NavBarItems/>
      </div>
    </div>
  </nav>
</template>