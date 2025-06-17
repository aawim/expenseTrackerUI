<script setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en' // optional: for localized language like 'fr', 'es'
import { onMounted } from 'vue'



dayjs.extend(relativeTime)
dayjs.locale('en') // optional


const formatTime = (time) => {
    return dayjs(time).fromNow()
}

</script>

<template>
    <div>
        <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <div class="border-b mb-5 flex justify-between text-sm">
                <div class="text-indigo-600 flex items-center pb-2 pr-2   uppercase">
                </div>
                <a href="#">See All</a>
            </div>
        </div>
    </div>
</template>