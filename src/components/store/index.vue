<template>
  <div class="store">
    <Navbar />
    <Header @newList="handleNewList" @showModal="handleCreateShow" :list="list" />
    <StoreList @newToEdit="handleEditShow" @newToSee="handleSeeShow"  :titles="titles" :body="body" />
    <CreateModal @newSaved="setStores" :modalState="createModalState" :handleCancel="handleCreateShow" />
    <EditModal @newEdited="setStores" :modalState="editModalState" :handleCancel="handleEditShow" :store="workingStore" />
    <SeeModal  :modalState="seeModalState" :handleCancel="handleSeeShow" :store="workingStore" />
  </div>
</template>

<script>
import Client from '@/client'
import StoreList from '@/components/store/Store-list.vue'
import config from '@/config'
import CreateModal from '@/components/store/CreateModal.vue'
import EditModal from '@/components/store/EditModal.vue'
import SeeModal from '@/components/store/SeeModal.vue'
import Header from '@/components/store/Header.vue'
import Navbar from '@/shared-components/Navbar.vue'
export default {
  name: 'Store',
  data: () => ({
    titles: [
      { id: 1, description: 'Código' },
      { id: 2, description: 'Descripción' },
      { id: 3, description: 'Estado' },
      { id: 4, description: '' }
    ],
    body: [],
    list: [],
    createModalState: false,
    editModalState: false,
    seeModalState: false,
    workingStore: {}
  }),
  methods: {
    handleCreateShow () {
      this.createModalState = !this.createModalState
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
      this.body = await client.getAllStores()
    },
    async getStore (store) {
      let client = new Client({uri: config.uri})
      this.workingStore = await client.getStoreById(store.almacenId)
    },
    handleNewList (newList) {
      this.body = newList
      console.log(this.body)
    }
  },
  mounted: async function () {
    await this.setStores()
    let client = new Client({uri: config.uri})
    this.list = await client.getAllStores()
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
</style>
