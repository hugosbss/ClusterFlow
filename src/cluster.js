import { defineStore } from 'pinia';
// Store para gerenciar o estado do cluster de servidores e suas aplicações
export const usarCluster = defineStore('cluster', {
  state: () => ({
    servidores: [], // Lista de servidores criados
    servidorId: 1, 
    listaDisponiveis: [ // Lista de aplicativos que podem ser usados no cluster
      { id: 1, nome: 'Hadoop',  sigla: 'Hd', class: 'app-hadoop' },
      { id: 2, nome: 'Rails',   sigla: 'Rl', class: 'app-rails' },
      { id: 3, nome: 'Chronos', sigla: 'Ch', class: 'app-chronos' },
      { id: 4, nome: 'Storm',   sigla: 'St', class: 'app-storm' },
      { id: 5, nome: 'Spark',   sigla: 'Sp', class: 'app-spark' }
    ]
  }),

  // Ações para manipular o estado do cluster
  actions: {
    iniciarCluster() {
      this.servidores = [];
      this.servidorId = 1;
      for (let i = 0; i < 4; i++) {
        this.adicionarServidor();
      }
    },

    adicionarServidor() {
      this.servidores.push({
        id: this.servidorId++,
        apps: []
      });
    },

    destruirServidor() {
      if (this.servidores.length === 0) {
        alert('Nenhum servidor para remover!');
        return;
      }
      // Para cada app que estava nesse servidor, tenta realocar em outro
      const ultimoServidor = this.servidores.pop();
      // Realoca as aplicações do servidor removido
      ultimoServidor.apps.forEach(app => {
        const realocado = this.alocacaoApp(app);
      });
    },

    iniciarInstancia(app) {
      const allocated = this.alocacaoApp(app);

      if (!allocated) {
        alert('Não é possível iniciar, nenhum servidor disponível!');
      }
    },

    pararInstancia(appToStop) {
      // Procura a última instância da aplicação para parar, percorre os servidores de trás para frente
      for (let i = this.servidores.length - 1; i >= 0; i--) {
        const servidor = this.servidores[i];
        const appIndex = servidor.apps.findIndex(app => app.id === appToStop.id);

        if (appIndex !== -1) {
          servidor.apps.splice(appIndex, 1);
          return;
        }
      }

      alert('Nenhuma instância encontrada para parar!');
    },
    // Conta quantas instâncias de um app estão rodando no cluster
    contaInstancias(app) {
      let count = 0;
      this.servidores.forEach(servidor => {
        servidor.apps.forEach(appInServer => {
          if (appInServer.id === app.id) {  
            count++;
          }
        });
      });
      return count;
    },
    // Aloca (coloca) um app em algum servidor disponível
    alocacaoApp(app) {
      const horasCorridas = new Date();
      app.hora = horasCorridas.getHours().toString().padStart(2, '0') + ':' +
                 horasCorridas.getMinutes().toString().padStart(2, '0') + ':' +
                 horasCorridas.getSeconds().toString().padStart(2, '0');
      // Verifica se há servidores disponíveis, se não houver servidores, não faz nada
      if (this.servidores.length === 0) {
        return false;
      }
      // Prioriza servidores com 0 ou 1 aplicação
      const servidorZero = this.servidores.find(s => s.apps.length === 0);
      if (servidorZero) {
        servidorZero.apps.push(app);
        return true;
      }
      // Se não houver servidores vazios, tenta alocar em servidores com 1 aplicação
      const servidorUm = this.servidores.find(s => s.apps.length === 1);
      if (servidorUm) {
        servidorUm.apps.push(app);
        return true;
      }

      return false;
    }
  }
});
