import { defineStore } from 'pinia'
import apiClient from '@/apiClient' // <-- your axios instance
import { ref } from 'vue'

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref([])
  const expense = ref(null)
  const loading = ref(false)
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  })
  const filters = ref({
    from_date: null,
    to_date: null,
    min_amount: null,
    max_amount: null,
  })

  const fetchExpenses = async (page = 1) => {
    loading.value = true
    try {
      const params = {
        page,
        filter: { ...filters.value },
        include: 'category,paymentMethod',
        sort: '-date',
      }
      const res = await apiClient.get('/expenses', { params })
 
      expenses.value = res.data.data
      pagination.value = {
        current_page: res.data.meta.current_page,
        last_page: res.data.meta.last_page,
        per_page: res.data.meta.per_page,
        total: res.data.meta.total,
      }
    } catch (error) {
      console.error('Failed to fetch expenses', error)
    } finally {
      loading.value = false
    }
  }

  const getExpense = async (id) => {
    loading.value = true
    try {
      const res = await apiClient.get(`/expenses/${id}`)
      expense.value = res.data.data
    } catch (error) {
      console.error('Failed to get expense', error)
    } finally {
      loading.value = false
    }
  }

  const createExpense = async (data) => {
    loading.value = true
    try {
      const res = await apiClient.post('/expenses', data)
      await fetchExpenses(pagination.value.current_page)
      return res.data.data
    } catch (error) {
      console.error('Failed to create expense', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateExpense = async (id, data) => {
    loading.value = true
    try {
      const res = await apiClient.put(`/expenses/${id}`, data)
      await fetchExpenses(pagination.value.current_page)
      return res.data.data
    } catch (error) {
      console.error('Failed to update expense', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteExpense = async (id) => {
    loading.value = true
    try {
      await apiClient.delete(`/expenses/${id}`)
      await fetchExpenses(pagination.value.current_page)
    } catch (error) {
      console.error('Failed to delete expense', error)
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {
      from_date: null,
      to_date: null,
      min_amount: null,
      max_amount: null,
    }
  }

  return {
    expenses,
    expense,
    loading,
    pagination,
    filters,
    fetchExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense,
    setFilters,
    clearFilters,
  }
})
