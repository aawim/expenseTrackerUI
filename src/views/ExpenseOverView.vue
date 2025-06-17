<script setup>
const props = defineProps({
  expense: Object,
  show: Boolean,
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white rounded p-6 max-w-md w-full shadow-lg relative">
      <button class="absolute top-2 right-2 text-gray-600 hover:text-gray-900" @click="close">✕</button>
      <h2 class="text-xl font-bold mb-4">Expense Summary</h2>
      <!-- Example summary content -->
      <p><strong>Date:</strong> {{ expense.date }}</p>
      <p><strong>Amount:</strong> {{ Number(expense.amount).toFixed(2) }}</p>
      <p><strong>Category:</strong> {{ expense.category?.name || '-' }}</p>
      <p><strong>Payment Method:</strong> {{ expense.payment_method?.name || '-' }}</p>
      <p><strong>Description:</strong> {{ expense.description || '-' }}</p>
      <hr class="my-4" />
      <p><em>This could include aggregated info or custom summary data.</em></p>
    </div>
  </div>
</template>
