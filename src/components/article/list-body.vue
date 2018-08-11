<template>
  <tbody>
    <tr v-for="article in body" :key="article.id">
      <ArticleListItem :item="article" name="articuloId" />
      <ArticleListItem :item="article" name="descripcion" />
      <ArticleListItem :item="article" name="cantidad" />
      <ArticleListItem :item="article.almacene" name="descripcion" />
      <ArticleListItem :item="article" name="costo" />
      <ArticleListItem :item="article.inventario" name="descripcion" />
      <td>
        <div class="options-cell navbar-item has-dropdown is-hoverable">
        <a>
          <img class="is-hidden-tablet-only is-hidden-mobile" src="@/assets/more.svg" alt="">
        </a>
        <div class="navbar-dropdown ">
          <a @click.prevent="handleSeeClick(article)" class="navbar-item">
            Ver
          </a>
          <hr class="navbar-divider">
          <a @click.prevent="handleEditClick(article)" class="navbar-item">
            Editar
          </a>
        </div>
      </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import ArticleListItem from '@/components/article/list-item.vue'
import config from '@/config'
import Client from '@/client'
export default {
  name: 'ArticleListBody',
  props: ['body'],
  components: {
    ArticleListItem
  },
  data: () => ({
    store: {},
    inventory: {},
    list: []
  }),
  methods: {
    handleEditClick (article) {
      this.$emit('newToEdit', article)
    },
    handleSeeClick (article) {
      console.log(this.body)
      this.$emit('newToSee', article)
    },
    async geStore (id) {
      let client = new Client({ uri: config.uri })
      let store = await client.getStoreById(id)
      return store
    },
    async geInventory (id) {
      let client = new Client({ uri: config.uri })
      let inventory = await client.getInventoryById(id)
      return inventory
    }
  },
  mounted () {
    // this.list = this.body.map(async i => {
    //   let store = await this.geStore(i.almacenId)
    //   i.almacen = store.descripcion
    //   return i
    // })
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
</style>
