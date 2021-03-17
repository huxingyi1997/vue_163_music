// 最新MV
<template>
  <div class="mv-container">
    <!-- MV详情 -->
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url" autoplay></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <!-- 头像 -->
            <img :src="icon + '?param=150y150'" alt="" />
          </div>
          <!-- 歌手名 -->
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <!-- 标题 -->
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：{{ mvInfo.publishTime }}</span>
          <!-- 播放次数 -->
          <span class="number">播放：{{ mvInfo.playCount }} 次</span>
          <!-- 描述 -->
          <p class="desc">
            {{ mvInfo.desc }}
          </p>
        </div>
      </div>

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
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">：{{ item.content }}</span>
              </div>
              <!-- 回复 -->
              <div class="re-content" v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
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
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
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
    </div>

    <!-- 相关推荐 -->
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in simiMvs"
            :key="index"
            @click="toMv(item.id)"
          >
            <div class="img-wrap">
              <img :src="item.cover + '?param=250y150'" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | playNumFormat }}</div>
              </div>
              <span class="time">{{ item.duration | formatDuration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMvUrl,
  getSimiMvUrl,
  getMvComment,
  getMvDetail,
  getArtistInfo,
} from "@/api/07.mv.js";
export default {
  name: "mv",
  data() {
    return {
      id: "",
      // 总条数
      total: 20,
      // 页码
      pageNum: 1,
      // 页容量
      pageSize: 10,
      // mv地址
      url: "",
      // mv信息
      mvInfo: {},
      // 相关MV
      simiMvs: [],
      // 歌手头像
      icon: "",
      // 热评
      hotComments: [],
      // 评论
      comments: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    // 获取MV评论
    _getMvComment() {
      getMvComment({
        id: this.id,
        limit: this.pageSize,
        offset: (this.pageNum - 1) * this.pageSize,
      }).then((res) => {
        // console.log(res)
        if (res.hotComments) {
          this.hotComments = res.hotComments;
        }
        this.comments = res.comments;
        this.total = res.total;
      });
    },
    getData() {
      // 获取MV播放地址
      getMvUrl({ id: this.id }).then((res) => {
        // console.log(res)
        this.url = res.data.url;
      });
      // 获取相关MV
      getSimiMvUrl({ mvid: this.id }).then((res) => {
        // console.log(res)
        // 保存相关MV
        this.simiMvs = res.mvs;
      });
      // 获取MV评论
      this._getMvComment();
      // 获取MV详情
      getMvDetail({ mvid: this.id }).then((res) => {
        // console.log(res);
        this.mvInfo = res.data;
        getArtistInfo({
          id: this.mvInfo.artists[0].id,
        }).then((res) => {
          // console.log(res);
          // 获取歌手头像
          this.icon = res.artist.picUrl;
        });
      });
    },
    // 去别的MV详情页
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    // 页面改事件
    handleCurrentChange(val) {
      // 保存页码，重新获得数据
      this.pageNum = val;
      // 重新获取MV评论
      this._getMvComment();
    },
  },
};
</script>
<style lang="less" scoped>
.mv-container {
  display: flex;
  .title {
    margin-bottom: 20px;
  }
  .mv-wrap {
    width: 700px;
    margin-right: 35px;
    .date {
      margin-right: 25px;
      color: #bebebe;
      font-size: 14px;
    }
    .number {
      color: #bebebe;
      font-size: 14px;
    }
    .video-wrap {
      width: 100%;
      height: 390px;
      margin-bottom: 20px;
      video {
        border-radius: 5px;
        height: 100%;
        width: 100%;
        outline: none;
      }
    }
    .info-wrap {
      margin-bottom: 50px;
      .singer-info {
        display: flex;
        align-items: center;
        margin-bottom: 35px;
        .avatar-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-right: 10px;
          overflow: hidden;
          img {
            height: 100%;
          }
        }
      }
      .mv-info {
        .title {
          font-size: 30px;
        }
        .desc {
          font-size: 15px;
          margin-top: 20px;
        }
      }
    }
    .comment-wrap {
      margin-bottom: 70px;
      .title {
        font-size: 25px;
        .number {
          color: black;
          font-size: 20px;
        }
      }
      .item {
        .icon-wrap {
          margin-right: 15px;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
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
  }
  .mv-recommend {
    flex: 1;
    .mvs .items {
      display: flex;
      flex-wrap: wrap;
      .item {
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px;
        .img-wrap {
          width: 180px;
          position: relative;
          margin-right: 10px;
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
          .time {
            position: absolute;
            bottom: 5px;
            right: 5px;
            color: white;
            font-size: 15px;
          }
        }
        .img-wrap:hover > .icon-play {
          opacity: 1;
        }
      }
      .item:hover {
        background-color: #f5f5f5;
      }
    }
  }
  .mv-recommend .mvs .items .item .info-wrap {
    flex: 1;
    .name {
      font-size: 15px;
    }
    .singer {
      font-size: 14px;
      color: #c5c5c5;
    }
  }
  .el-pagination {
    margin-top: 40px;
    text-align: center;
  }
}
</style>
