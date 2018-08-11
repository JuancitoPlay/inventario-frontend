<template>
  <div>
    <div class="field">
      <div class="control">
        <label for="">Inventario</label>
        <vSelect @click="handleDescripcion" v-model="inventarioId" :options="inventories"></vSelect>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label for="">Almacen</label>
        <vSelect  v-model="almacenId" :options="stores"></vSelect>
      </div>
    </div>
    <InputText @newChange="handleDescripcion" label="Descripción" :value="descripcion" />
    <InputText type="number" label="Costo" @newChange="handleCosto" :value="costo" />
    <InputText type="number" label="Cantidad" @newChange="handleCantidad" :value="cantidad" />
    <!-- <InputSelect @newChange="handleDescripcion" label="Cantidad"
    :options="[{value: '1', description: 'Uno'},
    {value:2, description: 'Dos'}]" :value="almacenId" /> -->
  </div>
</template>

<script>
import InputText from '@/shared-components/InputText'
import InputSelect from '@/shared-components/InputSelect'
import vSelect from 'vue-select'
import config from '@/config'
import Client from '@/client'
export default {
  name: 'CreateForm',
  components: {
    InputText,
    InputSelect,
    vSelect
  },
  data: () => ({
    descripcion: '',
    costo: '',
    cantidad: '1',
    almacenId: '',
    inventarioId: '',
    stores: [],
    inventories: []
  }),
  methods: {
    handleDescripcion (value) {
      if (this.descripcion !== value) {
        this.descripcion = value
        this.$emit('newValue', {
          descripcion: this.descripcion,
          costo: this.costo,
          precio: this.precio,
          cantidad: this.cantidad,
          almacenId: this.almacenId,
          inventarioId: this.inventarioId
        })
      }
    },
    handleCosto (value) {
      if (this.costo !== value && !isNaN(value) && parseInt(value) >= 1) {
        this.costo = value
        this.$emit('newValue', {
          descripcion: this.descripcion,
          costo: this.costo,
          precio: this.costo,
          cantidad: this.cantidad,
          almacenId: this.almacenId.value,
          inventarioId: this.inventarioId.value
        })
      } else {
        this.costo = 1
      }
    },
    handleCantidad (value) {
      if (this.costo !== value && !isNaN(value) && parseInt(value) >= 1) {
        this.cantidad = value
        this.$emit('newValue', {
          descripcion: this.descripcion,
          costo: this.costo,
          precio: this.precio,
          cantidad: this.cantidad,
          almacenId: this.almacenId.value,
          inventarioId: this.inventarioId.value
        })
      }
    },
    async setStores () {
      let client = new Client({ uri: config.uri })
      let stores = await client.getAllStores()
      this.stores = stores.map(i => {
        let temp = {}
        temp.label = i.descripcion
        temp.value = i.almacenId
        return temp
      })
    },
    async setInventories () {
      let client = new Client({ uri: config.uri })
      let inventories = await client.getAllInventories()
      this.inventories = inventories.map(i => {
        let temp = {}
        temp.label = i.descripcion
        temp.value = i.inventarioId
        return temp
      })
    }
  },
  async mounted () {
    await this.setStores()
    await this.setInventories()
  },
  updated () {
    console.log({
      descripcion: this.descripcion,
      costo: this.costo,
      precio: this.costo,
      cantidad: this.cantidad,
      almacenId: this.almacenId.value,
      inventarioId: this.inventarioId.value
    })
    this.$emit('newValue', {
      descripcion: this.descripcion,
      costo: this.costo,
      precio: this.precio,
      cantidad: this.cantidad,
      almacenId: this.almacenId.value,
      inventarioId: this.inventarioId.value
    })
  }
}
</script>

<style scoped>
  .searchable, .dropdown-toggle.clearfix {
    width:100%!important;
  }
  label {
    font-weight: bold;
  }
</style>
