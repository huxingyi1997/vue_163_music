import Vue from "vue";
import App from "@/App.vue";
// 导入路由
import router from "@/router";
// 导入Vuex
import store from '@/store'

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
Vue.filter("playNumFormat", function(playCount) {
  if (playCount > 100000) {
    return parseInt(playCount / 10000) + "万";
  }
  return playCount;
});

// 将时间转换为年月日时分秒
Vue.filter("dateFormat", function(originVal) {
  const dt = new Date(originVal);

  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");

  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const ss = (dt.getSeconds() + "").padStart(2, "0");

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});
new Vue({
  // 将路由挂载到Vue实例上
  router, // router：router
  // 将Vuex挂载到Vue实例上
  store, // store：store
  render: (h) => h(App),
}).$mount("#app");
