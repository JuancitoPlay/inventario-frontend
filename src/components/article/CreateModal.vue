<template>
  <Modal :save="handleSave" :is-active="modalState" :close="handleCancel" title="Crear Nuevo Articulo">
    <template slot="content"><CreateForm @newValue="handleForm"/></template>
  </Modal>
</template>
<script>
import Modal from '@/shared-components/Modal.vue'
import CreateForm from '@/components/article/CreateForm'
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
      console.log(this.form)
      console.log({uri: config.uri})
      let client = new Client({uri: config.uri})

      let article = await client.saveArticle(this.form)
      let tokeResponse = await client.validateToken()
      this.saveLog({
        cantidad: article.cantidad,
        usuarioId: tokeResponse.token.usuarioId,
        articuloId: article.articuloId,
        tipoMovimientoId: 'd0ec5bb6-68c2-4399-b42b-788f8b8ce54a'
      })
      console.log(article)
      this.$emit('newSaved')
      this.handleCancel()
    },
    async saveLog (log) {
      let client = new Client({uri: config.uri})
      let response = await client.saveLog(log)
      console.log(response)
    },
    handleForm (form) {
      this.form = form
    }
  }
}
</script>
<style scoped>

</style>
