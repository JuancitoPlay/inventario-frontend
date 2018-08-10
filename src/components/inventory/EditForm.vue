<template>
  <div>
    <InputText disabled="true" @newChange="handleChange" label="Código" :value="inventory.inventarioId" />
    <InputText @newChange="handleChange" label="Descripción" :value="inventory.descripcion" />
    <InputText disabled="true" @newChange="handleChange" label="Estado" :value="inventory.estado" />
  </div>
</template>

<script>
import InputText from '@/shared-components/InputText'
export default {
  name: 'EditForm',
  components: {
    InputText
  },
  props: ['inventory'],
  data: () => ({
    description: ''
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
