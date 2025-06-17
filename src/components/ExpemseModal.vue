<script setup>
import { ref, watch, onMounted  } from 'vue'
import { useExpenseStore } from '@/stores/expense'
import apiClient from '@/apiClient' // <-- your axios instance

const props = defineProps({
  isEdit: Boolean,
  expense: Object,
  categories: Array,
  paymentMethods: Array,
})

const emit = defineEmits(['close', 'saved'])

const expenseStore = useExpenseStore()
const loading = ref(false)


const form = ref({
  id: null,
  date: '',
  amount: null,
  category_id: null,
  payment_method_id: null,
  description: '',
})


const categories = ref([])
const paymentMethods = ref([])

async function loadDropdownData() {
  try {
    const [catRes, methodRes] = await Promise.all([
      apiClient.get('/categories'),
      apiClient.get('/payment-methods'),
    ])
    categories.value = catRes.data.data
    paymentMethods.value = methodRes.data.data
  } catch (e) {
    console.error('Failed to load dropdowns:', e)
  }
}


watch(
  () => props.expense,
  (val) => {
    if (val) {
      form.value.id = val.id
      form.value.date = val.date
      form.value.amount = val.amount
      form.value.category_id = val.category?.id || null
      form.value.payment_method_id = val.payment_method?.id || null
      form.value.description = val.description || ''
    } else {
      form.value.id = null
      form.value.date = ''
      form.value.amount = null
      form.value.category_id = null
      form.value.payment_method_id = null
      form.value.description = ''
    }
  },
  { immediate: true }
)

onMounted(loadDropdownData)

async function submitForm() {
  loading.value = true
  try {
    if (props.isEdit) {
      await expenseStore.updateExpense(form.value.id, {
        date: form.value.date,
        amount: form.value.amount,
        category_id: form.value.category_id,
        payment_method_id: form.value.payment_method_id,
        description: form.value.description,
      })
    } else {
      await expenseStore.createExpense({
        date: form.value.date,
        amount: form.value.amount,
        category_id: form.value.category_id,
        payment_method_id: form.value.payment_method_id,
        description: form.value.description,
      })
    }
    emit('saved')
  } catch (error) {
    alert('Failed to save expense.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

    <div class="bg-white rounded p-6 w-full max-w-lg relative">
      <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit Expense' : 'Add Expense' }}</h2>

      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="block mb-1 font-medium">Date</label>
          <input type="date" v-model="form.date" required class="border px-2 py-1 rounded w-full" />
        </div>

        <div class="mb-3">
          <label class="block mb-1 font-medium">Amount</label>
          <input type="number" v-model.number="form.amount" required min="0" step="0.01"
            class="border px-2 py-1 rounded w-full" />
        </div>

        <!-- Category Dropdown -->
        <div class="mb-3">
          <label class="block mb-1 font-medium">Category</label>
          <select v-model="form.category_id" required class="border px-2 py-1 rounded w-full">
            <option value="" disabled>Select a category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>

        <!-- Payment Method Dropdown -->
        <div class="mb-3">
          <label class="block mb-1 font-medium">Payment Method</label>
          <select v-model="form.payment_method_id" required class="border px-2 py-1 rounded w-full">
            <option value="" disabled>Select a method</option>
            <option v-for="method in paymentMethods" :key="method.id" :value="method.id">{{ method.name }}</option>
          </select>
        </div>



        <div class="mb-3">
          <label class="block mb-1 font-medium">Description</label>
          <textarea v-model="form.description" rows="3" class="border px-2 py-1 rounded w-full"
            placeholder="Description (optional)"></textarea>
        </div>

        <div class="flex justify-end space-x-3 mt-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded hover:bg-gray-100"
            :disabled="loading">
            Cancel
          </button>
          <button type="submit" :disabled="loading" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>

      <button @click="$emit('close')" class="absolute top-2 right-3 text-gray-600 hover:text-gray-900" title="Close">
        ✕
      </button>
    </div>
  </div>
</template>


