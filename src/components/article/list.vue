<template>
  <table class="table table is-fullwidth table is-bordered is-hoverable table is-striped">
    <StoreListTitle :titles="titles" />
    <StoreListBody @newToEdit="handleNewToEdit" @newToSee="handleNewToSee" :body="body"/>
  </table>
</template>

<script>
import StoreListTitle from '@/components/article/list-title.vue'
import StoreListBody from '@/components/article/list-body.vue'
export default {
  name: 'StoreList',
  props: ['titles', 'body'],
  components: {
    StoreListTitle,
    StoreListBody
  },
  methods: {
    handleNewToEdit (store) {
      this.$emit('newToEdit', store)
    },
    handleNewToSee (store) {
      this.$emit('newToSee', store)
    }
  }
}
</script>

<style scoped>

</style>
