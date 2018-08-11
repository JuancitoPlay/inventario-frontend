<template>
  <div class="field">
    <div class="control">
      <div class="select is-info">
        <select :readonly="disabled" :placeholder="placeholder" class="input is-info" @change.prevent="handleChange" type="text" :value="value">
          <option v-for="item in options" :key="item.value">{{item.description}}</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputSelect',
  props: ['label', 'value', 'disabled', 'placeholder', 'options'],
  methods: {
    handleChange (e) {
      console.log(e)
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
