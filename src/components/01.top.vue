// 头部
<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      query: "",
    };
  },
};
</script>


// export default {
//   data() {
//     return {
//       inputValue: "",
//     };
//   },
//   methods: {
//     toSearch() {
//       // 如果为空 提示
//       if (this.inputValue == "") {
//         alert("请输入内容");
//       } else {
//         // 否则跳转页面
//         // this.$router.push('/result')
//         // 携带数据
//         // this.$router.push("/result?q=" + this.inputValue);
//         this.$router.push(`/result?q=${this.inputValue}`);
//       }
//     },
//   },
// };
//
<style lang="less">
// .top {
//   // 开启弹性布局
//   display: flex;
//   // 纵向居中
//   align-items: center;
//   background: #f9f9f9;
// }
</style>
