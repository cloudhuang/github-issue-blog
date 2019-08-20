<template>
  <div class="container">
    <div class="loading" v-if="isLoading">
      <div class="loader"></div>
      <div class="tips">加载中......</div>
    </div>

    <div v-if="!isLoading">
      <ul class="blogs">
        <li class="item" v-for="issue in issues">
          <a href="javascript:void(0)" @click="gotoBlog(issue.number)">{{issue.title}}</a>
        </li>
      </ul>

      <ul class="pagination pagination-sm justify-content-end">
        <li class="page-item" :class="{ active: page.current === num }" v-for="num in page.total">
          <a
            class="page-link"
            href="javascript:void(0)"
            @click="gotoPage(num)"
            tabindex="-1"
          >{{num}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getIssues } from "./api";
export default {
  name: "GithubIssiesBlog",
  data() {
    return {
      isLoading: true,
      issues: [],
      page: {
        current: 1,
        total: 0
      }
    };
  },
  mounted() {
    this.issues = [];
    this.getGithubIssues();
  },
  methods: {
    gotoBlog(number) {
      this.$router.push({
        name: "blog",
        params: {
          number: number
        }
      });
    },
    gotoPage(page) {
      this.page.current = page;
      this.getGithubIssues();
    },
    getGithubIssues() {
      this.isLoading = true;
      getIssues(this.page.current)
        .then(res => {
          this.issues = res.data;

          if (this.issues.length > 0 && this.page.total === 0) {
            this.page.total = this.resolvePage(res.headers.link);
          }
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    /**
     * resolve github issues page header and return the total page
     */
    resolvePage(link) {
      if (link) {
        let links = link.split(",");

        for (var index in links) {
          var link = links[index];
          if (link.indexOf("last") > -1) {
            var matches = link.match(/(page=\d+)/);
            var page = matches[0];

            if (page) {
              return page.replace("page=", "") * 1;
            }
          }
        }
      }
      return 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
ul {
  list-style-type: none;
}

.blogs {
  .item {
    padding: 10px;
  }
}
</style>
