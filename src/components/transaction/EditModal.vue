<template>
  <Modal :save="handleSave" :is-active="modalState" :close="handleCancel" title="Editar Articulo">
    <template slot="content"><EditForm :store="store" @newValue="handleForm"/></template>
  </Modal>
</template>
<script>
import Modal from '@/shared-components/Modal.vue'
import EditForm from '@/components/article/EditForm'
import config from '@/config'
import Client from '@/client'
export default {
  name: 'EditModal',
  components: {
    Modal,
    EditForm
  },
  props: ['modalState', 'handleCancel', 'store'],
  data: () => ({
    form: {}
  }),
  methods: {
    async handleSave () {
      console.log(JSON.parse(JSON.stringify(this.form)))
      console.log({uri: config.uri})
      let client = new Client({uri: config.uri})
      console.log({almacenId: this.store.almacenId}, JSON.parse(JSON.stringify(this.form)))
      await client.updateStore({almacenId: this.store.almacenId}, {descripcion: this.form.description})
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
