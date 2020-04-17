<template>
  <div class="entry">
    <Navbar class="mnavbar" />
    <h1 class="header-title">Generar Nueva Entrada de Diarios</h1>
    <Button label="Generar Nueva Entrada" :handleClick=" handleModal"/>

    <div class="table-container">
      <table class="table is-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Articulo</th>
            <th>Monto</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th> ID Asiento </th>
            <th>Ult. Modificación</th>
            <th>Modificado por. </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log of logs" :key="log.logId">
            <td>{{log.logId}}</td>
            <td>{{log.articulo.descripcion}}</td>
            <td>{{parseInt(log.articulo.costo) * parseInt(log.cantidad)}}</td>
            <td>{{log.tipoMovimiento.descripcion}}</td>
            <td v-if="log.estado === 'NC'">
              NO Contabilizado
            </td>
            <td v-else>Contabilizado</td>
            <td>{{log.asientoId}}</td>
            <td>{{formatDate(log.updatedAt)}}</td>
            <td>{{log.usuario.usuario}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div :class="'modal ' +  modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Generar Asiento</p>
          <button  class="delete" aria-label="close" @click="handleModal()"></button>
        </header>
        <section class="modal-card-body">
          <label class="label" >Desde</label>
          <input class="input" v-model="desde"  type="date" placeholder="Desde">
          <label class="label" >Hasta</label>
          <input class="input" v-model="hasta"  type="date" placeholder="Hasta">
        </section>
        <footer class="modal-card-foot">
          <button @click="handleModal()" class="button">Cancelar</button>
          <button  @click="createNew()" class="button is-success">Guardar</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import Button from '@/shared-components/Button'
import config from '@/config'
import Client from '@/client'
import Navbar from '@/shared-components/Navbar.vue'
import moment from 'moment'

export default {
  name: 'JournalEntry',
  components: {
    Button,
    Navbar
  },
  data: () => ({
    logs: [],
    modal: '',
    desde: null,
    hasta: null,
    toProcessLogs: []
  }),
  methods: {
    async createNew () {
      if (!moment(this.desde).isBefore(this.hasta) && !(moment(this.desde).isSame(this.hasta))) return alert('Favor validar las fechas Desde y Hasta')

      this.toProcessLogs = this.logs.filter(l => l.estado === 'NC' && moment(l.createdAt.split('T')[0]).isBetween(this.desde, this.hasta, null, []))
      console.log(this.toProcessLogs)

      this.toProcessLogs.forEach(async l => {
        let entry = await this.saveNewEntry(l)

        if (entry.idEntradaContable) {
          let client = new Client({uri: config.uri})
          await client.updateLog({logId: l.logId}, {estado: 'C', asientoId: (entry.idEntradaContable).toString()})
          alert('Asiento generado correctamente!')
          await this.getAllLogs()
        }
      })
      this.handleModal()
      // true
      // try {
      //   let client = new Client({ uri: config.uri })
      //   let created = await client.saveNewEntry()
      //   console.log(created)
      //   alert('Nueva Entrada Creada Correcta')
      // } catch (error) {
      //   alert('Ha ocurrido un error')
      //   console.log(error)
      // }
    },
    async saveNewEntry (log) {
      let client = new Client({uri: config.uri})
      let debito = 0
      let credito = 0

      if (log.tipoMovimiento.descripcion === 'Debito') {
        debito = parseInt(log.articulo.costo) * parseInt(log.cantidad)
        credito = 0
      } else {
        credito = parseInt(log.articulo.costo) * parseInt(log.cantidad)
        debito = 0
      }
      let entry = await client.saveNewEntry({
        'descripción': `Inventario ${log.tipoMovimiento.descripcion} ${log.articulo.descripcion}`,
        'idAuxiliar': 1,
        'idCuentasContables': 5,
        'idSisAuxiliar': 8,
        'estado': 'Activo',
        'idTiposMonedas': 2,
        'montoDebito': debito,
        'monto': credito
      })

      return entry
    },
    async getAllLogs () {
      let client = new Client({uri: config.uri})
      this.logs = await client.getAllLogs()
      console.log(this.logs)
    },
    formatDate (date) {
      console.log(date)
      return moment(date).locale('es')
    },
    handleModal () {
      if (this.modal === '') {
        this.modal = ' is-active'
      } else {
        this.modal = ''
        this.desde = null
        this.hasta = null
      }
    }
  },
  async mounted () {
    await this.getAllLogs()
  }
}
</script>

<style scoped>
  .entry {
    width: 100%;
    height:25em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mnavbar {
    width: 100%;
  }
  .header-title {
    margin-top: 2em;
  }
  .table {
    margin-top: 5em;
    width: 100%;
  }
  .label {
    display: flex;
    margin-top: 2em;
  }
  .label:first-child {
    margin-top: 0em;
  }
</style>
