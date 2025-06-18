<script setup lang="ts">
import HeaderArea from '@/components/HeaderArea.vue'
// import SidebarArea from '@/components/Sidebar/SidebarArea.vue'
</script>

<template>
  <!-- ===== Page Wrapper Start ===== -->
  <div class="flex h-screen overflow-hidden">
    <!-- ===== Content Area Start ===== -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <!-- ===== Header Start ===== -->
      <HeaderArea />
      <!-- ===== Header End ===== -->

      <!-- ===== Main Content Start ===== -->
      <main class="flex flex-col lg:flex-row gap-4 mt-4 ml-4 mr-4">
        <div class="w-full flex-1 bg-white p-4 md:p-6 2xl:p-4 dark:border-strokedark dark:bg-boxdark dark:text-white">
          <slot name="default"></slot>
        </div>
      </main>
      <!-- ===== Main Content End ===== -->

      <!-- ===== Footer Start ===== -->
      <footer class="mt-auto bg-gray-100 text-center py-4 text-sm text-gray-600 shadow-inner">
        &copy; {{ new Date().getFullYear() }} Expense Traker. All rights reserved.
      </footer>
      <!-- ===== Footer End ===== -->

    </div>
  </div>
  <!-- ===== Page Wrapper End ===== -->
</template>
