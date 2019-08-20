import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import GithubIssuesBlog from './components/GithubIssuesBlog.vue'
import BlogDetail from './components/BlogDetail.vue'

Vue.use(VueRouter)
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' //样式文件
Vue.directive('highlight', function(el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})

const routes = [
    { path: '/', name: 'home', component: GithubIssuesBlog },
    { path: '/blogs/:number', name: 'blog', component: BlogDetail },
    { path: '*', redirect: '/' }
]

const router = new VueRouter({
    mode: 'history',
    hashbang: false,
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')