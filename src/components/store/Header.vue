<template>
  <div class="header">
    <Searcher @newFiltered="handleFilter" :list="list" />
    <button @click.prevent="handleCreateClick" class="button is-success">Crear Nuevo</button>
  </div>
</template>

<script>
import Searcher from '@/shared-components/Searcher'
export default {
  name: 'Header',
  props: ['list'],
  methods: {
    handleCreateClick () {
      this.$emit('showModal')
    },
    handleFilter (newList) {
      this.$emit('newList', newList)
    }
  },
  components: {
    Searcher
  }
}
</script>
<style scoped>
  .header {
    width:100%;
    display:flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
  }
  button {
    width:10%;
  }
</style>
