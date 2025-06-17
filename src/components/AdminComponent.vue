<script setup>
import { ref, onMounted } from 'vue'
const bookingStore = useBookingStore()
import { useEventStore } from '../stores/eventStore'
const eventStore = useEventStore()
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
onMounted(() => {
  eventStore.fetchAllEvents()  // Fetch events on component mount
  bookingStore.fetchAllBookings()
})


const approveEvent = async (event) => {
  try {
    await eventStore.approveEvent(event.id);
    eventStore.fetchAllEvents() 
  } catch (error) {
    console.error('Failed to fetch admission details:', error);
  }
};

const approveBooking = async (book) => {
  try {
    await bookingStore.approveBooking(book.id);
    bookingStore.fetchAllBookings()

  } catch (error) {
    console.error('Failed to fetch admission details:', error);
  }
};

</script>



<template>
    <div>Admin View

       

    </div>

</template>