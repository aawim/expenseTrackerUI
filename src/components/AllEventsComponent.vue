<script setup>
import { ref, onMounted } from 'vue'
import { useEventStore } from '../stores/eventStore'
import EventBookModal from '../components/EventBookModal.vue'

import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()


const eventStore = useEventStore()
const showModal = ref(false)


onMounted(() => {
  eventStore.fetchAllEvents()  // Fetch events on component mount
})
 
const editEvent = async (event) => {
  try {
    await eventStore.fetchEvent(event.id);
    if (eventStore.event) {
      showModal.value = true
    }
  } catch (error) {
    console.error('Failed to fetch admission details:', error);
  }
};


</script>



<template>
    <div>
        
        All Events
        <div v-if="eventStore.allEvents.length > 0" > 
               <div class="relative overflow-x-auto mt-5">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Event name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                              <th scope="col" class="px-6 py-3">
                                Slots
                            </th>

                            <th scope="col" class="px-4 py-3">
                                Description
                            </th>
                            <th scope="col">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="event in eventStore.allEvents" :key="event.id"
                            class="bg-white ">
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {{ event.title }} 
                            </th>
                            <td class="px-6 py-4">
                                {{ event.location }} 
                            </td>
                            <td class="px-6 py-4">
                                {{ event.date }} 
                            </td>
                     
                            <td class="px-6 py-4">
                                {{ event.alocations }} 
                            </td>

                            <td class="px-4 py-4">
                                {{ event.description }} 
                            </td>
                            <td class="px-6 py-4 text-right">
                          
                       <span v-if="authStore.token"> 

                        <button @click="editEvent(event)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full">
                        Book now
                        </button>
                       </span>         
                       <span v-else>
                      <router-link
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full"
                            to="/login"> Book now</router-link>
                    
                    </span>


                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <!-- <p v-else>No bookings found.</p> -->
    </div>

    <EventBookModal v-if="showModal" @close="showModal = false" />


    </div>
</template>