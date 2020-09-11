<template>
  <div class="vue-tempalte">
    <form>
      <h3>Sign In</h3>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
      <button class="btn btn-primary btn-lg btn-block"><router-link :to="{name: 'signup'}" tag="white-link">Register</router-link></button>
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