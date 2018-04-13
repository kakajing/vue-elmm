# vue-elmm

> 此项目是重构饿了么45个单页应用



## 技术栈

vue2 + vuex + vue-router + axios + webpack + ES6 + sass + flex + svg

## 数据相关

项目所用到的数据是通过参考饿了么官网获取数据

## 文章链接

在写项目的同时也会相继有记录项目开发过程的相关文章：

[饿了么45个页面重构（一）框架搭建](https://kakajing.github.io/2018/01/18/%E5%90%83%E4%BA%86%E5%90%97%E5%95%86%E5%9F%8E%E5%BC%80%E5%8F%91%EF%BC%88%E4%B8%80%EF%BC%89%E6%A1%86%E6%9E%B6%E6%90%AD%E5%BB%BA/)

[饿了么45个页面重构（二）：axios的应用及首页和city页面相关](https://kakajing.github.io/2018/01/20/%E5%90%83%E4%BA%86%E5%90%97%E5%95%86%E5%9F%8E%E5%BC%80%E5%8F%91%EF%BC%88%E4%BA%8C%EF%BC%89%EF%BC%9Aaxios%E7%9A%84%E5%BA%94%E7%94%A8%E5%8F%8A%E9%A6%96%E9%A1%B5%E5%92%8Ccity%E9%A1%B5%E9%9D%A2%E7%9B%B8%E5%85%B3/)

[饿了么45个页面重构（三）轮播图及msite页面开发](https://kakajing.github.io/2018/02/01/%E9%A5%BF%E4%BA%86%E4%B9%88%E5%95%86%E5%9F%8E%E5%BC%80%E5%8F%91%EF%BC%88%E4%B8%89%EF%BC%89msite%E9%A1%B5%E9%9D%A2%E7%9B%B8%E5%85%B3/)

[饿了么45个页面重构（四）：vuex的使用和food页面开发一](https://kakajing.github.io/2018/02/04/%E9%A5%BF%E4%BA%86%E4%B9%88%E5%95%86%E5%9F%8E%E5%BC%80%E5%8F%91%EF%BC%88%E5%9B%9B%EF%BC%89%EF%BC%9Avuex%E7%9A%84%E4%BD%BF%E7%94%A8%E5%92%8Cfood%E9%A1%B5%E9%9D%A2%E5%BC%80%E5%8F%91%E4%B8%80/)

[饿了么45个页面重构（五）transition动画使用及food页面开发二](https://kakajing.github.io/2018/02/05/%E9%A5%BF%E4%BA%86%E4%B9%88%E5%95%86%E5%9F%8E%E5%BC%80%E5%8F%91%EF%BC%88%E4%BA%94%EF%BC%89food%E9%A1%B5%E9%9D%A2%E5%BC%80%E5%8F%91%E4%BA%8C/)

[饿了么45个页面重构（六）：搜索页面开发](https://kakajing.github.io/2018/02/12/%E9%A5%BF%E4%BA%86%E4%B9%8845%E4%B8%AA%E9%A1%B5%E9%9D%A2%E9%87%8D%E6%9E%84%EF%BC%88%E5%85%AD%EF%BC%89%EF%BC%9A%E6%90%9C%E7%B4%A2%E9%A1%B5%E9%9D%A2%E5%BC%80%E5%8F%91/)

[饿了么45个页面重构（七）：v-if与v-show的区别及shop组件开发](https://kakajing.github.io/2018/03/22/%E9%A5%BF%E4%BA%86%E4%B9%8845%E4%B8%AA%E9%A1%B5%E9%9D%A2%E9%87%8D%E6%9E%84%EF%BC%88%E4%B8%83%EF%BC%89%EF%BC%9Av-if%E4%B8%8Ev-show%E7%9A%84%E5%8C%BA%E5%88%AB%E5%8F%8Ashop%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91/)



## Build Setup

### 注意：

项目下载完先npm install，然后npm run dev运行后会发现报这样的错：

`Module build failed: Error: Cannot find module 'node-sass'`

解决方法：

`npm install node-sass sass-loader --save-dev`

安装完后运行项目就正常了。

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
