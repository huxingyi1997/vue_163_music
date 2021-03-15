// 搜索音乐
<template>
  <div class="result-container">
    <!-- 搜索标题 -->
    <div class="title-wrap">
      <h2 class="title" :keywords="(keywords = $route.query.keywords)">
        {{ $route.query.keywords }}
      </h2>
      <span class="sub-title">找到{{ count }}个结果</span>
    </div>

    <!-- 绑定歌单 -->
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in songs"
              :key="index"
              @click="playMusic(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 歌名 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span
                      v-if="item.mvid !== 0"
                      class="iconfont icon-mv"
                      @click.stop="toMv(item.mvid)"
                    ></span>
                  </div>
                  <!-- 二级标题 -->
                  <span v-if="item.alias.length !== 0">{{
                    item.alias[0]
                  }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | formatDuration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in playlists"
            :key="index"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | playNumFormat }}</span>
              </div>
              <!-- 封面 -->
              <img :src="item.coverImgUrl + '?param=200y200'" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div
            class="item"
            v-for="(item, index) in mvs"
            :key="index"
            @click="toMv(item.id)"
          >
            <div class="img-wrap">
              <!-- 封面 -->
              <img :src="item.cover + '?param=250y150'" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <!-- 播放次数 -->
                <div class="num">{{ item.playCount | playNumFormat }}</div>
              </div>
              <!-- 持续时间 -->
              <span class="time">{{ item.duration | playTimeFormat }}</span>
            </div>
            <div class="info-wrap">
              <!-- MV名 -->
              <div class="name">{{ item.name }}</div>
              <!-- 歌手名 -->
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      :page-size="limit"
    >
    </el-pagination>
  </div>
</template>
<script>
// 导入请求函数
import { getMusicUrl } from "@/api/05.result.js";
import { getSongUrl } from "@/api/01.discovery.js";
export default {
  name: "result",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      // 获取的数据量
      limit: 10,
      keywords: "",
      activeIndex: "songs",
      // 保存查询歌曲
      songs: [],
      // 保存查询歌单
      playlists: [],
      // 保存查询MV
      mvs: [],
      count: 0,
      songId: 0,
      //  默认为 1 即单曲 , 取值意义 : 歌曲:1;歌单:1000;MV:1004
      type: 1,
    };
  },
  // 生命周期钩子 created
  // 回调生命函数，添加之后自动执行
  // 内部可以通过this 访问到 vue 实例
  created() {
    // console.log($route.query.keywords);
    this.getData();
  },
  // 侦听器
  watch: {
    activeIndex() {
      switch (this.activeIndex) {
        // 歌曲
        case "songs":
          this.type = 1;
          this.pageNum = 1;
          this.limit = 10;
          break;
        // 歌单
        case "lists":
          this.type = 1000;
          this.pageNum = 1;
          this.limit = 10;
          break;
        // MV
        case "mv":
          this.type = 1004;
          this.pageNum = 1;
          this.limit = 8;
          break;
        default:
          this.$message.warning("歌曲类型错误");
          break;
      }
      this.getData();
    },
  },
  methods: {
    getData() {
      getMusicUrl({
        // 获取的数据量
        limit: this.limit,
        type: this.type,
        keywords: this.$route.query.keywords,
        // 偏移值起始的值 （页面-1） * 每页多少条数据
        offset: (this.pageNum - 1) * this.limit,
      }).then((res) => {
        // console.log(res);
        // 根据类型不同
        // console.log(this.type)
        switch (this.type) {
          // 歌曲
          case 1:
            // console.log(this.type)
            this.songs = res.result.songs;
            this.count = res.result.songCount;
            break;
          // 歌单
          case 1000:
            this.playlists = res.result.playlists;
            this.count = res.result.playlistCount;
            break;
          // MV
          case 1004:
            this.mvs = res.result.mvs;
            this.count = res.result.mvCount;
            break;
          default:
            this.$message.warning("歌曲类型错误");
            break;
        }
        this.total = this.count;
      });
    },
    // 页面改事件
    handleCurrentChange(val) {
      // 保存页码，重新获得数据
      this.pageNum = val;
      this.getData();
    },
    toMv(id) {
      console.log(id);
    },
    toPlaylist(id) {
      console.log(id);
    },
    // 播放歌曲
    playMusic(id) {
      getSongUrl({
        id, // id: id,
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
.result-container {
  height: 100%;
  .title-wrap {
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;
    .title {
      margin-right: 10px;
    }
    .sub-title {
      font-size: 15px;
      color: #bebebe;
    }
  }

  .el-tabs__item {
    font-size: 18px;
  }

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .item {
      width: 200px;
      cursor: pointer;
      margin-right: 20px;
      margin-bottom: 20px;
      .img-wrap {
        width: 100%;
        position: relative;
        .time {
          position: absolute;
          bottom: 5px;
          right: 5px;
          color: white;
          font-size: 15px;
        }
        img {
          width: 100%;
          border-radius: 5px;
        }
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
        .num-wrap {
          position: absolute;
          color: white;
          top: 0;
          right: 0;
          display: flex;
          align-items: center;
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
      .img-wrap:hover > .icon-play {
        opacity: 1;
      }
      .name {
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .singer {
        font-size: 14px;
        color: #c5c5c5;
      }
    }
  }

  .items.mv .item {
    width: 250px;
  }
  .el-pagination {
    margin-top: 40px;
    text-align: center;
  }
}
</style>
