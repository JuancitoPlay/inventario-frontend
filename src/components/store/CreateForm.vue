<template>
  <div>
    <InputText @newChange="handleChange" label="Descripción" :value="description" />
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
