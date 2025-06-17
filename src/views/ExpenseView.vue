// ExpenseView.vue
<script setup>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ExpenseComponent from '@/components/ExpenseComponent.vue'
import ExpenseModal from '@/components/ExpemseModal.vue'
import ShowExpenseModal from '@/views/ShowExpense.vue'
import SummaryExpenseModal from '@/views/ExpenseOverView.vue'

const showModal = ref(false)
const isEdit = ref(false)
const selectedExpense = ref(null)
const refreshKey = ref(0)


const showViewModal = ref(false)
const showSummaryModal = ref(false)

function openModal({ isEdit: editMode, expense }) {
  isEdit.value = editMode
  selectedExpense.value = expense
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function handleSaved() {
  refreshKey.value++
  closeModal()
}


function openViewModal(expense) {
  selectedExpense.value = expense
  showViewModal.value = true
}

function openSummaryModal(expense) {
  selectedExpense.value = expense
  showSummaryModal.value = true
}

function closeViewModal() {
  showViewModal.value = false
  selectedExpense.value = null
}

function closeSummaryModal() {
  showSummaryModal.value = false
  selectedExpense.value = null
}


</script>

<template>
  <DefaultLayout>
    <div>
      <ExpenseComponent :refreshKey="refreshKey" @open-modal="openModal" @view-expense="openViewModal"
        @show-summary="openSummaryModal" />

      <ExpenseModal v-if="showModal" :isEdit="isEdit" :expense="selectedExpense" @close="closeModal"
        @saved="handleSaved" />



      <!-- <ShowExpenseModal
      :expense="selectedExpense"
      :show="showViewModal"
      @close="closeViewModal"
    /> -->

      <SummaryExpenseModal :expense="selectedExpense" :show="showSummaryModal" @close="closeSummaryModal" />



    </div>







  </DefaultLayout>
</template>