<!-- src/components/ExpenseChart.vue -->
<template>
  <div class="w-full max-w-4xl mx-auto p-4 bg-white rounded-xl shadow" style="height: 400px;">
    <BarChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useExpenseStore } from '@/stores/expense'

// ✅ Chart.js core registration
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar as BarChart } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// ✅ Get chart data from Pinia store
const store = useExpenseStore()

// This computed ensures reactivity
const chartData = computed(() => store.chartDataByCategory)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Expenses by Category',
    },
  },
}
</script>
