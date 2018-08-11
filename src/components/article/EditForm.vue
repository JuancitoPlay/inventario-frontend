<template>
  <div>
    <InputText disabled="true" @newChange="handleChange" label="Código" :value="article.articuloId" />
    <InputText @newChange="handleChange" label="Descripción" :value="article.descripcion" />
    <InputText disabled="true" @newChange="handleChange" label="Estado" :value="article.estado" />
  </div>
</template>

<script>
import InputText from '@/shared-components/InputText'
export default {
  name: 'EditForm',
  components: {
    InputText
  },
  props: ['article'],
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
