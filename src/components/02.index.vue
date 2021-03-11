// 主体
<template>
    <div class="index">
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
    </div>
</template>
<script>
// // 发现音乐组件
// import discovery from './03.discovery.vue'
export default {
    // 注册组件
//   components: {
//     // 发现音乐组件
//     discovery, // discovery: discovery可省略
//   }
}
</script>
<style lang="less" scoped>
.index {
    // 设置父组件弹性布局
    display: flex;
    height: 830px;
}
.index .nav {
  background-color: #ededed;
  width: 200px;
  height: 100%;
}
.index .nav li {
    text-align: center;
    margin: 10px;
}
.main {
    background-color: orange;
    // 使用剩余的尺寸
    flex: 1;
}
// 设计高亮的效果
a.router-link-active {
  color: white;
  background-color: orange;
}
</style>