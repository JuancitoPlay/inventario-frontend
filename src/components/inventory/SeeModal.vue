<template>
  <Modal :save="handleCancel" :is-active="modalState" :close="handleCancel" title="Inventario">
    <template slot="content"><SeeForm :inventory="inventory"/></template>
  </Modal>
</template>
<script>
import Modal from '@/shared-components/Modal.vue'
import SeeForm from '@/components/inventory/SeeForm'
export default {
  name: 'EditModal',
  components: {
    Modal,
    SeeForm
  },
  props: ['modalState', 'handleCancel', 'inventory'],
  data: () => ({
  })
}
</script>
<style scoped>

</style>
