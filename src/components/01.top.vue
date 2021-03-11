// 头部
<template>
  <div class="top">
    <button>占位</button>
    <input type="text" v-model="inputValue" @keyup.enter="toSearch" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    toSearch() {
      // 如果为空 提示
      if (this.inputValue == "") {
        alert("请输入内容");
      } else {
        // 否则跳转页面
        // this.$router.push('/result')
        // 携带数据
        // this.$router.push("/result?q=" + this.inputValue);
        this.$router.push(`/result?q=${this.inputValue}`);
      }
    },
  },
};
</script>
<style lang="less">
.top {
  // 开启弹性布局
  display: flex;
  // 纵向居中
  align-items: center;
  background: #f9f9f9;
}
</style>
