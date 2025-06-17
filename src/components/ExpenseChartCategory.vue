<!-- components/ExpenseChartCategory.vue -->
<template>
  <div class="chart-card">
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useExpenseStore } from '@/stores/expense'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useExpenseStore()

const data = computed(() => store.chartDataByCategory)
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Expenses by Category',
    },
    legend: {
      display: false,
    },
  },
}
</script>

<style scoped>
.chart-card {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
</style>
