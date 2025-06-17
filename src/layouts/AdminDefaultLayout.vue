<script setup lang="ts">
// import HeaderArea from '@/components/Header/HeaderArea.vue'
// import SidebarArea from '@/components/Sidebar/SidebarArea.vue'
</script>

<template>
  <!-- ===== Page Wrapper Start ===== -->
  <div class="flex h-screen overflow-hidden ">
    <!-- ===== Sidebar Start ===== -->
    <!-- <SidebarArea /> -->
    <p>Side bar</p>
    <!-- ===== Sidebar End ===== -->

    <!-- ===== Content Area Start ===== -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
      <!-- ===== Header Start ===== -->
      <!-- <HeaderArea /> -->
       <p>Header</p>
      <!-- ===== Header End ===== -->

      <!-- ===== Main Content Start ===== -->
      <main class="flex flex-col lg:flex-row gap-4 mt-4 ml-4 mr-4 ">
        <!-- Main Column -->
        <div
          class="w-full flex-1 bg-white p-4 md:p-6 2xl:p-4 shadow rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white">
          <slot name="default"></slot>
        </div>

        <aside
          class="w-full lg:w-1/12 bg-gray-50 md:p-2 2xl:p-2 shadow rounded-md mr-4 mt-1 lg:mt-0 dark:border-strokedark dark:bg-boxdark dark:text-white">
          <slot name="working">
            <div class="p-4">
              <h2 class="text-xl font-semibold dark:text-gray-200">Active Task(s)</h2>
              <hr class="mt-2 border-t-2 border-gray-300 dark:border-gray-700 opacity-75">
            </div>
          </slot>
        </aside>

        <!-- Secondary Column -->
        <aside
          class="w-full lg:w-1/3 bg-gray-50 md:p-6 2xl:p-4 shadow rounded-md lg:ml-[-15px] mr-4 mt-1 lg:mt-0 dark:border-strokedark dark:bg-boxdark dark:text-white">
          <slot name="detail">
          </slot>
        </aside>


      </main>
      <!-- ===== Main Content End ===== -->
    </div>
  </div>
  <!-- ===== Page Wrapper End ===== -->
</template>
