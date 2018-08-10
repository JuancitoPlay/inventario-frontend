<template>
  <div class="field">
    <div class="control">
      <label>{{label}}</label>
      <input :readonly="disabled" :placeholder="placeholder" class="input is-info" @keyup.prevent="handleChange" type="password" :value="value">
    </div>
</div>
</template>
<script>
export default {
  name: 'InputHiddenText',
  props: ['label', 'value', 'disabled', 'placeholder', 'isSearch'],
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
