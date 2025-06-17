<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// State
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
});

const error = ref(null);
const router = useRouter();

// Register function
const register = async () => {
  try {
    error.value = null; // Reset error
    const response = await axios.post("http://localhost:8000/api/register", form.value);
    // console.log(response.data.token)
    // Store token in localStorage
    // localStorage.setItem("token", response.data.data.token);
    // // Redirect user
    // router.push("/");


             if (response.data.token) {
                    // Assuming your API returns token in response.data.token
                    // (adjust according to your actual API response structure)
                  const token = response.data.token;

                    // Save token to localStorage
                    localStorage.setItem('token', token);

                    // Optionally save user data if returned
                    if (response.data.user) {
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                    }

                    // Redirect
                    window.location.href = '/';
                }



  } catch (err) {
    error.value = err.response?.data?.message || "Registration failed";
  }
};

 
</script>

<template>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
   
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register new account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6 max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg" @submit.prevent="register">

      <div>
        <label for="name" class="block text-sm/6 font-medium text-gray-900">User name</label>
        <div class="">
          <input type="text" v-model="form.name" name="name" id="name" autocomplete="name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="">
          <input type="email" v-model="form.email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          </div>
        <div class="">
          <input type="password" v-model="form.password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>


           <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">password_confirmation</label>
          </div>
        <div class="">
          <input type="password" v-model="form.password_confirmation" name="password_confirmation" id="password_confirmation" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

       <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
     
       <div class="text-sm mt-5 ">
            <router-link class="font-semibold text-indigo-600 hover:text-indigo-500 " to="/login">Login</router-link>
          </div>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
     
     
      </div>
    </form>

    
  
 
  </div>
</div>



</template>