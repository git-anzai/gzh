// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import http from './utils/request'
import {Api} from './utils/request'

Vue.config.productionTip = false;
Vue.use(iView);
Vue.prototype.$http = http;
Vue.prototype.Api = Api;


/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
