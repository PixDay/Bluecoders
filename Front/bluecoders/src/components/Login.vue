<template>
  <div class="vue-tempalte">
    <form>
      <h3>Login</h3>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control form-control-lg" v-model="mail" required/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" v-model="password" required/>
      </div>
      <button type="submit" class="btn btn-success btn-lg btn-block" v-on:click="connect()">Login</button>
      <br>
      <router-link :to="{name: 'signup'}" class="white-link"><button class="btn btn-primary btn-lg btn-block">Create an account</button></router-link>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        postBody: '',
        errors: [],
        mail: '',
        password: ''
      }
    },
    methods: {
      connect() {
        const data = axios.post("http://localhost:4000/login", {mail: this.mail, password: this.password}).then((response) => {
            console.log(response);
            localStorage.setItem('user-token', response);
          }, (error) => {
            localStorage.removeItem('user-token');
            console.log(error);
        });
        this.data = data;
        this.$router.push('todolist');
      }
    }
  }
</script>