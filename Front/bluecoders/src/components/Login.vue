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
      <a type="submit" class="btn btn-success btn-lg btn-block"><router-link :to="{name: 'todolist'}" tag="white-link">Login</router-link></a>
      <a class="btn btn-primary btn-lg btn-block"><router-link :to="{name: 'signup'}" tag="white-link">Create an account</router-link></a>
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