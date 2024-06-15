<template>
  <div id="app">
    <div class="register-container">
      <div class="register-box">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <div class="input-group">
            <label for="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              v-model="form.firstname"
              required
            />
          </div>
          <div class="input-group">
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" v-model="form.lastname" required />
          </div>
          <div class="input-group">
            <label for="job">Job</label>
            <input type="text" id="job" v-model="form.job" required />
          </div>
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p class="switch-link">
          Already have an account?
          <router-link to="/login" class="button-link">Login</router-link>
        </p>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script
  lang="ts"
  src="@/controllers/AuthControllers/RegisterController.ts"
></script>

<style src="@/styles/RegisterStyle.css"></style>
