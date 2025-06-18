<script setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en' // optional: for localized language like 'fr', 'es'
import { onMounted } from 'vue'
import { useExpenseStore } from '@/stores/expense'
import ExpenseChartCategory from '@/components/ExpenseChartCategory.vue'
import ExpenseChartDate from '@/components/ExpenseChartDate.vue'
import ExpenseChartMonth from '@/components/ExpenseChartMonth.vue'
import ExpenseChartYear from '@/components/ExpenseChartYear.vue'

dayjs.extend(relativeTime)
dayjs.locale('en') // optional


const formatTime = (time) => {
    return dayjs(time).fromNow()
}

const store = useExpenseStore()

onMounted(() => {
    store.fetchExpenses()
})


</script>

<template>
  <div class="flex items-center justify-center bg-gray-50">
    <div class="p-6 container">
      <h1 class="text-3xl font-bold text-center mb-6">Expense Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ExpenseChartCategory />
        <ExpenseChartDate />
        <ExpenseChartMonth />
        <ExpenseChartYear />
      </div>
    </div>
  </div>
</template>


<style scoped>
.chart-cardx {
  width: 100%;
  height: 300px; /* reduced from 400px */
  padding: 0.75rem; /* reduced padding */
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>