<template>
  <div id="app">
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="login">
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
          <button type="submit">Login</button>
        </form>
        <p class="switch-link">
          Don't have an account?
          <router-link to="/register" class="button-link">Register</router-link>
        </p>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script
  lang="ts"
  src="../../controllers/AuthControllers/LoginController.ts"
></script>

<style src="../../styles/LoginStyle.css"></style>
