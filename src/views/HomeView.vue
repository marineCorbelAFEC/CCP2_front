<template>
  <div>
    <h1>Bienvenue</h1>
    <LoginForm />
    <router-link to="/missions">Voir les missions</router-link>
  </div>
</template>

<script setup>
import LoginForm from '../views/LoginView.vue';
</script>
