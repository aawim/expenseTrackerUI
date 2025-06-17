
// stores/userStore.js
import { defineStore } from 'pinia'
// import api from '@/services/api'
import axios from 'axios'
import api from '../apiClient'
export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        user: null,
        token: localStorage.getItem('token') || '', // Retrieve token from localStorage
        loading: false,
    }),

    actions: {

        // getAuthHeaders() {
        //     return {
        //         headers: {
        //             Authorization: `Bearer ${this.token}`
        //         }
        //     }
        // },


        async fetchUsers() {
            this.loading = true
            try {
                const response = await api.get('/users')

               // console.log( response )
                this.users = response.data.data
            } catch (error) {
                console.error('Error fetching users:', error)
            } finally {
                this.loading = false
            }
        },

        async fetchUser(id) {
            try {
                const response = await api.get(`/users/${id}`)
                this.user = response.data.data
            } catch (error) {
                console.error('Error fetching user:', error)
            }
        },

        async createUser(data) {
            try {
                // const response = await axios.post('/users', data)
                const response = await api.post('/users', data)
                this.fetchUsers()
                return response.data
            } catch (error) {
                console.error('Error creating user:', error)
                throw error
            }
        },

        async updateUser(id, data) {
          
            try {
           
                const response = await api.put(`/users/${id}`, data)
                this.fetchUsers()
                // return response.data
            } catch (error) {
                // console.error('Error updating user:', error)
                throw error
            }
        },

        async deleteUser(id) {
            try {
                await api.delete(`/users/${id}`)
                this.fetchUsers()
            } catch (error) {
                console.error('Error deleting user:', error)
            }
        },
    },
})









// import { defineStore } from 'pinia'
// import axios from 'axios'

// export const useUserStore = defineStore('userStore', {
//     state: () => ({
//         users: [],
//         user: { title: '', detail: '' },
//         token: localStorage.getItem('token') || '', // Retrieve token from localStorage
//         action: null
//     }),

//     actions: {
//         // Set the authorization headers
//         getAuthHeaders() {
//             return {
//                 headers: {
//                     Authorization: `Bearer ${this.token}`
//                 }
//             }
//         },


//         async fetchUsers() {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/user', this.getAuthHeaders())
//                 this.users = response.data
//                         } catch (error) {
//                 console.error('Error fetching events:', error.response?.data?.message || error.message)
//             }
//         },

//         // Fetch a single event by ID
//         async fetchEvent(id) {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/user/${id}`, this.getAuthHeaders())
//                 this.event = response.data
//             } catch (error) {
//                 console.error('Error fetching event:', error.response?.data?.message || error.message)
//             }
//         },

//         // Create a new event
//         async createEvent(eventData) {
//             try {
//                 const response = await axios.post('http://localhost:8000/api/user', eventData, this.getAuthHeaders())
//                 this.events.push(response.data.data)
//             } catch (error) {
//                 console.error('Error creating event:', error.response?.data?.message || error.message)
//             }
//         },

//         // Update an event
//         async updateEvent(id, eventData) {


//             try {
//                 await axios.patch(`http://localhost:8000/api/user/${id}`, eventData, this.getAuthHeaders())
//                 this.fetchEvents() // Refresh the event list
//             } catch (error) {
//                 console.error('Error updating event:', error.response?.data?.message || error.message)
//             }
//         },

//=====================================================================================


// async approveEvent(id, eventData) {
//      try {
//         await axios.patch(`http://localhost:8000/api/blogs/${id}`, eventData, this.getAuthHeaders())
//         this.fetchEvents() // Refresh the event list
//     } catch (error) {
//         console.error('Error updating event:', error.response?.data?.message || error.message)
//     }
// },


// async updateBookingEvent(id, eventData) {
//     try {
//         await axios.patch(`http://localhost:8000/api/user/${id}`, eventData, this.getAuthHeaders())
//         this.fetchEvents() // Refresh the event list
//     } catch (error) {
//         console.error('Error updating event:', error.response?.data?.message || error.message)
//     }
// },




// // Delete an event
// async deleteEvent(id) {

//     // console.log(id)
//     try {
//         await axios.delete(`http://localhost:8000/api/user/${id}`, this.getAuthHeaders())
//         this.events = this.events.filter(event => event.id !== id) // Remove event from state
//     } catch (error) {
//         console.error('Error deleting event:', error.response?.data?.message || error.message)
//     }
// },

// Logout and clear token
//         logout() {
//             this.token = ''
//             localStorage.removeItem('token')
//         }
//     }
// })
