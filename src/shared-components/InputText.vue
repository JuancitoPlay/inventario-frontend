<template>
  <div class="field">
    <div class="control">
      <label>{{label}}</label>
      <input :readonly="disabled" :placeholder="placeholder" class="input is-info" @keyup.prevent="handleChange" :type="type || 'text'" :value="value">
    </div>
</div>
</template>
<script>
export default {
  name: 'InputText',
  props: ['label', 'value', 'disabled', 'placeholder', 'type'],
  methods: {
    handleChange (e) {
      this.$emit('newChange', e.target.value)
    }
  }
}
</script>

<style scoped>
  label {
    font-weight: bold;
  }
</style>
