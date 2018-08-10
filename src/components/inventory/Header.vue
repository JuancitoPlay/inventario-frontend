<template>
  <div class="header">
    <button @click.prevent="handleCreateClick" class="button is-success">Crear Nuevo</button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    handleCreateClick () {
      this.$emit('showModal')
    }
  }
}
</script>
<style scoped>
  .header {
    width:100%;
    display:flex;
    justify-content: flex-end;
  }
</style>
