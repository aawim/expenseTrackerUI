<!-- components/GenericChart.vue -->
<template>
  <div class="w-full max-w-4xl mx-auto p-4 bg-white rounded-xl shadow" :style="{ height: '400px' }">
    <component :is="chartType" :data="data" :options="options" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Line, Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, PointElement, CategoryScale, LinearScale)

defineProps({
  data: Object,
  options: Object,
  chartType: {
    type: [String, Object],
    default: Bar,
  },
})
</script>
