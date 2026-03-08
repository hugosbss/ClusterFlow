<script setup>
defineProps({
  server: Object
})
</script>

<template>
  <div class="server-card">
    <!-- Para cada aplicativo na lista em 'server.apps', criamos um bloco visual no quadro de servidores -->
    <div
      v-for="app in server.apps"
      :key="app.id"
      class="app-block"
      :class="app.class"
    >
      <div class="app-code">
        <span class="letra-normal">{{ app.sigla[0] }}</span><span class="letra-mock">{{ app.sigla[1] }}</span>
      </div>
      <div class="app-name-card">{{ app.nome }}</div>
      <div class="app-time">Added {{ app.hora }}</div>
    </div>
  </div>
</template>

<style>
.server-card {
  background: #292c31;
  border-radius: 12px;
  height: 160px;
  padding: 0;
  display: flex;
  overflow: hidden;
}

.app-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
}

.app-block.empty {
  background: #1f2124;
}

.app-code {
  font-size: 1.8rem;
  font-weight: bold;
}
.letra-normal {
  font-family: sans-serif;
  font-weight: 400;
  color: white;
}

.letra-mock {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  color: white;
}
.app-name-card {
  font-weight: bold;
  color: white;
  font-size: 14px;
}

.app-name {
  margin-top: 0.4rem;
  font-size: 0.9rem;
}

.app-time {
  font-size: 0.7rem;
  margin-top: 0.2rem;
  opacity: 0.8;
  color:black
}
</style>
