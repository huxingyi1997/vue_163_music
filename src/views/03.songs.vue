// 最新音乐
<template>
  <div class="songs-container">
    <!-- 地区选择 -->
    <div class="tab-bar">
      <span class="item" :class="{ active: tag === 0 }" @click="tag = 0"
        >全部</span
      >
      <span class="item" :class="{ active: tag === 7 }" @click="tag = 7"
        >华语</span
      >
      <span class="item" :class="{ active: tag === 96 }" @click="tag = 96"
        >欧美</span
      >
      <span class="item" :class="{ active: tag === 8 }" @click="tag = 8"
        >日本</span
      >
      <span class="item" :class="{ active: tag === 16 }" @click="tag = 16"
        >韩国</span
      >
    </div>

    <!-- 下方的table -->
    <table class="el-table playlit-table song-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item, index) in songs" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap" @click="playMusic(item.id)">
              <img :src="item.album.picUrl + '?param=130y130'" alt="" />
              <!-- 播放按钮 -->
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span
                  v-if="item.mvid !== 0"
                  class="iconfont icon-mv"
                  @click="toMv(item.mvid)"
                ></span>
              </div>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | formatDuration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { getNewSongs } from "@/api/03.songs.js";
import { getSongUrl} from "@/api/01.discovery.js";
export default {
  name: "songs",
  data() {
    return {
      // 歌曲列表
      songs: [],
      // 歌曲分类
      tag: 0,
    };
  },
  created() {
    // 初始化加载数据
    this.getData();
  },
  watch: {
    tag() {
      this.getData();
    },
  },
  methods: {
    // 获取音乐数据
    getData() {
      getNewSongs({
        type: this.tag,
      }).then((res) => {
        // console.log(res);
        this.songs = res.data;
      });
    },
    // 播放歌曲
    playMusic(id) {
      // console.log(id);
      getSongUrl({
        id, // id: id,
      }).then((res) => {
        // console.log(res);
        // 直接获取父组件，可以修改任意的值
        this.$parent.musicUrl = res.data[0].url;
      });
    },
    // 去MV详情页
    toMv(id) {
      this.$router.push(`/mv?id=${id}`)
    }
  },
};
</script>
<style lang="less" scoped>
.tab-bar {
  display: flex;
  justify-content: flex-end;
  .item {
    font-size: 15px;
    color: gray;
    margin-right: 20px;
    cursor: pointer;
  }
  .item.active {
    color: #dd6d60;
  }
}

.song-table {
  .song-wrap {
    span {
      margin-top: 20px;
      display: inline-block;
      color: #bebebe;
    }
    .icon-mv {
      padding-left: 5px;
      color: #dd6d60;
      cursor: pointer;
    }
  }
  .img-wrap {
    position: relative;
    width: 70px;
    height: 70px;
    cursor: pointer;
    img {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      .icon-play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25px;
        height: 25px;
        color: #dd6d60;
        font-size: 12px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
      }
      .icon-play::before {
        transform: translateX(1px);
      }
    }
  }
}
</style>
