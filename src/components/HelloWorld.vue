<template>
  <div class="hello">
    <InputText :onClick="myClick" label="Una simple prueba" value="asdas"/>
    <StoreList :stores="stores" />
  </div>
</template>

<script>
import InputText from '@/shared-components/InputText.vue'
import StoreList from '@/components/Store-list.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      myClick () {
        alert('He sido cliqueado!')
      },
      stores: [{d: 'sadsadasdsd'}]
    }
  },
  components: {
    InputText: InputText,
    StoreList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
