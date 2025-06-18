<script setup>

</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- Hero Section -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        <!-- Text content -->
        <div class="flex-1 text-center lg:text-left">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Track Your Expenses <br class="hidden md:block" />
            With Ease & Clarity
          </h1>
          <p class="text-lg mb-8 text-gray-600">
            Stay on top of your finances. Manage your spending, set budgets, and save smarter with our simple, powerful expense tracker.
          </p>
          <router-link
            to="/register"
            class="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
          >
            Get Started Free
          </router-link>
        </div>

        <!-- Image -->
        <div class="flex-1">
          <img
            src="../../public/images/home.png"
            alt="Expense tracker hero"
            class="w-full rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-gray-100 py-20">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-semibold mb-6">Why Choose Our Expense Tracker?</h2>
        <p class="text-gray-600 mb-12">
          Designed to make budgeting and financial planning easy and stress-free.
        </p>

        <div class="grid gap-10 md:grid-cols-3">
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div class="text-purple-600 text-4xl mb-4">
              💰
            </div>
            <h3 class="font-semibold text-xl mb-2">Track Spending</h3>
            <p class="text-gray-600">
              Instantly log and categorize expenses from any device.
            </p>
          </div>

          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div class="text-purple-600 text-4xl mb-4">
              📊
            </div>
            <h3 class="font-semibold text-xl mb-2">Budget Insights</h3>
            <p class="text-gray-600">
              Get daily, monthly, early and categories visual summaries.
            </p>
          </div>

          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div class="text-purple-600 text-4xl mb-4">
              🔒
            </div>
            <h3 class="font-semibold text-xl mb-2">Secure & Private</h3>
            <p class="text-gray-600">
              Your financial data is encrypted and 100% secure.
            </p>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>




