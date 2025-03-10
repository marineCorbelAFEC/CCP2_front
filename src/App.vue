<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authentication.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isLogged = computed(() => authStore.isAuthenticated);

const handleAuthAction = async () => {
  if (isLogged.value) {
    await authStore.logout();
    router.push('/login');
  } else {
    router.push('/login');
  }
};
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/about">À propos</router-link>
      <button @click="handleAuthAction">
        {{ isLogged ? 'Se déconnecter' : 'Se connecter' }}
      </button>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #f5f5f5;
  align-items: center;
}
nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
nav a.router-link-exact-active {
  color: #42b983;
}
button {
  margin-left: auto;
  padding: 5px 10px;
  border: none;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: #36976b;
}
</style>
