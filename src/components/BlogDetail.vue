<template>
  <div class="container">
    <div class="loading" v-if="isLoading">
      <div class="loader"></div>
      <div class="tips">加载中......</div>
    </div>
    <div v-if="!isLoading">
      <h1>{{title}}</h1>
      <small>{{formatDate(updated_at)}}</small>
      <small>
        <span v-for="label in labels">| {{label.name}}</span>
      </small>
      <hr />
      <div class="body" v-html="html" highlight></div>
    </div>
  </div>
</template>

<script>
import showdown from "showdown";
import showdownHighlight from "showdown-highlight";
import { getIssue } from "./api";
export default {
  name: "BlogDetail",
  data() {
    return {
      isLoading: true,
      title: "",
      body: "",
      updated_at: null,
      html: "",
      labels: [],
      converter: new showdown.Converter({
        extensions: [showdownHighlight]
      })
    };
  },
  mounted() {
    let number = this.$route.params.number;
    getIssue(number)
      .then(res => {
        this.title = res.data.title;
        this.body = res.data.body;
        this.updated_at = res.data.updated_at;
        this.labels = res.data.labels;
        this.html = this.converter.makeHtml(this.body);
        this.isLoading = false;
      })
      .catch(error => {
        this.isLoading = false;
      });
  },
  methods: {
    formatDate(date) {
      if (date) {
        return date.replace("T", " ").substr(0, 19);
      }
      return date;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
