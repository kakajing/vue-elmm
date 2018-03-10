import Vue from 'vue'
import App from './App'
import fasetClick from 'fastclick'
import router from './router'
import store from './store'
import './common/js/rem'

Vue.config.productionTip = false

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fasetClick.attach(document.body)
  }, false)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
