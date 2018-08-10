<template>
  <Modal :save="handleSave" :is-active="modalState" :close="handleCancel" title="Editar Inventario">
    <template slot="content"><EditForm :inventory="inventory" @newValue="handleForm"/></template>
  </Modal>
</template>
<script>
import Modal from '@/shared-components/Modal.vue'
import EditForm from '@/components/inventory/EditForm'
import config from '@/config'
import Client from '@/client'
export default {
  name: 'EditModal',
  components: {
    Modal,
    EditForm
  },
  props: ['modalState', 'handleCancel', 'inventory'],
  data: () => ({
    form: {}
  }),
  methods: {
    async handleSave () {
      let current = JSON.parse(JSON.stringify(this.inventory))
      console.log({uri: config.uri})
      let client = new Client({uri: config.uri})
      await client.updateInventory({inventarioId: current.inventarioId}, {descripcion: this.form.description})
      this.$emit('newEdited')
      this.handleCancel()
    },
    handleForm (form) {
      this.form = form
    }
  }
}
</script>
<style scoped>

</style>
