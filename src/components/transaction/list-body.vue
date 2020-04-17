<template>
<div >
  <tbody v-for="store in body" :key="store.id">
    <tr v-for="i in store.items" :key="i.id">
      <StoreListItem :item="i" name="id" />
      <StoreListItem :item="store" name="descripcion" />
      <StoreListItem :item="store" name="estado" />
      <!-- <td>
        <div class="options-cell navbar-item has-dropdown is-hoverable">
        <a>
          <img class="is-hidden-tablet-only is-hidden-mobile" src="@/assets/more.svg" alt="">
        </a>
        <div class="navbar-dropdown ">
          <a @click.prevent="handleSeeClick(store)" class="navbar-item">
            Ver
          </a>
          <hr class="navbar-divider">
          <a @click.prevent="handleEditClick(store)" class="navbar-item">
            Editar
          </a>
        </div>
      </div>
      </td> -->
    </tr>
  </tbody>
</div>
</template>

<script>
import StoreListItem from '@/components/article/list-item.vue'
import config from '@/config'
import Client from '@/client'
export default {
  name: 'StoreListBody',
  props: ['body'],
  components: {
    StoreListItem
  },
  methods: {
    handleEditClick (store) {
      this.$emit('newToEdit', store)
    },
    handleSeeClick (store) {
      this.$emit('newToSee', store)
    }
  },
  async updated () {
    let client = new Client({ uri: config.uri })
    console.log(this.body)
    for (const body of this.body) {
      console.log(body.id)
      body.items = await client.getAllEntryItemsById(body.id)
    }
    console.log(this.body)
  }
}
</script>
<style scoped>
  td img {
    height: 2em;
    width: 2em;
  }
  .options-cell {
    display:inline-flex;
    justify-content: center;
    width:100%;
  }
  div {
    height:100%;
  }
</style>
