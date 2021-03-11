<template>
  <div>
    <!-- 头部组件 -->
    <top></top>
    <!-- 主体组件 -->
    <index></index>
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
<style lang="less">
html,
body,
ol,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6,
p,
th,
td,
dl,
dd,
form,
fieldset,
legend,
input,
textarea,
select {
  margin: 0;
  padding: 0;
}

ul,
ol,
li {
  list-style: none;
}
strong {
  font-weight: normal;
}
i,
em {
  font-style: normal;
}
a,
u {
  text-decoration: none;
}
img {
  border: 0;
  display: block;
}
input,
fieldset {
  outline: none;
  border: 0;
}
</style>
