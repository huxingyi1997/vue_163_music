// 主体
<template>
  <div class="index-container">
    <!-- 左侧的导航 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
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
      <!-- 自动播放：autoplay -->
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
      musicUrl: "",
    };
  },
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

.index-container {
  display: flex;
  .nav {
    background-color: #ededed;
    width: 200px;
    height: 100%;
    li {
      height: 60px;
      cursor: pointer;
      display: flex;
      align-items: center;
      .iconfont {
        margin-right: 10px;
        font-size: 20px;
      }
      a {
        color: black;
        padding-left: 30px;
        font-size: 18px;
        line-height: 60px;
        width: 100%;
        height: 100%;
      }
      a.router-link-active {
        color: #dd6d60;
      }
    }
    li:hover {
      background-color: #e7e7e7;
    }
  }
  .main {
    flex: 1;
    overflow-y: scroll;
    padding: 10px 20px;
    div {
      max-width: 1100px;
      margin: 0 auto;
    }
  }
  .player {
    background: #f1f3f4;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  audio {
    width: 100%;
    border-radius: none;
    outline: none;
  }
}
</style>
