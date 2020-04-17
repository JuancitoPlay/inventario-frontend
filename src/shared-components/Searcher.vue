<template>
  <div class="searcher">
    <InputText @newChange="handleChange" isSearch="true" placeholder="Buscar..." />
  </div>
</template>

<script>
import InputText from '@/shared-components/InputText'
export default {
  name: 'Searcher',
  components: {
    InputText
  },
  props: ['list'],
  methods: {
    handleChange (newValue) {
      // let filtered = arraySort(JSON.parse(JSON.stringify(this.list)), newValue)
      let filtered = this.list.filter(i => {
        let keys = Object.keys(i)
        for (let iterator of keys) {
          if (typeof i[iterator] === 'string') {
            console.log(i[iterator].toLowerCase(), newValue.toLowerCase(), typeof i[iterator] === 'string')
            if ((i[iterator]).toLowerCase().search(newValue.toLowerCase()) !== -1) {
              return true
            }
          }
        }
        return false
      })
      this.$emit('newFiltered', filtered)
    }
  }
}
</script>

<style scoped>
  .searcher {
    display:block;
    width:100%;
    padding-top:1em;
    padding-bottom:1em;
  }
  InputText {
    width:100%;
  }
</style>
