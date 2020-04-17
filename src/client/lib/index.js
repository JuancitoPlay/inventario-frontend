import axios from 'axios'

class Client {
  uri ='';
  accountingUri = 'https://sistemacontabilidad5.azurewebsites.net'
  constructor ({uri}) {
    console.log('initialized...')
    this.uri = uri
  }
  async getAllStores () {
    let endpoint = '/api/almacen/buscaralmacenes'
    let response = await axios(this.uri + endpoint, {method: 'GET'})
    return response.data
  }
  async getAllArticles () {
    let endpoint = '/api/articulo/buscararticulos'
    let response = await axios(this.uri + endpoint, {method: 'GET'})
    return response.data
  }
  async getAllInventories () {
    let endpoint = '/api/inventario'
    let response = await axios(this.uri + endpoint, {method: 'GET'})
    return response.data
  }
  async saveStore (store) {
    let endpoint = '/api/almacen/crear'
    let options = {
      method: 'POST',
      data: {
        almacen: {
          descripcion: store.description
        }
      }
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }
  async saveArticle (article) {
    article.proveedorId = 'f101523e-b3ad-44c3-ada4-3c45e63012e6'
    article.precio = article.costo
    console.log(article)
    // let lastEntry = await this.getLastEntry()
    let endpoint = '/api/articulo/guardar'
    let options = {
      method: 'POST',
      data: {
        articulo: article
      }
    }
    let response = await axios(this.uri + endpoint, options)
    // let entryItem = {
    //   journalEntryId: lastEntry.id,
    //   accountId: 19,
    //   reference: `Obtenido ${article.cantidad} x ${article.descripcion}`,
    //   debit: parseInt(article.cantidad) * parseInt(article.costo),
    //   credit: 0
    // }
    // await this.saveNewEntryItem(entryItem)
    // entryItem = {
    //   journalEntryId: lastEntry.id,
    //   accountId: 6,
    //   reference: `Entrada: ${article.cantidad} x ${article.descripcion}`,
    //   debit: 0,
    //   credit: parseInt(article.cantidad) * parseInt(article.costo)
    // }
    // await this.saveNewEntryItem(entryItem)
    return response.data
  }
  async saveNewEntry (entrada) {
    let endpoint = '/api/log/accountingEntry'
    let options = {
      method: 'POST',
      data: entrada
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }

  async saveNewEntryItem (item) {
    let endpoint = '/journalItems'
    let options = {
      method: 'POST',
      data: item
    }
    let response = await axios(this.accountingUri + endpoint, options)
    return response.data
  }

  async getLastEntry () {
    let endpoint = '/journalEntries'
    let options = {
      method: 'GET'
    }
    let response = await axios(this.accountingUri + endpoint, options)
    let entries = response.data.filter(i => i.AuxiliaryId === 4)
    if (entries.length > 0) return entries[(entries.length - 1)]
    return []
  }
  async getAllEntries () {
    let endpoint = '/journalEntries'
    let options = {
      method: 'GET'
    }
    let response = await axios(this.accountingUri + endpoint, options)
    let entries = response.data.filter(i => i.AuxiliaryId === 4)
    if (entries.length > 0) return entries
    return []
  }

  async getEntryById (id) {
    let entries = await this.getAllEntries()
    entries = entries.filter(i => i.id === parseInt(id))
    if (entries.length > 0) return entries[0]
    return null
  }
  async getAllEntryItemsById (id) {
    let endpoint = '/journalItems'
    let options = {
      method: 'GET'
    }
    let response = await axios(this.accountingUri + endpoint, options)
    let entries = response.data.filter(i => i.journalEntryId === parseInt(id))
    if (entries.length > 0) return entries
    return []
  }

  async getStoreById (id) {
    let endpoint = '/api/almacen/buscar'
    let options = {
      method: 'GET',
      params: {
        almacen: {
          almacenId: id
        }
      }
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }

  async getArticleById (id) {
    let endpoint = '/api/articulo/buscar/' + id
    let options = {
      method: 'GET'
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }

  async getInventoryById (id) {
    let endpoint = '/api/inventario/' + id
    let options = {
      method: 'GET'
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }
  async getUser (user) {
    try {
      let endpoint = '/api/usuario/buscar'
      let options = {
        method: 'POST',
        data: {
          usuario: user
        }
      }
      let response = await axios(this.uri + endpoint, options)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  async updateStore (oldStore, newStore) {
    let endpoint = '/api/almacen/modificar'
    let options = {
      method: 'PUT',
      data: {
        almacenViejo: oldStore,
        almacenNuevo: newStore
      }
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }
  async updateArticle (oldArticle, newArticle) {
    console.log(JSON.stringify(newArticle))
    let endpoint = '/api/articulo/modificar'
    let nuevaCantidad = 0

    if (newArticle.form) {
      nuevaCantidad = newArticle.form.cantidad
    } else {
      nuevaCantidad = newArticle.cantidad
    }
    let options = {
      method: 'PUT',
      data: {
        articuloViejo: oldArticle,
        articuloNuevo: {cantidad: nuevaCantidad}
      }
    }
    // if (parseInt(newArticle.form.cantidad) < parseInt(newArticle.form.old.cantidad)) { // se rebajó
    // let lastEntry = await this.getLastEntry()
    // let rebajado = parseInt(newArticle.form.old.cantidad) - parseInt(newArticle.form.cantidad)
    // let entryItem = {
    //   journalEntryId: lastEntry.id,
    //   accountId: 6,
    //   reference: `Rebajado ${rebajado} x ${newArticle.form.old.descripcion}`,
    //   debit: parseInt(rebajado) * parseInt(newArticle.form.old.costo),
    //   credit: 0
    // }
    // await this.saveNewEntryItem(entryItem)

    // entryItem = {
    //   journalEntryId: lastEntry.id,
    //   accountId: 19,
    //   reference: `Rebajado ${rebajado} x ${newArticle.form.old.descripcion}`,
    //   debit: 0,
    //   credit: parseInt(rebajado) * parseInt(newArticle.form.old.costo)
    // }
    // await this.saveNewEntryItem(entryItem)
    // } else if (parseInt(newArticle.form.cantidad) > parseInt(newArticle.form.old.cantidad)) { // se rebajó
    //   let lastEntry = await this.getLastEntry()
    //   let rebajado = parseInt(newArticle.form.cantidad) - parseInt(newArticle.form.old.cantidad)
    //   let entryItem = {
    //     journalEntryId: lastEntry.id,
    //     accountId: 6,
    //     reference: `Aumentado ${rebajado} x ${newArticle.form.old.descripcion}`,
    //     debit: 0,
    //     credit: parseInt(rebajado) * parseInt(newArticle.form.old.costo)
    //   }
    //   await this.saveNewEntryItem(entryItem)

    //   entryItem = {
    //     journalEntryId: lastEntry.id,
    //     accountId: 19,
    //     reference: `Aumentado ${rebajado} x ${newArticle.form.old.descripcion}`,
    //     debit: parseInt(rebajado) * parseInt(newArticle.form.old.costo),
    //     credit: 0
    //   }
    //   await this.saveNewEntryItem(entryItem)
    // }

    let response = await axios(this.uri + endpoint, options)
    return response.data
  }
  async signToken (user) {
    let endpoint = '/api/token/sign'
    let options = {
      method: 'POST',
      data: {
        datos: user
      }
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }
  async validateToken () {
    let endpoint = '/api/token/validate'
    let options = {
      method: 'GET',
      headers: {Authorization: localStorage._t}
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }
  async updateInventory (oldInventory, newInventory) {
    console.log(oldInventory, newInventory)
    let endpoint = '/api/inventario/'
    // let lastEntry = await this.getLastEntry()

    let options = {
      method: 'PUT',
      data: {
        inventarioViejo: oldInventory,
        inventarioNuevo: newInventory
      }
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }
  async saveLog (log) {
    let endpoint = '/api/log/'
    let options = {
      method: 'POST',
      data: {
        log
      }
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }
  async getAllLogs () {
    let endpoint = '/api/log'
    let response = await axios(this.uri + endpoint, {method: 'GET'})
    return response.data.response
  }

  async updateLog (oldLog, newLog) {
    let endpoint = '/api/log/'
    let options = {
      method: 'PUT',
      data: {
        logViejo: oldLog,
        logNuevo: newLog
      }
    }
    let response = await axios(this.uri + endpoint, options)
    return response.data
  }
}
export default Client
