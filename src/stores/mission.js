import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
export const useMissionStore = defineStore('missionStore', {
  state: () => ({ missions: useLocalStorage('articles', []) }),
  getters: {
    getMissions(state) {
      return state.missions;
    },
  },
  actions: {
    async fetchMissions() {
      const response = await fetch('http://localhost:3001/api/missions', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Login failed');

      const missions = await response.json();

      this.missions = missions;
      console.log('this.mission', this.missions);
    },
  },
});
