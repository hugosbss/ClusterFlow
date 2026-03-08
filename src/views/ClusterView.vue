<script setup>
import { onMounted } from 'vue';
import { usarCluster } from '@/cluster';
import ServerGrid from '../components/ServerGrid.vue';

//Criamos uma variável que guarda o estado do cluster
const clusterStore = usarCluster();
// Quando o componente for montado, iniciamos o cluster
onMounted(() => {
  clusterStore.iniciarCluster();
});
// Mapeamento de cores para os aplicativos
const colors = {
  "Hadoop": "#ff00c8",
  "Rails": "#2a00ff",
  "Chronos": "#008cff",
  "Storm": "#00d4a8",
  "Spark": "#34ff00",
};
// Função para obter a cor do aplicativo com base no nome
const getAppColor = (name) => {
  const base = name.split(" ")[0];
  return colors[base] || "#555";
};
</script>

<template>
  <div class="main-container">

    <main class="layout">

      <aside class="side-panel">
        <div class="side-actions">
            <div class="action-servidores">
                <button class="circle-btn add" @click="clusterStore.adicionarServidor()" aria-label="Adicionar" style="background:none; border:none;">
                    <svg width="50" height="50" viewBox="0 0 24 24" role="img" aria-hidden="true">
                        <circle cx="12" cy="12" r="11" fill="none" stroke="white" stroke-width="2"/>
                        <path d="M12 5v14M5 12h14"
                            fill="none"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"/>
                    </svg>
                </button>
                <span>Novo Servidor</span>
            </div>
            
            <div class="action-servidores">
                <button class="circle-btn remove" @click="clusterStore.destruirServidor()" aria-label="Remover" style="background:none; border:none;">
                    <svg width="50" height="50" viewBox="0 0 24 24" role="img" aria-hidden="true">
                        <circle cx="12" cy="12" r="11" fill="none" stroke="gray" stroke-width="2"/>
                        <line x1="5" y1="12" x2="19" y2="12"
                            stroke="gray"
                            stroke-width="2"
                            stroke-linecap="round"/>
                    </svg>
                </button>
                <span>Destruir</span>
            </div>          
        </div>

        <h2 class="side-title">Apps Disponíveis</h2>    
        <!-- Lista de aplicativos disponíveis com controles para iniciar/parar -->
        <ul class="apps-list">
          <li v-for="app in clusterStore.listaDisponiveis" :key="app.id" class="app-item">
            <span class="app-color" :style="{ background: getAppColor(app.nome) }"></span>
            <div class="app-name">{{ app.nome }}</div>
            <div class="app-count">{{ clusterStore.contaInstancias(app) }}</div>


            <div class="app-controls">
              <button class="mini-btn remove-mini" @click="clusterStore.pararInstancia(app)" aria-label="Remover">
                <svg width="28" height="28" viewBox="0 0 24 24" role="img" aria-hidden="true">
                <circle cx="12" cy="12" r="11" fill="none" stroke="gray" stroke-width="2"/>
                <line x1="5" y1="12" x2="19" y2="12"
                        stroke="gray"
                        stroke-width="2"
                        stroke-linecap="round"/>
                </svg>
            </button>

            <button 
            class="mini-btn add-mini" 
            @click="clusterStore.iniciarInstancia(app)" 
            aria-label="Adicionar">
            <svg class="iniciar-apps" 
            :style="{ background: getAppColor(app.nome) }" width="28" height="28" viewBox="0 0 24 24" role="img" aria-hidden="true">
                <path d="M12 5v14M5 12h14"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"/>
            </svg>
            </button>

            </div>
          </li>
        </ul>
      </aside>

      <section class="servers-section">
        <h2 class="servers-title">Quadro de Servidores</h2>
        <ServerGrid :servers="clusterStore.servidores" />
      </section>
    </main>
  </div>
</template>

<style>
body {
  background: #1e1e1e;
  color: #fff;
  margin: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.main-container {
  min-height: 100vh;
}
.layout {
  display: flex;
  gap: 2rem;
  min-height: 100vh;
}

.side-panel {
  width: 300px;
  position: sticky;
  top: 0;
  height: 100vh;
  background: #242424;
  box-sizing: border-box;
}

.side-actions {
    justify-content: center;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 2rem;
    margin-bottom: 6rem;
}

.action-servidores {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
}

.circle-btn {
  flex-direction: column;
  justify-content: center;
  width: 85%;
  height: 100%;
  border-radius: 50%;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #fff;
  background: #242424;
  transition: 0.2s;
}

.circle-btn img {
    width: 50px;
    height: 50px;    
}

.side-title {
  color: #bbb;
  margin-bottom: 1rem;
}

h2.side-title {
  margin-left: 25px;
}

.apps-list {
  list-style: none;
  background: #1f1f1f !important;
  padding: 0;
  overflow: hidden;
}

.app-item {
  display: flex;
  align-items: center;
  padding-right: 15px;
  border-bottom: 1px solid #444;
}

.app-item:last-child {
  border-bottom: none;
}

.app-color {
  width: 6px;
  height: 40px;
  margin-right: 10px;
  border-radius: 2px;
}

.app-name {
  flex-grow: 1;
  font-size: 1rem;
}

.mini-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 6px;
  background-color: #1f1f1f !important;
}

.add-mini-svg {
  background: #28a745;
  border-radius: 50%;
}

.remove-mini {
  background: #1f1f1f !important;
}

.servers-section {
  flex-grow: 1;
  padding: 2rem;
}
@media (max-width: 768px) {
    .servers-section {
    padding: 1rem;
    }
    .servers-grid {
        display: flex;
        grid-column: auto;
    }
}
.servers-title {
  margin-bottom: 1rem;
  color: #dcdcdc;
}

.iniciar-apps {
  border-radius: 50%;
}

.app-count {
    margin-right: 30px;
}

@media (max-width: 768px) {
  .layout {
    gap: 0px;
  }
  .side-panel {
    transform: translateX(-2px);
  }
  .servers-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .server-card {
    width: 100%;
  }
  .app-item {
    padding-right: 6px;
  }
  .app-count{
    margin-right: 1px;
  }
  .app-color{
    margin-right: 1px;
  }
  h2.side-title {
    font-size: 15px;
    margin-left: 48px;
  }
  .side-actions .action-servidores {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
  }
  .side-actions{
    gap: 0rem;
  }
  .side-actions .circle-btn svg {
    width: 32px;
    height: 32px;
  }
  .side-actions .circle-btn {
    width: 48px;
    height: 48px;
    padding: 4px;
  }
  .side-actions .action-servidores span {
    font-size: 12px;
    margin-top: 4px;
  }
}

</style>
