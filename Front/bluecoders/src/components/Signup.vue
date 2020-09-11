<template>
  <div class="vue-tempalte">
    <form>
      <h3>Register</h3>
      <div class="form-group">
        <label>Firstname</label>
        <input type="text" class="form-control form-control-lg" required/>
      </div>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control form-control-lg" required/>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control form-control-lg" required/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" required/>
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Register</button>
      <button class="btn btn-primary btn-lg btn-block"><router-link :to="{name: 'login'}" tag="white-link">Login</router-link></button>
    </form>
  </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>