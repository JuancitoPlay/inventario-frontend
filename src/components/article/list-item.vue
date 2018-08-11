<template>
  <td>
    {{item[name]}}
  </td>
</template>
<script>
export default {
  name: 'ArticleListItem',
  props: ['item', 'name']
}
</script>
<style scoped>

</style>
