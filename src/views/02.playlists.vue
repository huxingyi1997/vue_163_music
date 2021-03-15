// 推荐歌单
<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <!-- 封面 -->
      <div class="icon-wrap">
        <img :src="topPlayList.coverImgUrl + '?param=200y200'" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">{{ topPlayList.title }}</div>
        <!-- 介绍 -->
        <div class="info">{{ topPlayList.description }}</div>
      </div>
      <!-- 背景 -->
      <img :src="topPlayList.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>

    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          @click="cat = item"
          :class="{ active: cat === item }"
          v-for="(item, index) in cats"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in playLists"
            :key="index"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl + '?param=200y200'" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页器 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      :page-size="pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
// 导入请求函数
import { getTopPlaylist, getPlaylist } from "@/api/02.playlists.js";
export default {
  name: "recommend",
  data() {
    return {
      // 总条数
      total: 0,
      // 当前页码
      pageNum: 1,
      // 每页显示的页码数量
      pageSize: 10,
      // 歌单名称
      cats: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行",
      ],
      // 歌单分类
      cat: "全部",
      // 顶部精品歌单
      topPlayList: {},
      // 歌单列表
      playLists: [],
    };
  },
  // 侦听器
  watch: {
    cat() {
      // 歌单分类变化，重新加载数据
      this.getData();
      // console.log(this.cat);
      // 修改页码为1
      this.pageNum = 1;
    },
  },
  created() {
    // 初始化加载数据
    this.getData();
  },
  methods: {
    playMusic(id) {
      console.log(id);
    },
    getData() {
      // 顶部的精品歌单
      getTopPlaylist({
        // 分类数据
        cat: this.cat,
      }).then((res) => {
        // console.log(res);
        this.topPlayList = res.playlists[0];
        this.total = res.total;
      });
      // 歌曲列表
      getPlaylist({
        // 分类数据
        cat: this.cat,
        // 偏移值起始的值 （页面-1） * 每页多少条数据
        offset: (this.pageNum - 1) * 10,
      }).then((res) => {
        // console.log(res);
        this.playLists = res.playlists;
        this.total = res.total;
      });
    },
    // 页面改事件
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
    },
  },
};
</script>
<style lang="less" scoped>
.top-card {
  padding: 20px;
  height: 200px;
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  .icon-wrap {
    margin-right: 20px;
    z-index: 1;
    img {
      width: 160px;
      height: 160px;
    }
  }
  .content-wrap {
    z-index: 1;
    .tag {
      color: #dfac67;
      border: 1px solid #dfac67;
      width: 100px;
      height: 30px;
      text-align: center;
      border-radius: 5px;
      font-size: 16px;
      line-height: 30px;
      cursor: pointer;
    }
    .title {
      color: white;
      padding-top: 10px;
    }
    .info {
      color: #888482;
      font-size: 14px;
      padding-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
  }
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    filter: blur(20px);
  }
  .bg-mask {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.tab-container {
  padding-top: 30px;
  .tab-bar {
    display: flex;
    justify-content: flex-end;
    .item {
      font-size: 15px;
      color: gray;
      margin-right: 20px;
      line-height: 14px;
      cursor: pointer;
    }
    .item.active {
      color: #dd6d60;
    }
  }
  .tab-content {
    margin-top: 20px;
    .items {
      display: flex;
      flex-wrap: wrap;
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
        .num-wrap {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 14px;
          color: white;
          line-height: 30px;
          background: rgba(0, 0, 0, 0.5);
          height: 30px;
          width: 100%;
          padding-left: 5px;
          top: -30px;
          overflow: hidden;
        }
        .img-wrap {
          position: relative;
        }
        .img-wrap:hover .icon-play {
          opacity: 1;
        }
        .img-wrap .icon-play {
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
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 14px;
        }
      }
      .item:hover .num-wrap {
        top: 0;
      }
    }
  }
}
</style>
