<template>
  <table class="table table is-fullwidth table is-bordered is-hoverable table is-striped">
    <InventoryListTitle :titles="titles" />
    <StoreListBody @newToEdit="handleNewToEdit" @newToSee="handleNewToSee" :body="body"/>
  </table>
</template>

<script>
import InventoryListTitle from '@/components/inventory/Inventory-list-title.vue'
import StoreListBody from '@/components/inventory/Inventory-list-body.vue'
export default {
  name: 'InventoryList',
  props: ['titles', 'body'],
  components: {
    InventoryListTitle,
    StoreListBody
  },
  methods: {
    handleNewToEdit (inventory) {
      this.$emit('newToEdit', inventory)
    },
    handleNewToSee (inventory) {
      this.$emit('newToSee', inventory)
    }
  }
}
</script>

<style scoped>

</style>
