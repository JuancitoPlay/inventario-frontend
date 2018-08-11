<template>
  <div>
    <InputText @newChange="handleChange" label="Descripción" :value="description" />
    <InputText label="Costo" :value="costo" />
    <InputText label="Precio" :value="precio" />
    <InputText label="Cantidad" :value="cantidad" />
  </div>
</template>

<script>
import InputText from '@/shared-components/InputText'
export default {
  name: 'CreateForm',
  components: {
    InputText
  },
  data: () => ({
    description: '',
    costo: '',
    precio: '',
    cantidad: ''
  }),
  methods: {
    handleChange (value) {
      if (this.description !== value) {
        this.description = value
        this.$emit('newValue', {description: this.description})
      }
    }
  }
}
</script>

<style scoped>

</style>
