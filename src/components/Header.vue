<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="/">{{title}}</a>

    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
      </ul>
    </div>
  </nav>
</template>

<script>
import config from "../../config";
export default {
  name: "Header",
  data() {
    return {
      title: config.title,
      labels: []
    };
  }
};
</script>

<style lang="scss" scoped>
</style>