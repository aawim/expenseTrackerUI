<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const email = ref('')
const password = ref('')

const error = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true

  try {
    const credentials = {
      email: email.value,
      password: password.value,
    }

    await authStore.login(credentials) // Call the Pinia action
  } catch (err) {
    isLoading.value = false
    error.value = err.message || 'Login failed'
    console.error("Login error:", err)
  }
}


</script>

<template>

  <div class="flex  flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">

      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6 max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input type="email" v-model="email" name="email" id="email" autocomplete="email" required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input type="password" v-model="password" name="password" id="password" autocomplete="current-password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div>
          <button type="submit" :disabled="isLoading"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
        </div>
        <div class="text-sm mt-5 ">
          <router-link class="font-semibold text-indigo-600 hover:text-indigo-500 "
            to="/register">Register</router-link>
        </div>
        <p v-if="error" class="text-red-600 mb-4">{{ error }}</p>
      </form>
      <!-- <p v-if="error.value" class="mt-4 text-red-500">{{ error }}</p> -->
    </div>
    <router-link class="font-semibold text-indigo-600 hover:text-indigo-500 flex w-full justify-center py-12"
      to="/">Home</router-link>
  </div>


</template>