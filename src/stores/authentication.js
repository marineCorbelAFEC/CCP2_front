import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
export const useAuthStore = defineStore('authStore', {
  state: () => ({ user: useLocalStorage('user', null) }),

  actions: {
    async login(email, password) {
      const response = await fetch(`${import.meta.env.baseUrl}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const user = await response.json();

      this.user = user;
    },

    async signup(username, password) {
      const response = await fetch(`${import.meta.env.baseUrl}/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        this.user = await response.json();
      } else {
        console.error('Signup failed', response);
        throw new Error('nup failed');
      }
    },

    async logout() {
      await fetch(`${import.meta.env.baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      this.user = null;
    },
    async fetchUser() {
      const res = await fetch(`${import.meta.env.baseUrl}/auth/user`, {
        method: 'GET',
        withCredentials: true,
      });
      this.user = res.data;
    },
  },
});
