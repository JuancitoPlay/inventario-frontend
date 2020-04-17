<template>
  <div>
    <table class="table table is-fullwidth table is-bordered is-hoverable table is-striped">
    <StoreListTitle :titles="titles" />
    <!-- <StoreListBody @newToEdit="handleNewToEdit" @newToSee="handleNewToSee" :body="body"/> -->
    <tbody >
      <tr v-for="j in list" :key="j.id">
        <td>{{j.id}}</td>
        <td>{{j.description}}</td>
        <td>{{j.date}}</td>
        <td>{{j.createdAt}}</td>
        <td>{{j.updatedAt}}</td>
        </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import StoreListTitle from '@/components/transaction/list-title.vue'
// import StoreListBody from '@/components/transaction/list-body.vue'
import Client from '@/client'
import config from '@/config'
export default {
  name: 'StoreList',
  props: ['titles', 'body'],
  components: {
    StoreListTitle
  },
  data: () => ({
    list: []
  }),
  methods: {
    handleNewToEdit (store) {
      this.$emit('newToEdit', store)
    },
    handleNewToSee (store) {
      this.$emit('newToSee', store)
    }
  },
  async mounted () {
    let client = new Client({ uri: config.uri })
    this.list = await client.getAllEntries()
    console.log(this.list)
  }
}
</script>

<style scoped>

</style>
