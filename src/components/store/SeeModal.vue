<template>
  <Modal :save="handleCancel" :is-active="modalState" :close="handleCancel" title="Almacen">
    <template slot="content"><SeeForm :store="store"/></template>
  </Modal>
</template>
<script>
import Modal from '@/shared-components/Modal.vue'
import SeeForm from '@/components/store/SeeForm'
export default {
  name: 'EditModal',
  components: {
    Modal,
    SeeForm
  },
  props: ['modalState', 'handleCancel', 'store'],
  data: () => ({
  })
}
</script>
<style scoped>

</style>
