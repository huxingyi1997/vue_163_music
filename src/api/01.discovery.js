// 导入请求
import request from "@/plugins/request.js";

// 轮播图接口
export function getBanner() {
  return request({
    url: "/banner",
    method: "get",
  });
}

// 推荐歌单 获取的数据量默认为10
export function getPlaylist({ limit = 10 } = {}) {
  return request({
    url: "/personalized",
    method: "get",
    params: {
      limit,
    },
  });
}
// 最新音乐
export function getNewSongs() {
  return request({
    url: "/personalized/newsong",
    method: "get",
  });
}

// 最新mv
export function getMv() {
  return request({
    url: "/personalized/mv",
    method: "get",
  });
}

// 根据id获得歌曲
export function getSongUrl({ id }) {
  return request({
    url: "/song/url",
    method: "get",
    params: {
      id,
    },
  });
}
