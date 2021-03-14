// 发现音乐
<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <!-- 循环展示获取到的接口 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <!-- 图片地址 -->
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in playList" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl + '?param=200y200'" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in newSongs"
          :key="index"
          @click="playMusic(item.id)"
        >
          <div class="img-wrap">
            <!-- 封面 -->
            <img :src="item.picUrl + '?param=130y130'" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最新MV -->
    <div class="mvs">
      <h3 class="title">最新MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl + '?param=250y150'" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <!-- 播放次数 -->
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- MV名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入异步函数
import {
  getBanner,
  getPlaylist,
  getNewSongs,
  getMv,
  getSongUrl,
} from "@/api/01.discovery.js";
export default {
  name: "discovery",
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      playList: [],
      // 最新音乐
      newSongs: [],
      // 最新MV
      mvs: [],
    };
  },
  created() {
    // console.log('created');
    // 轮播图接口
    // axios({
    //   url: "https://api.mtnhao.com/banner",
    //   method: "get",
    //   params: {},
    // }).then((res) => {
    //   // console.log(res);
    //   this.banners = res.data.banners;
    // });
    getBanner().then((res) => {
      // console.log(res);
      this.banners = res.banners;
    });

    // 推荐歌单
    // axios({
    //   url: "https://api.mtnhao.com/personalized",
    //   method: "get",
    //   params: {
    //     // 获取的数据量
    //     limit: 10,
    //   },
    // }).then((res) => {
    //   // console.log(res);
    //   this.playList = res.data.result;
    // });
    getPlaylist().then((res) => {
      // console.log(res);
      this.playList = res.result;
    });

    // 最新音乐
    // axios({
    //   url: "https://api.mtnhao.com/personalized/newsong",
    //   method: "get",
    //   params: {},
    // }).then((res) => {
    //   // console.log(res);
    //   this.newSongs = res.data.result;
    // });
    getNewSongs().then((res) => {
      // console.log(res);
      this.newSongs = res.result;
    });

    // 最新mv
    // axios({
    //   url: "https://api.mtnhao.com/personalized/mv",
    //   method: "get",
    //   params: {},
    // }).then((res) => {
    //   // console.log(res)
    //   this.mvs = res.data.result;
    // });
    getMv().then((res) => {
      // console.log(res);
      this.mvs = res.result;
    });
  },
  methods: {
    playMusic(id) {
      //   console.log(id);
      //   axios({
      //     url: "https://api.mtnhao.com/song/url",
      //     method: "get",
      //     params: {
      //       id, // id: id
      //     },
      //   }).then((res) => {
      //     // console.log(res);
      //     let url = res.data.data[0].url;
      //     // 父节点的音乐地址
      //     // console.log(this.$parent.musicUrl);
      //     // 设置父组件的播放地址
      //     this.$parent.musicUrl = url;
      //   });
      getSongUrl({
        id// id: id,
      }).then((res) => {
        // console.log(res);
        // 直接获取父组件，可以修改任意的值
        this.$parent.musicUrl = res.data[0].url;
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 轮播图样式
.el-carousel__container {
  height: 230px;
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
// 文字部分样式
.title {
  font-weight: normal;
  margin-bottom: 20px;
  padding-left: 8px;
}
// 推荐歌单样式
.recommend {
  margin-bottom: 40px;
  .items {
    display: flex;
    flex-wrap: wrap;
    // 每项元素样式
    .item {
      width: 200px;
      margin: 10px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 200px;
        height: 200px;
        border-radius: 5px;
      }
      .desc-wrap {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        font-size: 16px;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        max-height: 50px;
        padding: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        top: -50px;
        span {
          font-size: 14px;
        }
      }
    }

    // 点击后的悬浮样式
    .item:hover .desc-wrap {
      top: 0;
    }

    // 每项图片的样式
    .img-wrap {
      position: relative;
      .icon-play {
        position: absolute;
        right: 10px;
        bottom: 13px;
        width: 40px;
        height: 40px;
        color: #dd6d60;
        font-size: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
        opacity: 0;
      }
      .icon-play::before {
        transform: translateX(3px);
      }
    }

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-size: 14px;
    }
  }
}

.recommend .items .item .img-wrap:hover .icon-play {
  opacity: 1;
}

// 最新音乐样式
.news {
  margin-bottom: 40px;
  .items {
    height: 500px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-left: 15px;
  }
  .item {
    height: 100px;
    width: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .index {
    margin-right: 15px;
    font-size: 15px;
  }
  .item:hover {
    background-color: #f5f5f5;
  }
  .img-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .iconfont {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    color: #dd6d60;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
  }
  .iconfont::before {
    transform: translateX(3px);
  }
  .img-wrap:hover .iconfont {
    opacity: 1;
  }
  .song-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    padding: 10px;
    font-size: 16px;
  }
  .singer {
    font-size: 14px;
    color: gray;
  }
}

// 最新MV模块样式
.mvs .items {
  display: flex;
  justify-content: space-around;
  .item {
    width: 250px;
    cursor: pointer;
  }
  .img-wrap {
    width: 100%;
    position: relative;
    .icon-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      color: #dd6d60;
      font-size: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      opacity: 0;
    }
    .icon-play::before {
      transform: translateX(3px);
    }
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
  .img-wrap:hover > .icon-play {
    opacity: 1;
  }
  .num-wrap {
    position: absolute;
    color: white;
    top: 0;
    right: 0;
    display: flex;
    align-content: center;
    font-size: 15px;
    padding-right: 5px;
    padding-top: 2px;
    .icon-play {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-right: 5px;
    }
  }
}

.info-wrap {
  .name {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .singer {
    font-size: 14px;
    color: #c5c5c5;
  }
}
</style>
