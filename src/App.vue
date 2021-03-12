<template>
  <div id="app">
    <!-- 头部组件 -->
    <top/>
    <!-- 主体组件 -->
    <index/>
  </div>
</template>

<script>
// 导入头部组件
import top from "./components/01.top.vue";
// 导入主体组件
import index from "./components/02.index.vue";
export default {
  name: "app",
  // 注册组件
  components: {
    // 头部组件
    top, // top: top可省略
    // 主体组件
    index, // index: index可省略
  },
};
</script>
<style lang="less"></style>
