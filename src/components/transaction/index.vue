<template>
  <div class="store">
    <Navbar />
    <Header @newList="handleNewList" @showModal="handleCreateShow" :list="list" />
    <!-- <StoreList @newToEdit="handleEditShow" @newToSee="handleSeeShow"  :titles="titles" :body="body" /> -->
    <div class="container">
      <div class="card" v-for="article in body" :key="article.articuloId">
        <header class="card-header">
          <p class="card-header-title">
            {{article.descripcion}}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field"><strong>ID:</strong> {{article.articuloId}}</div>
            <div class="field"><strong>Costo: </strong>  {{article.costo}}</div>
            <div class="field"><strong>Stock:</strong> {{article.cantidad}}</div>
            <div class="field"><strong>Almacen:</strong> {{article.almacene.descripcion}}</div>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" @click="handleExitModal(article)" class="card-footer-item">Salida</a>
          <a href="#" @click="handleEntryModal(article)" class="card-footer-item">Entrada</a>
        </footer>
      </div>
    </div>

    <div :class="'modal' + statusExitModal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Salida a {{workingArticle.descripcion}}</p>
          <button  class="delete" aria-label="close" @click="handleExitModal()"></button>
        </header>
        <section class="modal-card-body">
          <p><strong>Cantidad Disponible: </strong>{{workingArticle.cantidad}}</p>
          <br>
          <input v-model="updateQuantity" class="input" type="number" placeholder="Cantidad a dar salida">
        </section>
        <footer class="modal-card-foot">
          <button @click="handleExitModal()" class="button">Cancelar</button>
          <button @click="updateExitQuantity()" class="button is-success">Guardar</button>
        </footer>
      </div>
    </div>

    <div :class="'modal' + statusEntryModal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Entrada a {{workingArticle.descripcion}}</p>
          <button  class="delete" aria-label="close" @click="handleEntryModal()"></button>
        </header>
        <section class="modal-card-body">
          <p><strong>Cantidad Disponible: </strong>{{workingArticle.cantidad}}</p>
          <br>
          <input v-model="updateQuantity" class="input" type="number" placeholder="Cantidad a dar salida">
        </section>
        <footer class="modal-card-foot">
          <button @click="handleEntryModal()" class="button">Cancelar</button>
          <button @click="updateEntryQuantity()" class="button is-success">Guardar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Client from '@/client'
import StoreList from '@/components/transaction/list.vue'
import config from '@/config'
import CreateModal from '@/components/transaction/CreateModal.vue'
import EditModal from '@/components/transaction/EditModal.vue'
import SeeModal from '@/components/transaction/SeeModal.vue'
import Header from '@/components/transaction/Header.vue'
import Navbar from '@/shared-components/Navbar.vue'
export default {
  name: 'transaction',
  data: () => ({
    titles: [
      { id: 1, description: 'Código' },
      { id: 2, description: 'Descripción' },
      { id: 3, description: 'Fechado' },
      { id: 3, description: 'Creado' },
      { id: 3, description: 'última actualización' }
    ],
    body: [],
    list: [],
    createModalState: false,
    editModalState: false,
    seeModalState: false,
    workingStore: {},
    workingArticle: {},
    statusExitModal: '',
    statusEntryModal: '',
    updateQuantity: 0
  }),
  methods: {
    handleCreateShow () {
      this.createModalState = !this.createModalState
    },
    async getAllArticles () {
      let client = new Client({uri: config.uri})
      this.body = await client.getAllArticles()
      console.log(this.body)
    },
    async handleEditShow (store) {
      this.setStores()
      if (!this.editModalState) await this.getStore(store)
      this.editModalState = !this.editModalState
    },
    async handleSeeShow (store) {
      this.setStores()
      if (!this.stModalState) await this.getStore(store)
      this.seeModalState = !this.seeModalState
    },
    async setStores () {
      let client = new Client({uri: config.uri})
      this.body = await client.getAllEntries()
    },
    async getStore (store) {
      let client = new Client({uri: config.uri})
      this.workingStore = await client.getEntryById(store.id)
    },
    handleNewList (newList) {
      this.body = newList
      console.log(this.body)
    },
    handleExitModal (article = {}) {
      this.updateQuantity = 0
      this.workingArticle = article

      if (this.statusExitModal !== ' is-active' || this.statusExitModal === '') {
        this.statusExitModal = ' is-active'
      } else {
        this.statusExitModal = ''
      }
    },
    handleEntryModal (article = {}) {
      this.updateQuantity = 0
      this.workingArticle = article

      if (this.statusEntryModal !== ' is-active' || this.statusEntryModal === '') {
        this.statusEntryModal = ' is-active'
      } else {
        this.statusEntryModal = ''
      }
    },
    async updateExitQuantity () {
      if (this.updateQuantity <= 0 || this.updateQuantity > this.workingArticle.cantidad) {
        alert('Por favor ingrese una cantidad valida a dar salida')
      } else {
        await this.saveEntryExit('bd3fafc1-e166-4a44-8167-a0efd561048f')
        await this.updateExitArticle()
        this.handleExitModal()
      }
    },
    async updateEntryQuantity () {
      if (this.updateQuantity <= 0) {
        alert('Por favor ingrese una cantidad valida para dar entrada')
      } else {
        await this.saveEntryExit('d0ec5bb6-68c2-4399-b42b-788f8b8ce54a')
        await this.updateEntryArticle()
        this.handleEntryModal()
      }
    },
    async saveLog (log) {
      let client = new Client({uri: config.uri})
      let response = await client.saveLog(log)
      console.log(response)
    },
    async saveEntryExit (tipoId) {
      let client = new Client({uri: config.uri})
      let tokeResponse = await client.validateToken()
      console.log(tokeResponse)
      this.saveLog({
        cantidad: this.updateQuantity,
        usuarioId: tokeResponse.token.usuarioId,
        articuloId: this.workingArticle.articuloId,
        tipoMovimientoId: tipoId
      })
    },
    async updateExitArticle () {
      let client = new Client({uri: config.uri})

      let articleResponse = await client.getArticleById(this.workingArticle.articuloId)
      let newQuantity = articleResponse.cantidad - this.updateQuantity
      await client.updateArticle({articuloId: this.workingArticle.articuloId}, {cantidad: newQuantity})
      await this.getAllArticles()
      alert('Transacción Realizada correctamente')
    },
    async updateEntryArticle () {
      let client = new Client({uri: config.uri})

      let articleResponse = await client.getArticleById(this.workingArticle.articuloId)
      let newQuantity = parseInt(articleResponse.cantidad) + parseInt(this.updateQuantity)
      await client.updateArticle({articuloId: this.workingArticle.articuloId}, {cantidad: newQuantity})
      await this.getAllArticles()
      alert('Transacción Realizada correctamente')
    }
  },
  mounted: async function () {
    await this.getAllArticles()
    // let client = new Client({uri: config.uri})
    // this.list = await client.getAllEntries()
  },
  components: {
    StoreList,
    CreateModal,
    EditModal,
    Header,
    SeeModal,
    Navbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .store {
    margin-right: 1em;
  }
  .card {
    width: 40%;
    margin-right: 5%;
    margin-left: 5%;
    margin-bottom: 3%;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .card-content .content {
    display:flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .card .content .field {
    display: inline-flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .modal-content .content  {
    background-color: #ffffff;
  }
</style>
