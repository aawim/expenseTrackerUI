import { defineStore } from 'pinia'
import api from '../apiClient'
import axios from 'axios'
 
export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [],
    role: null,
    token: localStorage.getItem('token') || '', // Retrieve token from localStorage
    loading: false
  }),

  actions: {

    async fetchRoles() {
      try {
        this.loading = true
        const response = await api.get('/roles')
        this.roles = response.data.data
      } catch (error) {
        console.error('Error fetching roles:', error.response?.data?.message || error.message)
      }
    },


    async fetchRole(id) {
      try {
      //  this.loading = true
        const response = await api.get(`/roles/${id}`)
        this.role = response.data.data
     
      } catch (error) {
        console.error('Error creating event:', error.response?.data?.message || error.message)
      }
    },

    async createRole(eventData) {
      try {
      //  this.loading = true
        const response = await api.post('/roles', eventData)
        this.roles = response.data
      } catch (error) {
        console.error('Error creating event:', error.response?.data?.message || error.message)
      }
    },


    // async updateRole(id, data) {
    //   await api.put(`/roles/${id}`, data)
    //   await this.fetchRoles()
    // },


    async updateRole(id, data) {
      try {
        await api.patch(`/roles/${id}`, data)
         this.fetchRoles()
      } catch (error) {
        console.error('Error updating event:', error.response?.data?.message || error.message)
      }
    },

    async deleteRole(id) {
      await api.delete(`/roles/${id}`)
      await this.fetchRoles()
    }
  }
})