<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserHasPermissionStore } from '@/stores/userHasPermissionStore'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
const showTooltip = ref(false)
const route = useRoute()
const userId = route.params.id
const store = useUserHasPermissionStore()
const selectedPermissions = ref([])

onMounted(async () => {
    await store.fetchAllPermissions()
    await store.fetchUserPermissions(userId)
    selectedPermissions.value = Array.isArray(store.userPermissions)
        ? [...store.userPermissions]
        : []
})


const submitPermissions = async () => {

    await store.updateUserPermissions(userId, store.userPermissions.permissions)
    await store.fetchUserPermissions(userId) // Refresh permissions

    showTooltip.value = true

    setTimeout(() => {
        showTooltip.value = false
    }, 2500)
}


</script>

<template>
    <DefaultLayout>
        <div v-if="store.loading">Loading...</div>
        <div v-else>
            <h2 class="text-xl font-bold mb-4">User Permissions</h2>

            <form @submit.prevent="submitPermissions">
                <div v-if="store.allPermissions.length">
                    <h3 class="font-bold text-lg mb-2">Assign Permissions:</h3>
                    <div v-for="permission in store.allPermissions" :key="permission" class="mb-1">
                        <label class="inline-flex items-center">
                            <input type="checkbox" :value="permission" v-model="store.userPermissions.permissions"
                                class="mr-2" />
                            {{ permission }}
                        </label>
                    </div>

                    <div v-if="parseInt(userId) !== authStore.user.id && authStore.hasRole('Admin')">
                        <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                            Save Permissions
                        </button>
                    </div>
                    <div v-else>

                        <div v-if="parseInt(userId) == authStore.user.id">
                            <p class="text-red-600">You cannot update your own permissions.</p>
                        </div>
                        <div v-else>
                            <p class="text-red-600">You don't have permission to change.</p>
                        </div>
                    </div>
                </div>
            </form>

            <!-- <VPopover v-model:shown="showTooltip" placement="top">
                <template #default>
                    <span class="text-green-600 font-semibold">Update successful!</span>
                </template>
</VPopover> -->

            <VPopover v-if="showTooltip" placement="top" :triggers="[]" :shown="true">
                <template #default>
                    <div class="bg-green-500 text-white px-4 py-2 rounded shadow">
                        ✅ Update successful!
                    </div>
                </template>
            </VPopover>
        </div>
    </DefaultLayout>
</template>
