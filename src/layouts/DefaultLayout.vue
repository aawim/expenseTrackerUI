<script setup lang="ts">
 import HeaderArea from '@/components/HeaderArea.vue'
// import SidebarArea from '@/components/Sidebar/SidebarArea.vue'
</script>

<template>
  <!-- ===== Page Wrapper Start ===== -->
  <div class="flex h-screen overflow-hidden ">

    <!-- ===== Content Area Start ===== -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
      <!-- ===== Header Start ===== -->
      <HeaderArea />
      <!-- ===== Header End ===== -->

      <!-- ===== Main Content Start ===== -->
      <main class="flex flex-col lg:flex-row gap-4 mt-4 ml-4 mr-4 ">
        <!-- Main Column -->

        <!-- <div class="w-full flex-1 bg-white p-4 md:p-6 2xl:p-4 shadow rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"> -->


        <div  class="w-full flex-1 bg-white p-4 md:p-6 2xl:p-4 dark:border-strokedark dark:bg-boxdark dark:text-white">
          <slot name="default"></slot>
        </div>
      </main>
      <!-- ===== Main Content End ===== -->
    </div>
  </div>
  <!-- ===== Page Wrapper End ===== -->





   
</template>
