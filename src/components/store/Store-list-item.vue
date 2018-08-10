<template>
  <td>
    {{item[name]}}
  </td>
</template>
<script>
export default {
  name: 'StoreListItem',
  props: ['item', 'name']
}
</script>
<style scoped>

</style>
