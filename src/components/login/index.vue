<template>
  <div class="login">
    <div class="container">
      <InputText label="👨🏼‍💻 Usuario" />
      <InputHiddenText label="🔑 Contraseña" />
    </div>
  </div>
</template>
<script>
import InputText from '@/shared-components/InputText'
import InputHiddenText from '@/shared-components/InputHiddenText'
export default {
  name: 'Login',
  components: {
    InputText,
    InputHiddenText
  }
}
</script>
<style scoped>
  .login{
    height: 100%;
    width: 100%;
    display:flex;
    justify-content: center;
  }
  .container {
    height:40%;
    width: 40%;
    padding-top:10em;
  }
</style>
