import Vue from 'vue'
import App from './App'

import '../theme/index.css'
import ElementUI from 'element-ui'

import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
