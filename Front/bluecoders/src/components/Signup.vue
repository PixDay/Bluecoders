<template>
  <div class="vue-tempalte">
      <h3>Register</h3>
      <div class="form-group">
        <label>Firstname</label>
        <input type="text" class="form-control form-control-lg" name="firstname" v-model="firstname" required/>
      </div>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control form-control-lg" name="name" v-model="name" required/>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control form-control-lg" name="mail" v-model="mail" required/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" name="password" v-model="password" required/>
      </div>
      <button class="btn btn-success btn-lg btn-block" v-on:click="createUser()">Register</button>
      <a class="btn btn-primary btn-lg btn-block"><router-link :to="{name: 'login'}" class="white-link">I have an account</router-link></a>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        postBody: '',
        errors: [],
        firstname: '',
        name: '',
        mail: '',
        password: ''
      }
    },
    methods: {
      createUser() {
        console.log("CREATING USER");
        const data = axios.post("http://localhost:4000/register", {firstname: this.firstname, name: this.name, mail: this.mail, password: this.password}).then((response) => {
  console.log(response);
}, (error) => {
  console.log(error);
});
        this.data = data;
        console.log("DATA : ");
        console.log(data);
        new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
</script>