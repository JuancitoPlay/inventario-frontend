<template>
  <nav class="navbar ">
  <div class="navbar-brand">
    <a class="navbar-item" href="#">
     INVENTARIO
    </a>

    <a class="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
      <span class="icon" style="color:  #333;">
        <i class="fa fa-github"></i>
      </span>
    </a>

    <a class="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
      <span class="icon" style="color: #55acee;">
        <i class="fa fa-twitter"></i>
      </span>
    </a>

    <a role="button" :class="`navbar-burger ${mobileDisplay}`" @click="handleMobileDisplay" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>

  </div>

  <div v-if="isLogged" id="navMenubd-example" :class="`navbar-menu ${mobileDisplay}`">
    <div class="navbar-start">
      <div class="navbar-item has-dropdown is-hoverable">
        <!-- <div class="navbar-link">
          More
        </div> -->
        <!-- <div id="moreDropdown" class="navbar-dropdown ">
          <a class="navbar-item " href="http://bulma.io/extensions/">
            <div class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <p>
                    <strong>Extensions</strong>
                    <br>
                    <small>Side projects to enhance Bulma</small>
                  </p>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <span class="icon has-text-info">
                    <i class="fa fa-plug"></i>
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div> -->
      </div>
      <router-link to="/stores" class="navbar-item">
        <span class="bd-emoji">🏢</span> &nbsp;Almacenes
      </router-link>
      <router-link to="/inventarios" class="navbar-item">
        <span class="bd-emoji">📦</span> &nbsp;Inventarios
      </router-link>
      <router-link to="/articulos" class="navbar-item">
        <span class="bd-emoji">📦</span> &nbsp;Articulos
      </router-link>
      <router-link to="/movimientos" class="navbar-item">
        <span class="bd-emoji">🗃️</span> &nbsp;Transacciones
      </router-link>
      <router-link to="/entrada-diario" class="navbar-item">
        <span class="bd-emoji">🤑</span> &nbsp;Contabilidad
      </router-link>
      <router-link to="/logout" class="navbar-item">
        <span class="bd-emoji">🏃</span> &nbsp;Cerrar Sesión
      </router-link>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  name: 'Navbar',
  methods: {
    handleMobileDisplay () {
      if (this.mobileDisplay === '') this.mobileDisplay = 'is-active'
      else this.mobileDisplay = ''
    }
  },
  data: () => ({
    mobileDisplay: '',
    isLogged: (localStorage && localStorage !== '')
  }),
  beforeMount () {
    if (!localStorage || localStorage === '') this.isLogged = false
    else this.isLogged = true
  }
}
</script>
<style scoped>
.navbar-item.is-mega {
  position: static;
}

.navbar-item.is-mega .is-mega-menu-title {
    margin-bottom: 0;
    padding: .375rem 1rem;
  }
  .navbar {
    background-color: #29b6f6;
    margin-bottom:3em;
    font-weight: bold;
  }
</style>
