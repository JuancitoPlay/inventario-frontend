<template>
<thead>
  <tr>
    <th v-for="title in titles" :key="title.id">
      {{title.description}}
    </th>
  </tr>
</thead>
</template>

<script>
export default {
  name: 'StoreListTitle',
  props: ['titles']
}
</script>

<style scoped>

</style>
