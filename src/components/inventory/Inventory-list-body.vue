<template>
  <tbody>
    <tr v-for="inventory in body" :key="inventory.id">
      <StoreListItem :item="inventory" name="inventarioId" />
      <StoreListItem :item="inventory" name="descripcion" />
      <StoreListItem :item="inventory" name="cuentaContable" />
      <StoreListItem :item="inventory" name="estado" />
      <td>
        <div class="options-cell navbar-item has-dropdown is-hoverable">
        <a>
          <img class="is-hidden-tablet-only is-hidden-mobile" src="@/assets/more.svg" alt="">
        </a>
        <div class="navbar-dropdown ">
          <a @click.prevent="handleSeeClick(inventory)" class="navbar-item">
            Ver
          </a>
          <hr class="navbar-divider">
          <a @click.prevent="handleEditClick(inventory)" class="navbar-item">
            Editar
          </a>
        </div>
      </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import StoreListItem from '@/components/inventory/Inventory-list-item.vue'
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
