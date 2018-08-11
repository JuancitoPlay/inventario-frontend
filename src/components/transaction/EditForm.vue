<template>
  <div>
    <InputText disabled="true" @newChange="handleChange" label="Código" :value="store.almacenId" />
    <InputText @newChange="handleChange" label="Descripción" :value="store.descripcion" />
    <InputText disabled="true" @newChange="handleChange" label="Estado" :value="store.estado" />
  </div>
</template>

<script>
import InputText from '@/shared-components/InputText'
export default {
  name: 'EditForm',
  components: {
    InputText
  },
  props: ['store'],
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
