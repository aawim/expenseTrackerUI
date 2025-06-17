// stores/expense.js
import { defineStore } from 'pinia'
import apiClient from '@/apiClient'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

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

  const chartDataByCategory = computed(() => {
    const categoryTotals = {}

    expenses.value.forEach((expense) => {
      const category = expense.category?.name || 'Uncategorized'
      const amount = parseFloat(expense.amount)
      categoryTotals[category] = (categoryTotals[category] || 0) + amount
    })

    return {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: 'Total Expense by Category',
          backgroundColor: [
            '#f87171', '#60a5fa', '#34d399',
            '#fbbf24', '#a78bfa', '#fb7185',
          ],
          data: Object.values(categoryTotals),
        },
      ],
    }
  })

  const chartDataByDate = computed(() => {
    const dateTotals = {}

    expenses.value.forEach((expense) => {
      const date = expense.date // assuming it's in YYYY-MM-DD format
      const amount = parseFloat(expense.amount)
      dateTotals[date] = (dateTotals[date] || 0) + amount
    })

    const sortedDates = Object.keys(dateTotals).sort()

    return {
      labels: sortedDates,
      datasets: [
        {
          label: 'Total Expense by Date',
          backgroundColor: '#60a5fa',
          borderColor: '#3b82f6',
          borderWidth: 2,
          fill: true,
          data: sortedDates.map(date => dateTotals[date]),
        },
      ],
    }
  })

  // Group by Month (e.g., "2025-06")
  const chartDataByMonth = computed(() => {
    const monthlyTotals = {}

    expenses.value.forEach((expense) => {
      const month = dayjs(expense.date).format('YYYY-MM') // e.g., "2025-06"
      const amount = parseFloat(expense.amount)
      monthlyTotals[month] = (monthlyTotals[month] || 0) + amount
    })

    const sortedMonths = Object.keys(monthlyTotals).sort()

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'Total Expense by Month',
          backgroundColor: '#facc15',
          borderColor: '#eab308',
          fill: true,
          data: sortedMonths.map((m) => monthlyTotals[m]),
        },
      ],
    }
  })

  // Group by Year (e.g., "2025")
  const chartDataByYear = computed(() => {
    const yearlyTotals = {}

    expenses.value.forEach((expense) => {
      const year = dayjs(expense.date).format('YYYY')
      const amount = parseFloat(expense.amount)
      yearlyTotals[year] = (yearlyTotals[year] || 0) + amount
    })

    const sortedYears = Object.keys(yearlyTotals).sort()

    return {
      labels: sortedYears,
      datasets: [
        {
          label: 'Total Expense by Year',
          backgroundColor: '#4ade80',
          borderColor: '#22c55e',
          fill: true,
          data: sortedYears.map((y) => yearlyTotals[y]),
        },
      ],
    }
  })

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
    chartDataByCategory, // <- chart data
    chartDataByDate,
    chartDataByMonth,
    chartDataByYear,
  }
})
