import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
new Vue({
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
