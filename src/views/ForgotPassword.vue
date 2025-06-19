<!-- ForgotPassword.vue -->

<script setup>
import { ref } from 'vue'
// import axios from 'axios'
import axios from '@/apiClient'
const email = ref('')
const message = ref('')

async function submit() {
    try {
        const res = await axios.post('/forgot-password', { email: email.value })
        message.value = res.data.message
    } catch (err) {
        message.value = err.response.data.message || 'Failed to send reset link'
    }
}
</script>


<template>
    <form @submit.prevent="submit">
        
        <input v-model="email" type="email" placeholder="Email" />
        <button type="submit">Send Reset Link</button>
        <p v-if="message">{{ message }}</p>
    </form>

    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register new account</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <!-- <form class="space-y-6 max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg" @submit.prevent="submit">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="">
                        <input type="email" v-model="email" name="email" id="email" autocomplete="email" required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    </div>
                </div>
                <button type="submit">Send Reset Link</button>
                <p v-if="message">{{ message }}</p>
            </form> -->
        </div>
    </div>







</template>
