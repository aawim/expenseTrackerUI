// ExpenseComponent.vue
<script setup>
import { reactive, ref, watch, onMounted, computed } from 'vue'
import { useExpenseStore } from '@/stores/expense'

const props = defineProps({
    refreshKey: Number,
})



const emit = defineEmits(['open-modal', 'view-expense'])

const expenseStore = useExpenseStore()
const filters = reactive({ ...expenseStore.filters })
const expenses = ref([])
const pagination = ref({})
const loading = ref(false)

const summaryCategory = ref(null)


async function fetchExpenses(page = 1) {
    loading.value = true
    try {
        expenseStore.setFilters(filters)
        await expenseStore.fetchExpenses(page)
        expenses.value = expenseStore.expenses
        pagination.value = expenseStore.pagination
    } finally {
        loading.value = false
    }
}

function applyFilters() {
    fetchExpenses(1)
}

function clearFilters() {
    Object.assign(filters, {
        from_date: null,
        to_date: null,
        min_amount: null,
        max_amount: null,
    })
    fetchExpenses(1)
}

function openCreate() {
    emit('open-modal', { isEdit: false, expense: null })
}

function openEdit(expense) {
    emit('open-modal', { isEdit: true, expense })
}


// New: View expense details
function viewExpense(expense) {
    emit('view-expense', expense)
}

// New: Show summary (you can decide what summary means here)
function showSummary(expense) {
    summaryCategory.value = expense.category
}


async function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return
    loading.value = true
    try {
        await expenseStore.deleteExpense(id)
        fetchExpenses(pagination.value.current_page)
    } catch (error) {
        alert('Failed to delete expense')
    } finally {
        loading.value = false
    }
}

watch(() => props.refreshKey, () => {
    fetchExpenses(pagination.value.current_page)
})

onMounted(() => {
    fetchExpenses()
})

// ** this computes the total amount:**
const totalAmount = computed(() => {
    return expenses.value.reduce((sum, expense) => sum + Number(expense.amount || 0), 0)
})



// Summary data
const categorySummary = computed(() => {
    if (!summaryCategory.value) return null

    const filtered = expenses.value.filter(
        e => e.category?.id === summaryCategory.value.id
    )

    const total = filtered.reduce((sum, e) => sum + Number(e.amount || 0), 0)

    return {
        category: summaryCategory.value.name,
        total,
        count: filtered.length,
    }
})




</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <form @submit.prevent="applyFilters" class="mb-4 flex flex-wrap gap-3">
            <input type="date" v-model="filters.from_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <input type="date" v-model="filters.to_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <input type="number" v-model.number="filters.min_amount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="0" step="0.01" />
            <input type="number" v-model.number="filters.max_amount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="0" step="0.01" />
            <button type="submit" class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Apply</button>
            <button type="button" @click="clearFilters"
                class="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400">Clear</button>
        </form>

        <button @click="openCreate" class="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Expense
        </button>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr class="bg-gray-100">
                    <th class="px-3 py-4 w-25">Date</th>
                    <th class="px-3 py-1 w-10">Amount</th>
                    <th class="px-3 py-1 w-20">Category</th>
                    <th class="px-3 py-1 w-30">Payment Method</th>
                    <th class="px-3 py-1 w-100">Description</th>
                    <th class="px-3 py-1 w-50 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loading">
                    <td colspan="6" class="text-center py-4">Loading...</td>
                </tr>
                <tr v-else-if="expenses.length === 0">
                    <td colspan="6" class="text-center py-4">No expenses found.</td>
                </tr>
                <tr v-else v-for="item in expenses" :key="item.id" class="odd:bg-white even:bg-gray-100">
                    <td class="px-3 py-1">{{ item.date }}</td>
                    <td class="px-3 py-1">{{ Number(item.amount).toFixed(2) }}</td>
                    <td class="px-3 py-1">{{ item.category?.name || '-' }}</td>
                    <td class="px-3 py-1">{{ item.payment_method?.name || '-' }}</td>
                    <td class="px-3 py-1">{{ item.description || '-' }}</td>
                    <td class="px-3 py-1 space-x-2  text-center">
                        
                        <button @click="openEdit(item)"
                            class="inline-flex items-center justify-center w-8 h-8 mr-2 text-green-100 transition-colors duration-150 bg-green-600 rounded-full focus:shadow-outline hover:bg-green-700"
                            title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5h2m-1 0v2m-7.88 6.71a4 4 0 010-5.66L12 3l5.88 5.88a4 4 0 010 5.66L12 21l-8.88-8.88z" />
                            </svg>
                        </button>

                        <button @click="deleteExpense(item.id)"
                            class="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-full focus:shadow-outline hover:bg-pink-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </button>

                        <button @click="showSummary(item)"
                            class="inline-flex items-center justify-center w-8 h-8 mr-2 text-purple-100 transition-colors duration-150 bg-purple-600 rounded-full focus:shadow-outline hover:bg-purple-700"
                            title="Summary">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 17v-6a2 2 0 114 0v6m4 0V9a2 2 0 10-4 0v8M5 17v-3a2 2 0 114 0v3" />
                            </svg>
                        </button>


                    </td>
                </tr>
            </tbody>
        </table>
        <div class="mt-2 mb-4 text-right font-semibold text-lg">
            Total: {{ totalAmount.toFixed(2) }}
        </div>

        <!-- Summary Box -->
        <div v-if="categorySummary" class="mt-4 p-4 bg-purple-100 rounded border border-purple-300">
            <h3 class="text-purple-800 font-semibold mb-2">Summary for Category: {{ categorySummary.category }}</h3>
            <p><strong>Total Amount:</strong> {{ categorySummary.total.toFixed(2) }}</p>
            <p><strong>Total Entries:</strong> {{ categorySummary.count }}</p>
            <button @click="summaryCategory = null" class="mt-2 text-sm text-purple-600 hover:underline">Close
                Summary</button>
        </div>
        <!-- Pagination -->
        <div class="mt-3 flex justify-center space-x-2">
            <button :disabled="pagination.current_page <= 1 || loading"
                @click="fetchExpenses(pagination.current_page - 1)"
                class="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
            <span class="px-3 py-1 border rounded">Page {{ pagination.current_page }} of {{ pagination.last_page
                }}</span>
            <button :disabled="pagination.current_page >= pagination.last_page || loading"
                @click="fetchExpenses(pagination.current_page + 1)"
                class="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
    </div>
</template>