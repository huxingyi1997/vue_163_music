// 头部
<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <el-tooltip content="回到主页" :enterable="false" placement="bottom">
          <span class="iconfont icon-home" @click="toHomeClick"></span>
        </el-tooltip>
        <el-tooltip
          :content="isFullScreen ? '退出全屏' : '全屏'"
          :enterable="false"
          placement="bottom"
        >
          <span
            class="iconfont"
            :class="isFullScreen ? 'icon-sami-select' : 'icon-full-screen'"
            @click="toggleFullscreen"
          ></span>
        </el-tooltip>
      </div>
      <div class="history-wrapper">
        <el-tooltip content="后退一步" :enterable="false" placement="bottom">
          <span class="iconfont icon-arrow-lift" @click="$router.go(-1)"></span>
        </el-tooltip>
        <el-tooltip content="前进一步" :enterable="false" placement="bottom">
          <span class="iconfont icon-arrow-right" @click="$router.go(1)"></span>
        </el-tooltip>
      </div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <!-- 搜索框 -->
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          v-model="inputValue"
          @keyup.enter="toResult"
          class="el-input__inner"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search" @click="toResult"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "top",
  data() {
    return {
      // 输入的内容
      inputValue: "",
      // 是否全屏
      isFullScreen: false,
    };
  },
  methods: {
    toResult() {
      // 非空判断
      if (this.inputValue == "") {
        // 提示用户
        this.$message.warning("请输入内容");
      } else {
        // 去搜索页面，携带数据
        this.$router.push(`result?keywords=${this.inputValue}`);
      }
    },
    toHomeClick() {
      if ("/discovery" === this.$route.path) {
        return;
      }
      this.$router.push(`/discovery`);
    },
    toggleFullscreen() {
      if (!screenfull.isEnabled) {
        //判断一下浏览器是否支持全屏显示
        this.$message({
          message: "浏览器不能全屏",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
      // this.isScreenFull = screenfull.isFullscreen;
      // console.log(screenfull.isFullscreen);
    },
  },
  mounted() {
    // 监听窗口大小改变，screenfull.isFullscreen的值为是否全屏，若是则true，反之false
    window.onresize = () => {
      this.isFullScreen = screenfull.isFullscreen;
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
        cursor: pointer;
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
    .el-input {
      position: relative;
      .el-input__prefix {
        position: absolute;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
}
</style>
