// 引入库文件
// 引入Vue
import Vue from "vue";
// 引入Vuex
import Vuex from "vuex";

// 将Vuex挂载到Vue上
Vue.use(Vuex);

// 导出Vuex Store
export default new Vuex.Store({
  state: {
    musicUrl: "",
  },
});
