// stores/userHasPermissionStore.js
import { defineStore } from 'pinia'
import axios from '@/apiClient'

export const useUserHasPermissionStore = defineStore('userHasPermission', {
  state: () => ({
    userPermissions: [],
    allPermissions: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchUserPermissions(userId) {
      this.loading = true
      try {
        const response = await axios.get(`/user-permissions/${userId}`)
        this.userPermissions = response.data
      } catch (err) {
        this.error = 'Failed to load user permissions'
      } finally {
        this.loading = false
      }
    },

    async fetchAllPermissions() {
      try {
        const response = await axios.get('/permissions') // Make sure you expose this API
        this.allPermissions = response.data.data.map(p => p.name)
      } catch (err) {
        this.error = 'Failed to load all permissions'
      }
    },

    async updateUserPermissions(userId, permissions) {

      try {
        await axios.patch(`/user-permissions/${userId}`, {
          permissions
        })
        this.userPermissions = permissions
      } catch (err) {
        this.error = 'Failed to update user permissions'
      }
    }
  }
})
