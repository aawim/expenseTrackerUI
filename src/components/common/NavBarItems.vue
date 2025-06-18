<script setup>
import { useAuthStore } from '../../stores/authStore'
const authStore = useAuthStore()
</script>
<template>
    
    <div>
        <router-link class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            to="/">Home</router-link>
        <template v-if="authStore.isAuthenticated">
          
            <template v-if="authStore.hasPermission('view_user') || authStore.hasRole('Admin')">
                <router-link
                    class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    to="/users">Users</router-link>
            </template>
            <template v-if="authStore.hasPermission('view_roles') || authStore.hasRole('Admin')">
                <router-link
                    class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    to="/roles">Role</router-link>
            </template>
            <template v-if="authStore.hasPermission('view_permissions') || authStore.hasRole('Admin')">
                <router-link
                    class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    to="/permissions">Permissions</router-link>
            </template>

            <router-link
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                to="/expenses">Expenses</router-link>
        </template>
        
    </div>
</template>


