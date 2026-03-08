<script setup>
import ServerCard from '@/components/ServerCard.vue'

defineProps({
  servers: Array
})
</script>

<template>
  <div class="servers-grid">
    
    <!-- Para cada servidor dentro da lista "servers", mostramos um ServerCard, v-for percorre todos os servidores, 
    :key garante que cada servidor seja identificado de forma única,
    :server passa os dados do servidor para dentro do componente ServerCard -->
 
    <ServerCard
      v-for="server in servers"
      :key="server.id"
      :server="server"
    />
  </div>
</template>

<style>
.servers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
}
</style>