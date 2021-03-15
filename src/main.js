import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";

Vue.config.productionTip = false;

// 引入对应组件
import "@/plugins/element.js";
// 导入element-ui样式
import "element-ui/lib/theme-chalk/index.css";
// 导入全局样式
import "@/assets/index.css";
// // 导入element-ui
// import ElementUI from 'element-ui';
// // 导入element-ui样式
// import 'element-ui/lib/theme-chalk/index.css';
// // Vue引用组件
// Vue.use(ElementUI);

// 创建过滤器将秒数过滤为年月日，时分秒
Vue.filter("formatDuration", (dt) => {
  // 转分
  let min = Math.ceil(dt / 1000 / 60);
  min = min < 10 ? "0" + min : min;
  // 秒
  let sec = Math.ceil((dt / 1000) % 60);
  sec = sec < 10 ? "0" + sec : sec;
  return min + ":" + sec;
});

// 创建过滤器将播放量过滤为——万
Vue.filter('playNumFormat', function (playCount) {
  if (playCount > 100000) {
    return parseInt(playCount / 10000) + '万'
  }
  return playCount
})
new Vue({
  // 将路由挂载到Vue实例上
  router, // router：router
  render: (h) => h(App),
}).$mount("#app");
