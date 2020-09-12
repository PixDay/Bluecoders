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
      <a type="submit" class="btn btn-success btn-lg btn-block"><router-link :to="{name: 'todolist'}" class="white-link">Login</router-link></a>
      <a class="btn btn-primary btn-lg btn-block"><router-link :to="{name: 'signup'}" class="white-link">Create an account</router-link></a>
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
        const data = axios.post("http://localhost:4000/register", {firstname: this.firstname, name: this.name, mail: this.mail, password: this.password}).then((response) => {
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