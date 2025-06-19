<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import EventModal from '@/components/EventModal.vue'

const userStore = useUserStore()
//console.log(userStore.users)

onMounted(() => {
    userStore.fetchUsers()  // Fetch user on component mount
})


</script>
<template>
    <div class="px-6 py-4 lg:px-8">
        <h2 class="text-2xl font-bold mb-4">My Bookings</h2>
        <div v-if="1">
            <div class="relative overflow-x-auto shadow-md">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                                           
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="user in userStore.users" :key="user.id"

                            class="bg-white dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-100">
                            <th scope="row"
                                class="px-6 py-4 font-medium  whitespace-nowrap ">
                                {{ user.name }}
                            </th>
                            <td class="px-6 py-4">
                               {{ user.email }}
                            </td>
                       
                       
                      
                            <td class="px-6 py-4 text-right">

                        <span v-if="user.status === 'Pending'">

                    


                            <button @click="cancelBooking(user)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full">
                                Cancel
                        </button>


                            </span>
                                                    
                            <span v-else>
                                Completed
                            </span>


                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>



            <!-- <li v-for="booking in bookingStore.bookings" :key="booking.id" class="border p-3 rounded mb-2">

        {{ booking.user_id }}
        <p> Title: <span class="font-semibold"> {{ event.title }} </span> </p>
        <p>Date: {{ event.date }}</p>
        <p>Location: {{ event.location }}</p>
        <p>Description: {{ event.description }}</p>
        <p>Slots: {{ event.alocations }}</p>
        <button @click="deleteEvent(event.id)">Delete</button>
        <button @click="editEvent(event)">Edit</button>

        
      </li> -->
        </div>
        <p v-else>No bookings found.</p>

        <!-- Modal -->
        <EventModal v-if="showModal" @close="showModal = false" />

    </div>



</template>