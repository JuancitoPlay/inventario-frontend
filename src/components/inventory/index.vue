<template>
  <div class="inventory">
    <InventoryList @newToEdit="handleEditShow" @newToSee="handleSeeShow"  :titles="titles" :body="body" />
    <EditModal @newEdited="setInventories" :modalState="editModalState" :handleCancel="handleEditShow" :inventory="workingInventory" />
    <SeeModal  :modalState="seeModalState" :handleCancel="handleSeeShow" :inventory="workingInventory" />
  </div>
</template>

<script>
import Client from '@/client'
import InventoryList from '@/components/inventory/Inventory-list.vue'
import config from '@/config'
import EditModal from '@/components/inventory/EditModal.vue'
import SeeModal from '@/components/inventory/SeeModal.vue'
import Header from '@/components/inventory/Header.vue'
export default {
  name: 'Inventory',
  data: () => ({
    titles: [
      { id: 1, description: 'Código' },
      { id: 2, description: 'Descripción' },
      { id: 3, description: 'Cuenta Contable' },
      { id: 4, description: 'Estado' },
      { id: 5, description: '' }
    ],
    body: [],
    createModalState: false,
    editModalState: false,
    seeModalState: false,
    workingInventory: {}
  }),
  methods: {
    handleCreateShow () {
      this.createModalState = !this.createModalState
    },
    async handleEditShow (inventory) {
      this.setInventories()
      if (!this.editModalState) await this.getInventory(inventory)
      this.editModalState = !this.editModalState
    },
    async handleSeeShow (inventory) {
      this.setInventories()
      if (!this.seeModalState) await this.getInventory(inventory)
      this.seeModalState = !this.seeModalState
    },
    async setInventories () {
      let client = new Client({uri: config.uri})
      this.body = await client.getAllInventories()
    },
    async getInventory (inventory) {
      console.log(inventory)
      let client = new Client({uri: config.uri})
      this.workingInventory = await client.getInventoryById(inventory.inventarioId)
      console.log(this.workingInventory)
    }
  },
  mounted: async function () {
    await this.setInventories()
  },
  components: {
    InventoryList,
    EditModal,
    Header,
    SeeModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .inventory {
    margin-right: 1em;
  }
</style>
