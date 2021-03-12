// 主体
<template>
  <div class="index-container">
    <!-- 左侧的导航 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">发现音乐</router-link>
        </li>
        <li>
          <router-link to="/playlists">推荐歌单</router-link>
        </li>
        <li>
          <router-link to="/songs">最新音乐</router-link>
        </li>
        <li>
          <router-link to="/mvs">最新MV</router-link>
        </li>
      </ul>
    </div>
    <!-- 右侧的容器 -->
    <div class="main">
      <!-- <discovery></discovery> -->
      <!-- 路由的出口 地址命中之后，把组件显示出来的位置 -->
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <div class="player">
      <audio :src="musicUrl" autoplay controls id="music"></audio>
    </div>
  </div>
</template>
<script>
// // 发现音乐组件
// import discovery from './03.discovery.vue'
export default {
  name: "index",
  data() {
    return {
      musicUrl: "http://m7.music.126.net/20200303182550/8aa5971b1630d1527a922ccd2b97f392/ymusic/035d/0109/520e/478f86cc9f6c6539f7c8ed3e06c1bf8e.mp3"
    };
  }
  // 注册组件
  //   components: {
  //     // 发现音乐组件
  //     discovery, // discovery: discovery可省略
  //   }
};
</script>
<style lang="less" scoped>
// .index {
//   // 设置父组件弹性布局
//   display: flex;
//   height: 830px;
// }
// .index .nav {
//   background-color: #ededed;
//   width: 200px;
//   height: 100%;
// }
// .index .nav li {
//   text-align: center;
//   margin: 10px;
// }
// .main {
//   background-color: orange;
//   // 使用剩余的尺寸
//   flex: 1;
// }
// // 设计高亮的效果
// a.router-link-active {
//   color: white;
//   background-color: orange;
// }
// .player {
//   background: #f1f3f4;
//   height: 60px;
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   width: 100%;
// }
</style>
