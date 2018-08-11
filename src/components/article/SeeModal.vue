<template>
  <Modal :save="handleCancel" :is-active="modalState" :close="handleCancel" title="Articulo">
    <template slot="content"><SeeForm :article="article"/></template>
  </Modal>
</template>
<script>
import Modal from '@/shared-components/Modal.vue'
import SeeForm from '@/components/article/SeeForm'
export default {
  name: 'EditModal',
  components: {
    Modal,
    SeeForm
  },
  props: ['modalState', 'handleCancel', 'article'],
  data: () => ({
  })
}
</script>
<style scoped>

</style>
