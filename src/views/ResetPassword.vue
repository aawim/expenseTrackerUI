<!-- ResetPassword.vue -->


<script setup>
import { ref, onMounted } from 'vue'
// import axios from 'axios'
import axios from '@/apiClient'
import { useRoute } from 'vue-router'

const route = useRoute()
const form = ref({
    email: '',
    password: '',
    password_confirmation: '',
    token: ''
})
const message = ref('')

onMounted(() => {
    form.value.token = route.query.token
    form.value.email = route.query.email
})

async function submit() {
    try {
        const res = await axios.post('/api/reset-password', form.value)
        message.value = res.data.message
    } catch (err) {
        message.value = err.response.data.message || 'Failed to reset password'
    }
}
</script>


<template>
    <form @submit.prevent="submit">
        <input v-model="form.email" type="email" placeholder="Email" />
        <input v-model="form.password" type="password" placeholder="New Password" />
        <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password" />
        <button type="submit">Reset Password</button>
        <p v-if="message">{{ message }}</p>
    </form>
</template>