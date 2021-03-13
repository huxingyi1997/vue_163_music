import Vue from "vue";
// 导入路由 vue-router
import VueRouter from "vue-router";

// 使用路由 vue-router
Vue.use(VueRouter);

// 导入需要的路由管理组件
import discovery from "@/views/01.discovery.vue";
import playlists from "@/views/02.playlists.vue";
import songs from "@/views/03.songs.vue";
import mvs from "@/views/04.mvs.vue";
import result from "@/views/05.result.vue";
import playlist from "@/views/06.playlist.vue";
import mv from "@/views/07.mv.vue";

// 创建路由
const routes = [
  // 配置地址 和 组件的对应关系
  {
    // 空地址
    path: "/",
    // 页面重定向
    redirect: "/discovery"
  },
  {
    // 地址
    path: "/discovery",
    // 组件
    component: discovery,
  },
  {
    // 地址
    path: "/playlists",
    // 组件
    component: playlists,
  },
  {
    // 地址
    path: "/songs",
    // 组件
    component: songs,
  },
  {
    // 地址
    path: "/mvs",
    // 组件
    component: mvs,
  },{
    // 地址
    path: "/result",
    // 组件
    component: result,
  },{
    // 地址
    path: "/playlist",
    // 组件
    component: playlist,
  },{
    // 地址
    path: "/mv",
    // 组件
    component: mv,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
