import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  nprogress.start();
  next();
})

router.afterEach(() => {
  nprogress.done();
})
Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
