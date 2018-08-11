<template>
  <div class="login">
    <div class="container">
      <InputText @newChange="handleUser" label="👨🏼‍💻 Usuario"  />
      <InputHiddenText @newChange="handlePassword" label="🔑 Contraseña"  />
      <Button :handleClick="handleLogin" class="login-button" label="Iniciar Sesión" />
    </div>
  </div>
</template>
<script>
import InputText from '@/shared-components/InputText'
import InputHiddenText from '@/shared-components/InputHiddenText'
import Button from '@/shared-components/Button'
import config from '@/config'
import Client from '@/client'
export default {
  name: 'Login',
  components: {
    InputText,
    InputHiddenText,
    Button
  },
  data: () => ({
    user: '',
    password: ''
  }),
  methods: {
    async handleLogin () {
      try {
        let client = new Client({ uri: config.uri })
        let user = await client.getUser({ usuario: this.user, contrasena: this.password })
        if (!user.usuarioId) throw new Error('Not User')
        let token = await client.signToken(user)
        console.log(token)
        localStorage._t = token.token
        this.$router.push('/stores')
      } catch (error) {
        alert('Usuario y/o contraseña no disponible')
      }
    },
    handleUser (newUser) {
      this.user = newUser
    },
    handlePassword (newPassword) {
      this.password = newPassword
    }
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
  .login-button {
    align-self: flex-end;
  }
</style>
