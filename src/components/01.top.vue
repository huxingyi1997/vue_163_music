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

// export default { // data() { // return { // inputValue: "", // }; // }, //
methods: { // toSearch() { // // 如果为空 提示 // if (this.inputValue == "") {
// alert("请输入内容"); // } else { // // 否则跳转页面 // //
this.$router.push('/result') // // 携带数据 // // this.$router.push("/result?q="
+ this.inputValue); // this.$router.push(`/result?q=${this.inputValue}`); // }
// }, // }, // }; //
<style lang="less" scope>
.top-container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #f9f9f9;
  width: 100%;
  .left-box {
    display: flex;
    .icon-wrapper {
      display: flex;
      align-items: center;
      margin-right: 80px;
      .iconfont {
        margin-right: 10px;
        font-size: 16px;
        width: 20px;
        height: 20px;
        display: inline-block;
        text-align: center;
        line-height: 20px;
      }
      .iconfont::before {
        opacity: 0;
        transition: 0.2s;
      }
      .iconfont:hover::before {
        opacity: 1;
      }
      .iconfont.icon-home {
        background-color: #dd6d60;
        border-radius: 50%;
      }
      .iconfont.icon-sami-select {
        background-color: #dcc060;
        border-radius: 50%;
      }
      .iconfont.icon-full-screen {
        background-color: #84bb58;
        border-radius: 50%;
      }
    }
  }
  .history-wrapper {
    display: flex;
    align-items: center;
    .iconfont {
      width: 35px;
      height: 35px;
      font-size: 30px;
      text-align: center;
      line-height: 35px;
      color: gray;
      border-radius: 50%;
      transition: 0.2s;
      cursor: pointer;
    }
    .iconfont:first-child {
      margin-right: 10px;
    }
    .iconfont:hover {
      background-color: #ebebeb;
    }
  }
  .right-box {
    display: flex;
    align-items: center;
  }
}
</style>
