<template>
  <div class="chart-card">
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useExpenseStore } from '@/stores/expense'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const store = useExpenseStore()

const data = computed(() => store.chartDataByMonth)
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Expenses by Month',
    },
  },
  scales: {
    x: {
      title: { display: true, text: 'Month' },
    },
    y: {
      title: { display: true, text: 'Amount' },
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
