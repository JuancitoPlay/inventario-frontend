<template>
  <Modal :save="handleSave" :is-active="modalState" :close="handleCancel" title="Editar Articulo">
    <template slot="content"><EditForm :article="article" @newValue="handleForm"/></template>
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
  props: ['modalState', 'handleCancel', 'article'],
  data: () => ({
    form: {}
  }),
  methods: {
    async handleSave () {
      let client = new Client({uri: config.uri})
      console.log({almacenId: this.article.articuloId}, JSON.parse(JSON.stringify(this.form)))
      await client.updateArticle({articuloId: this.article.articuloId}, {form: this.form})
      this.$emit('newEdited')
      this.handleCancel()
    },
    handleForm (form) {
      this.form = form
      console.log(this.form)
    }
  }
}
</script>
<style scoped>

</style>
