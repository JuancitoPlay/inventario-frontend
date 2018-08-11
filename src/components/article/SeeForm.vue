<template>
  <div>
    <InputText disabled="true"  label="Código" :value="store.almacenId" />
    <InputText disabled="true"  label="Descripción" :value="store.descripcion" />
    <InputText disabled="true"  label="Estado" :value="store.estado" />
    <InputText disabled="true"  label="Creado" :value="formatDateFromNow(store.createdAt)" />
    <InputText disabled="true"  label="Última Modificación" :value="formatDateFromNow(store.updatedAt)" />
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
  props: ['store'],
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
