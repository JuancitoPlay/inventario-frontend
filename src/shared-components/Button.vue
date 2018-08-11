<template>
  <a @click.prevent="handleClick" class="button is-success">{{this.label}}</a>
</template>

<script>
export default {
  name: 'Button',
  props: ['label', 'handleClick']
}
</script>

<style scoped>

</style>
