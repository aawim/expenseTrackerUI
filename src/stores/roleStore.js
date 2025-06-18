import { defineStore } from 'pinia'
import api from '../apiClient'

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [],
    role: null,
    token: localStorage.getItem('token') || '',
    loading: false,
  }),

  actions: {
    async fetchRoles() {
      try {
        this.loading = true
        const response = await api.get('/roles')
        this.roles = response.data.data
      } catch (error) {
        console.error('Error fetching roles:', error.response?.data?.message || error.message)
      } finally {
        this.loading = false
      }
    },

    async fetchRole(id) {
      try {
        const response = await api.get(`/roles/${id}`)
        this.role = response.data.data
      } catch (error) {
        console.error('Error fetching role:', error.response?.data?.message || error.message)
      }
    },

    async createRole(data) {
      try {
        await api.post('/roles', data)
        await this.fetchRoles()
      } catch (error) {
        console.error('Error creating role:', error.response?.data?.message || error.message)
      }
    },

    async updateRole(id, data) {

      console.log(data)
      try {
        await api.patch(`/roles/${id}`, data)
        await this.fetchRoles()
      } catch (error) {
        console.error('Error updating role:', error.response?.data?.message || error.message)
      }
    },

    async deleteRole(id) {
      try {
        if (!id) {
          console.error('Invalid role ID provided:', id)
          return
        }

        await api.delete(`/roles/${id.id}`)
        await this.fetchRoles()
      } catch (error) {
        console.error('Error deleting role:', error.response?.data?.message || error.message)
        throw error
      }
    }
  }
})
