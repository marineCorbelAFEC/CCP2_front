<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useMissionStore } from '@/stores/mission.js';

const missions = reactive([]);
const missionStore = useMissionStore();
onMounted(async () => {
  await missionStore.fetchMissions();
  const missionsList = await missionStore.getMissions;
  console.log('missionsList', missionsList);
  if (missionsList?.length >= 1) {
    missions.push(...missionsList);
  }
});

const postuler = async (missionId) => {
  try {
  } catch (error) {
    alert('Erreur lors de la candidature');
  }
};
</script>

<template>
  <div>
    <h2>Liste des missions</h2>
    <ul>
      <li v-for="mission in missions" :key="mission.id">
        {{ mission.title }}
        <button @click="postuler(mission.id)">Postuler</button>
      </li>
    </ul>
  </div>
</template>
