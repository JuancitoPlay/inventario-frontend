<template>
  <div class="modal" :class="{ 'is-active': isActive }">>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button @click="close" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <slot name="content"></slot>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="close" >Cerrar</button>
        <button class="button is-success" @click="save">Guardar</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: ['title', 'save', 'close', 'isActive']
}
</script>

<style scoped>
  footer {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
</style>
