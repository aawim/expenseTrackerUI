<template>
  <div>
    <h2>Manage User Permissions</h2>
    <div v-if="userPermStore.loading">Loading...</div>
    <div v-else>
      <form @submit.prevent="submit">
        <div v-for="perm in allPermissions" :key="perm.id">
          <label>
            <input
              type="checkbox"
              :value="perm.id"
              v-model="selectedPermissions"
            />
            {{ perm.name }}
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserPermissionStore } from '@/stores/userHasPermissionStore'
import axios from '@/apiClient'

const props = defineProps({ userId: Number })
const userPermStore = useUserPermissionStore()
const selectedPermissions = ref([])
const allPermissions = ref([])

onMounted(async () => {
  await userPermStore.fetchUserPermissions(props.userId)
  selectedPermissions.value = userPermStore.userPermissions.map(p => p.id)

  const res = await axios.get('/permissions') // You should have an endpoint for this
  allPermissions.value = res.data
})

const submit = async () => {
  await userPermStore.updateUserPermissions(props.userId, selectedPermissions.value)
  alert('Permissions updated!')
}
</script>
