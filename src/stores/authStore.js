import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
const error = ref(null);
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || '',  // Store token in localStorage for persistence
        error: null,
        errorMessage: null,
        permissions: [],
        roles: [],
        // isAuthenticated: false
    }),

    actions: {

        async login(credentials) {
            try {
                await axios.get('http://localhost:8000/sanctum/csrf-cookie');
                const response = await axios.post('http://localhost:8000/api/login', credentials);

                if (response.status === 200) {
                    this.token = response.data.token || response.data.data.token;

                    // Save token to local storage
                    localStorage.setItem('token', this.token);
                    // this.isAuthenticated = true

                    if (response.data.user) {
                        this.user = response.data.user;
                        this.roles = this.user.roles || [];

                        // Extract direct permissions
                        const directPermissions = this.user.permissions || [];

                        // Extract permissions from roles
                        const rolePermissions = this.roles.flatMap(role =>
                            Array.isArray(role.permissions) ? role.permissions : []
                        );

                        // Merge and deduplicate permissions
                        const allPermissions = [...new Set([
                            ...directPermissions.map(p => p.name),
                            ...rolePermissions.map(p => p.name)
                        ])];

                        this.permissions = allPermissions;

                        // Save user to localStorage
                        localStorage.setItem('user', JSON.stringify(this.user));
                    }

                    // Redirect
                    window.location.href = '/expenses';
                }

            } catch (err) {
                const errorMessage = err.response?.data?.message ||
                    err.response?.data?.error ||
                    err.message || "Login failed";

                throw new Error(errorMessage);
            }
        },

        async logout() {
            try {
                // Send logout request to Laravel API (clear session or token)
                await axios.post('http://localhost:8000/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    }
                })

                // Clear the token and user data after logout
                this.token = ''
                this.user = null
                localStorage.removeItem('token')  // Remove token from localStorage
                localStorage.removeItem('user')  // Remove token from localStorage
                // this.isAuthenticated = false // remove is authenticated state
                window.location.href = '/login'
            } catch (error) {
                console.error('Logout failed', error)
            }
        },

        // async fetchUser() {
        //     if (this.token) {
        //         try {
        //             const response = await axios.get('http://localhost:8000/api/user', {
        //                 headers: { Authorization: `Bearer ${this.token}` }
        //             });

        //             this.user = response.data.user;
        //             this.roles = this.user.roles || [];

        //             const directPermissions = this.user.permissions || [];



        //             const rolePermissions = this.roles.flatMap(role =>
        //                 Array.isArray(role.permissions) ? role.permissions : []
        //             );

        //             // Merge and deduplicate permission names
        //             const allPermissions = [...new Set([
        //                 ...directPermissions.map(p => p.name),
        //                 ...rolePermissions.map(p => p.name)
        //             ])];

        //             this.permissions = allPermissions;

        //         } catch (error) {
        //             this.token = '';
        //             localStorage.removeItem('token');
        //         }
        //     }
        // }

        async fetchUser() {
            if (this.token) {
                try {
                    const response = await axios.get('http://localhost:8000/api/user', {
                        headers: { Authorization: `Bearer ${this.token}` }
                    });

                    // this.user = response.data.user;

                    const directPermissions = this.user.permissions || [];
                    const rolePermissions = this.user.roles?.flatMap(role =>
                        Array.isArray(role.permissions) ? role.permissions : []
                    ) || [];

                    // Merge and deduplicate
                    const allPermissions = [...new Set([
                        ...directPermissions.map(p => p.name),
                        ...rolePermissions.map(p => p.name)
                    ])];

                    this.permissions = allPermissions;
                    // this.roles = this.user.roles;

                } catch (error) {
                    this.token = '';
                    localStorage.removeItem('token');
                }
            }
        }




    },
    getters: {
        hasRole: (state) => (roleName) => {
            return state.user?.roles?.some(role => role.name === roleName);
        },

        hasPermission: (state) => (permissionName) => {
            const directPermissions = state.user?.permissions || [];
            const rolePermissions = state.user?.roles?.flatMap(role => role.permissions || []) || [];

            // Collect all permissions and deduplicate by name
            const allPermissions = new Set([
                ...directPermissions.map(p => p.name),
                ...rolePermissions.map(p => p.name),
            ]);

            return allPermissions.has(permissionName);
        },

        isAuthenticated: (state) => {
            return !!state.token && !!state.user;
        }

    }

})
