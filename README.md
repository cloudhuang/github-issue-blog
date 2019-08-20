Github issues blog
==============================================

使用Github Issue API接口的简单的博客应用。

## 如何使用
1. 修改 `index.html`页面的 **title**
2. 配置`config.js`中的`title`，`username`和`repository`项。

_参数说明:_

- title: 博客名称
- username: Github的用户名
- repository: 作为博客的仓库名称，所有的博客都位于该仓库的"Issue"中

3. 打包
`npm run build`
后将dist目录中的所有文件push到仓库中。