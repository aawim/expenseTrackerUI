<script setup>
import { useAuthStore } from '../stores/authStore'
import NavBarItems from './common/NavBarItems.vue'
import { onMounted, ref } from 'vue'
const authStore = useAuthStore()


const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

const isOpen = ref(false)
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

  <nav class="
      flex flex-wrap
      items-center
      justify-between
      w-full
      py-4
      md:py-0
      px-4
      text-lg text-gray-700
      bg-white
      shadow-md
    ">
    <div>
      <a href="#">
        <span class="text-xl font-bold text-purple-700 ml-10">Expense Tracker</span>
      </a>




    </div>

    <svg @click="toggleMenu" xmlns="http://www.w3.org/2000/svg" id="menu-button"
      class="h-6 w-6 cursor-pointer md:hidden block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>




    <div :class="[
      'w-full md:flex md:items-center md:w-auto',
      isMenuOpen ? 'block' : 'hidden'
    ]">



      <div>
        <ul class="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0">



          <li>
            <router-link class="md:p-4 py-2 block hover:text-purple-400 text-purple-500" to="/">Home</router-link>
          </li>

          <template v-if="authStore.isAuthenticated">
            <li>

              <template v-if="authStore.hasPermission('view_user') || authStore.hasRole('Admin')">
                <router-link class="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                  to="/home">Dashboard</router-link>
              </template>
            </li>

            <li>

              <template v-if="authStore.hasPermission('view_user') || authStore.hasRole('Admin')">
                <router-link class="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                  to="/users">Users</router-link>
              </template>
            </li>
            <li>



              <template v-if="authStore.hasPermission('view_roles') || authStore.hasRole('Admin')">
                <router-link class="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                  to="/roles">Role</router-link>
              </template>



            </li>
            <li>

              <template v-if="authStore.hasPermission('view_permissions') || authStore.hasRole('Admin')">
                <router-link class="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                  to="/permissions">Permissions</router-link>
              </template>

            </li>
            <li> <template v-if="authStore.hasPermission('view_expense') || authStore.hasRole('Admin')">
                <router-link class="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                  to="/expenses">Expenses</router-link>
              </template>
            </li>


          </template>





          <template v-if="!authStore.isAuthenticated">
            <li>
              <router-link class="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                to="/login">Login</router-link>
            </li>

            <li>
              <router-link class="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                to="/register">Register</router-link>
            </li>

          </template>

          <template v-else>
            <span class="md:p-4 py-2 block text-purple-500 font-bold"> {{ authStore.user.name }}</span>


            <button @click="logout" class="md:p-4 py-2 block hover:text-purple-400 text-purple-500 cursor-pointer">
              Logout
            </button>

          </template>
        </ul>

      </div>



    </div>
  </nav>


</template>