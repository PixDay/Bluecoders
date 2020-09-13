<template>
  <div class="vue-tempalte">
    <form>
      <h3>Login</h3>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control form-control-lg" required/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" required/>
      </div>
      <router-link :to="{name: 'todolist'}" class="white-link"><button type="submit" class="btn btn-success btn-lg btn-block">Login</button></router-link>
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
          }, (error) => {
            console.log(error);
        });
        this.data = data;
        
        console.log(data);
      }
    }
  }
</script>