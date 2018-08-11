<template>
  <div>
    <InputText disabled="true"  label="Código" :value="article.articuloId" />
    <InputText disabled="true"  label="Descripción" :value="article.descripcion" />
    <InputText disabled="true"  label="Almacen" :value="article.almacene.descripcion" />
    <InputText disabled="true"  label="Inventario" :value="article.inventario.descripcion" />
    <InputText disabled="true"  label="Cantidad" :value="article.cantidad" />
    <InputText disabled="true"  label="Costo" :value="article.costo" />
    <InputText disabled="true"  label="Creado" :value="formatDateFromNow(article.createdAt)" />
    <InputText disabled="true"  label="Última Modificación" :value="formatDateFromNow(article.updatedAt)" />
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
  props: ['article'],
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
