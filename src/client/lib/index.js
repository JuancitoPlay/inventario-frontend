import axios from 'axios'

class Client {
  uri = null;
  constructor ({uri}) {
    console.log('initialized...')
    this.uri = uri
  }
  async getAllStores () {
    let endpoint = '/api/almacen/buscaralmacenes'
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
    let endpoint = '/api/inventario/'
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
}
export default Client
