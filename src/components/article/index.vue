<template>
  <div class="article">
    <Navbar/>
    <Header @newList="handleNewList" @showModal="handleCreateShow" :list="list" />
    <ArticleList @newToEdit="handleEditShow" @newToSee="handleSeeShow"  :titles="titles" :body="body" />
    <CreateModal @newSaved="setArticles" :modalState="createModalState" :handleCancel="handleCreateShow" />
    <EditModal @newEdited="setArticles" :modalState="editModalState" :handleCancel="handleEditShow" :article="workingArticle" />
    <SeeModal  :modalState="seeModalState" :handleCancel="handleSeeShow" :article="workingArticle" />
  </div>
</template>

<script>
import Client from '@/client'
import ArticleList from '@/components/article/list.vue'
import config from '@/config'
import CreateModal from '@/components/article/CreateModal.vue'
import EditModal from '@/components/article/EditModal.vue'
import SeeModal from '@/components/article/SeeModal.vue'
import Header from '@/components/article/Header.vue'
import Navbar from '@/shared-components/Navbar.vue'
export default {
  name: 'Article',
  data: () => ({
    titles: [
      { id: 1, description: 'Código' },
      { id: 2, description: 'Descripción' },
      { id: 6, description: 'Cantidad' },
      { id: 3, description: 'Almacen' },
      { id: 4, description: 'Costo' },
      { id: 7, description: 'inventario' },
      { id: 5, description: ' ' }
    ],
    body: [],
    list: [],
    createModalState: false,
    editModalState: false,
    seeModalState: false,
    workingArticle: {}
  }),
  methods: {
    handleCreateShow () {
      this.createModalState = !this.createModalState
    },
    async handleEditShow (article) {
      this.setArticles()
      if (!this.editModalState) await this.getStore(article)
      this.editModalState = !this.editModalState
    },
    async handleSeeShow (article) {
      this.setArticles()
      if (!this.seeModalState) await this.getStore(article)
      this.seeModalState = !this.seeModalState
    },
    async setArticles () {
      let client = new Client({uri: config.uri})
      this.body = await client.getAllArticles()
    },
    async getStore (article) {
      let client = new Client({uri: config.uri})
      this.workingArticle = await client.getArticleById(article.articuloId)
    },
    handleNewList (newList) {
      this.body = newList
      console.log(this.body)
    }
  },
  mounted: async function () {
    await this.setArticles()
    let client = new Client({uri: config.uri})
    this.list = await client.getAllArticles()
  },
  components: {
    ArticleList,
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
  .article {
    margin-right: 1em;
  }
</style>
