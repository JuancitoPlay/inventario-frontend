import axios from 'axios'

class Client {
  uri = null;
  accountingUri = 'https://simpleaccountingapp-api.azurewebsites.net'
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
    let endpoint = '/api/articulo/guardar'
    let options = {
      method: 'POST',
      data: {
        articulo: article
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
    let endpoint = '/api/almacen/modificar'
    let options = {
      method: 'PUT',
      data: {
        articuloViejo: oldArticle,
        articuloNuevo: newArticle
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
