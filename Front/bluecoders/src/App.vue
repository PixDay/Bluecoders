<template>
  <div class="vue-tempalte">
    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import axios from "axios";

  export default {
    name: "App",
    data() {
      return {
        data: {}
      };
    },
  };
</script>