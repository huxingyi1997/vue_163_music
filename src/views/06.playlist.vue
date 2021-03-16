// 歌单详情
<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <!-- 神经病VUE,不加v-if="playlist.creator !== undefined" 报错 -->
          <img
            class="avatar"
            :src="playlist.creator.avatarUrl"
            alt=""
            v-if="playlist.creator !== undefined"
          />
          <!-- 名字 -->
          <span class="name" v-if="playlist.creator !== undefined">{{
            playlist.creator.nickname
          }}</span>
          <!-- 时间 -->
          <span class="time">{{ playlist.createTime | dateFormat }}</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 分类标签 -->
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <!-- 简介 -->
          <span class="desc">{{ playlist.description }}</span>
        </div>
      </div>
    </div>

    <!-- 下方的歌曲内容和评论 -->
    <el-tabs v-model="activeIndex">
      <!-- 歌曲 -->
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in playlist.tracks"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap" @click="playMusic(item.id)">
                  <img :src="item.al.picUrl + '?param=130y130'" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span
                      v-if="item.mv !== 0"
                      class="iconfont icon-mv"
                      @click="toMv(item.mv)"
                    ></span>
                  </div>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | formatDuration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <!-- 评论 -->
      <el-tab-pane :label="`评论(${total})`" name="2">
        <!-- 精彩评论 -->
        <div
          class="comment-wrap"
          v-if="hotComments !== undefined && hotComments.length !== 0"
        >
          <p class="title">
            精彩评论<span class="number">({{ hotComments.length }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div class="item" v-for="(item, index) in hotComments" :key="index">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl + '?param=50y50'" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <!-- 昵称 -->
                  <span class="name">{{ item.user.nickname }}</span>
                  <span class="comment">：{{ item.content }}</span>
                </div>
                <!-- 评论的回复 -->
                <div class="re-content" v-if="item.beReplied.length !== 0">
                  <span class="name">{{
                    item.beReplied[0].user.nickname
                  }}</span>
                  <span class="comment">：{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | dateFormat }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论<span class="number">({{ total }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl + '?param=50y50'" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}</span>
                  <span class="comment">：{{ item.content }}</span>
                </div>
                <!-- 回复 -->
                <div class="re-content" v-if="item.beReplied.length !== 0">
                  <span class="name">{{
                    item.beReplied[0].user.nickname
                  }}</span>
                  <span class="comment">：{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | dateFormat }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="pageNum"
          :page-size="pageSize"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// 导入请求函数
import {
  getPlaylistDetail,
  getHotComments,
  getPlaylistComments,
} from "@/api/06.playlist.js";
import { getSongUrl } from "@/api/01.discovery.js";
export default {
  name: "playlist",
  data() {
    return {
      id: "",
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 10,
      // 歌单详情
      playlist: {},
      // 歌单最热评论
      hotComments: [],
      // 歌单最新评论
      comments: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData() {
      getPlaylistDetail({
        id: this.id,
      }).then((res) => {
        // console.log(res);
        // 歌曲信息
        this.playlist = res.playlist;
      });
      getHotComments({
        id: this.id,
      }).then((res) => {
        // console.log(res);
        this.hotComments = res.hotComments;
      });
      // 获取歌曲评论
      getPlaylistComments({
        id: this.id,
        limit: this.pageSize,
        // 偏移值起始的值 （页面-1） * 每页多少条数据
        offset: (this.pageNum - 1) * this.pageSize,
      }).then((res) => {
        // console.log(res);
        this.total = res.total;
        this.comments = res.comments;
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
.playlist-container {
  margin: auto;
  padding-top: 40px;
  .top-wrap {
    display: flex;
    span {
      font-size: 17px;
    }
    .img-wrap {
      margin-right: 30px;
      img {
        width: 230px;
        height: 230px;
      }
    }
    .info-wrap {
      .title {
        margin-bottom: 20px;
      }
      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .name {
          margin-right: 10px;
        }
        .time {
          font-size: 14px;
        }
      }
      .play-wrap {
        width: 120px;
        height: 35px;
        border-radius: 4px;
        background: linear-gradient(to right, #e85e4d, #c6483c);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        span {
          color: white;
        }
        span.iconfont {
          margin-right: 8px;
        }
        span.text {
          font-size: 16px;
        }
      }
      .tag-wrap {
        display: flex;
        margin-bottom: 15px;
        span {
          margin: 0;
        }
        ul {
          display: flex;
          align-items: center;
        }
        li {
          font-size: 15px;
        }
        li:not(:last-child)::after {
          content: "/";
          margin: 0 4px;
        }
      }
      .desc-wrap span:last-child {
        font-size: 15px;
      }
      span:first-child {
        margin-right: 10px;
      }
    }
  }
}

.comment-wrap {
  margin-bottom: 70px;
  .title {
    font-size: 20px;
    .number {
      color: black;
      font-size: 18px;
    }
  }
  .item {
    display: flex;
    padding-top: 20px;
    .icon-wrap {
      margin-right: 15px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .date {
      color: #bebebe;
      font-size: 14px;
    }
    .content-wrap {
      padding-bottom: 20px;
      flex: 1;
      .name {
        color: #517eaf;
        font-size: 14px;
      }
      .comment {
        font-size: 14px;
      }
      .content,
      .re-content {
        margin-bottom: 10px;
      }
      .re-content {
        padding: 10px;
        background-color: #e6e5e6;
        border-radius: 5px;
      }
    }
  }
  .item:not(:last-child) .content-wrap {
    border-bottom: 1px solid #f2f2f1;
  }
}
.el-pagination {
  margin-top: 40px;
  text-align: center;
}
.playlit-table {
  .img-wrap {
    cursor: pointer;
  }
}
</style>
