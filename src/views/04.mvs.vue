// 最新MV
<template>
  <div class="mvs-container">
    <!-- 标题区域 -->
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <!-- 分类切换 地区 -->
        <ul class="tabs-wrap">
          <li class="tab" v-for="(item, index) in areas" :key="index">
            <span
              class="title"
              @click="area = item"
              :class="{ active: area === item }"
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <!-- 分类切换 类型 -->
        <ul class="tabs-wrap">
          <li class="tab" v-for="(item, index) in types" :key="index">
            <span
              class="title"
              @click="type = item"
              :class="{ active: type === item }"
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <!-- 分类切换 排序 -->
        <ul class="tabs-wrap">
          <li class="tab" v-for="(item, index) in orders" :key="index">
            <span
              class="title"
              @click="order = item"
              :class="{ active: order === item }"
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- mv容器 -->
    <div class="mvs">
      <div class="items">
        <div
          class="item"
          @click="toMv(item.id)"
          v-for="(item, index) in mvs"
          :key="index"
        >
          <div class="img-wrap">
            <img :src="item.cover + '?param=250y150'" alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount | playNumFormat }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
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
        :page-size="limit"
      >
      </el-pagination>
  </div>
</template>
<script>
import { getMvs } from "@/api/04.mvs.js";
export default {
  name: "mvs",
  data() {
    return {
      // 地区
      areas: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      area: "全部",
      //   类型
      types: ["全部", "官方版", "原生", "现场版", "网易出品"],
      type: "全部",
      //   排序
      orders: ["上升最快", "最热", "最新"],
      order: "上升最快",
      // 每页数据
      limit: 8,
      // 页码
      pageNum: 1,
      // 总条数
      total: 0,
      // mv列表数据
      mvs: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      // 获取MV
      getMvs({
        limit: this.limit,
        area: this.area,
        type: this.type,
        order: this.type,
        // 偏移值起始的值 （页面-1） * 每页多少条数据
        offset: (this.pageNum - 1) * this.limit,
      }).then((res) => {
        // console.log(res);
        this.mvs = res.data;
        if (res.count) {
          this.total = res.count;
        }
      });
    },
    // 页面改事件
    handleCurrentChange(val) {
      // 保存页码，重新获得数据
      this.pageNum = val;
      this.getData();
    },
    // 去MV详情页
    toMv(id) {
      this.$router.push(`/mv?id=${id}`)
    }
  },
  // 侦听器
  watch: {
    area() {
      // 返回第一页
      this.pageNum = 1;
      // 重新获取数据
      this.getData();
    },
    type() {
      // 返回第一页
      this.pageNum = 1;
      // 重新获取数据
      this.getData();
    },
    order() {
      // 返回第一页
      this.pageNum = 1;
      // 重新获取数据
      this.getData();
    },
  },
};
</script>
<style lang="less" scoped>
.mvs-container {
  padding-top: 20px;
  padding-bottom: 20px;
  height: 100%;
  .filter-wrap > div {
    margin-bottom: 30px;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      height: 100%;
    }
    span.title {
      margin: 20px;
      color: gray;
      cursor: pointer;
      padding: 5px 20px;
    }
    span.title.active {
      color: #dd6d60;
      background-color: #fcf6f5;
      border-radius: 20px;
    }
    span.title::before {
      content: "", pos;
    }
    ul {
      display: flex;
      li:not(:last-child) {
        border-right: 1px solid #f2f2f1;
      }
    }
  }
  .mvs {
    height: 440px;
    .items {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      width: 250px;
      cursor: pointer;
      margin-right: 25px;
      margin-bottom: 30px;
      .img-wrap {
        width: 100%;
        position: relative;
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
      }
      .info-wrap {
        .name {
          font-size: 15px;
        }
        .singer {
          font-size: 14px;
          color: #c5c5c5;
        }
      }
    }
  }
  }
  .el-pagination {
    margin-top: 100px;
    text-align: center;
  }
}
</style>
