<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignUp">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authentication'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const router = useRouter()

const handleSignUp = async () => {
  try {
    await authStore.signup(username.value, password.value)
  } catch (error) {
    console.error(error)
    alert('Signup failed')
  }
}
</script>
