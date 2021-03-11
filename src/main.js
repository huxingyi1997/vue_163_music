import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 引入对应组件
import './plugins/element.js'
// 导入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
// // 导入element-ui
// import ElementUI from 'element-ui';
// // 导入element-ui样式
// import 'element-ui/lib/theme-chalk/index.css';
// // Vue引用组件
// Vue.use(ElementUI);

new Vue({
  // 将路由挂载到Vue实例上
  router, // router：router
  render: h => h(App)
}).$mount('#app')
