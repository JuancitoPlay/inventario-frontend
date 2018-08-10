<template>
  <Modal :save="handleSave" :is-active="modalState" :close="handleCancel" title="Crear Nuevo Inventario">
    <template slot="content"><CreateForm @newValue="handleForm"/></template>
  </Modal>
</template>
<script>
import Modal from '@/shared-components/Modal.vue'
import CreateForm from '@/components/inventory/CreateForm'
import config from '@/config'
import Client from '@/client'
export default {
  name: 'CreateModal',
  components: {
    Modal,
    CreateForm
  },
  props: ['modalState', 'handleCancel'],
  data: () => ({
    form: {}
  }),
  methods: {
    async handleSave () {
      console.log(this.form.description)
      console.log({uri: config.uri})
      let client = new Client({uri: config.uri})
      await client.saveStore(this.form)
      this.$emit('newSaved')
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
