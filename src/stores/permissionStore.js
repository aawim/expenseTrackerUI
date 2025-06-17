// src/stores/permissionStore.js
import { defineStore } from 'pinia'
import api from '../apiClient'
import axios from 'axios'
export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissions: [],
    permission: null,
    token: localStorage.getItem('token') || '', // Retrieve token from localStorage
    loading: false
  }),

  actions: {

    // getAuthHeaders() {
    //   return {
    //     headers: {
    //       Authorization: `Bearer ${this.token}`
    //     }
    //   }
    // },


    async fetchPermissions() {
      try {
        this.loading = true
        const response = await api.get('/permissions')
        this.permissions = response.data.data
      } catch (error) {
        console.error('Error fetching roles:', error.response?.data?.message || error.message)
      }
    },
    async createPermission(data) {
      try {
        this.loading = true
        const response = await api.post('/permissions', data)
        this.permissions = response.data
        await this.fetchPermissions()
      } catch (error) {
        console.error('Error creating permission:', error.response?.data?.message || error.message)
      }


    },

    async updatePermission(id, data) {
      try {
        this.loading = true
        const response = await api.put(`/permissions/${id}`, data)
        this.permissions = response.data
        await this.fetchPermissions()
      } catch (error) {
        console.error('Error creating permission:', error.response?.data?.message || error.message)
      }


    },

    async deletePermission(id) {
      // await api.delete(`/permissions/${id}`)
      // await this.fetchPermissions()


            try {
        this.loading = true
        const response = await api.delete(`/permissions/${id}`)
        // this.permissions = response.data

         this.permissions = this.permissions.filter(permissions => permissions.id !== id)
        await this.fetchPermissions()
      } catch (error) {
        console.error('Error creating permission:', error.response?.data?.message || error.message)
      }
    }
  }
})