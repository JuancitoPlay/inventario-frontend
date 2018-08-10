<template>
  <div>
    <InputText disabled="true"  label="Código" :value="inventory.inventarioId" />
    <InputText disabled="true"  label="Descripción" :value="inventory.descripcion" />
    <InputText disabled="true"  label="Estado" :value="inventory.estado" />
    <InputText disabled="true"  label="Creado" :value="formatDateFromNow(inventory.createdAt)" />
    <InputText disabled="true"  label="Última Modificación" :value="formatDateFromNow(inventory.updatedAt)" />
  </div>
</template>

<script>
import InputText from '@/shared-components/InputText'
import moment from 'moment'
export default {
  name: 'EditForm',
  components: {
    InputText
  },
  props: ['inventory'],
  data: () => ({
  }),
  methods: {
    formatDate (date) {
      console.log(date)
      return moment(date)
    },
    formatDateFromNow (date) {
      console.log(date)
      return moment(date).locale('es').fromNow()
    }
  }
}
</script>

<style scoped>

</style>
