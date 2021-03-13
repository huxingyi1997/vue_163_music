// 导入请求
import request from "@/plugins/request.js";

// 精品歌单
export function getTopPlaylist({ cat }) {
  return request({
    url: "/top/playlist/highquality",
    method: "get",
    params: {
      limit: 1,
      cat,
    },
  });
}

// 歌曲列表
export function getPlaylist({ cat, offset }) {
  return request({
    url: "/top/playlist",
    method: "get",
    params: {
      // 默认10个
      limit: 10,
      offset,
      cat,
    },
  });
}
