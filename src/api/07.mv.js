// 导入请求
import request from "@/plugins/request.js";

// 获取MV播放地址
export function getMvUrl({ id }) {
  return request({
    url: "/mv/url",
    method: "get",
    params: {
      id,
    },
  });
}

// 获取相关MV
export function getSimiMvUrl({ mvid }) {
  return request({
    url: "/simi/mv",
    method: "get",
    params: {
      mvid,
    },
  });
}

// 获取MV评论
export function getMvComment({ id, limit, offset }) {
  return request({
    url: "/comment/mv",
    method: "get",
    params: {
      id,
      limit,
      offset,
    },
  });
}

// 获取MV详情
export function getMvDetail({ mvid }) {
  return request({
    url: "/mv/detail",
    method: "get",
    params: {
      mvid,
    },
  });
}

// 获取歌手信息
export function getArtistInfo({ id }) {
  return request({
    url: "/artists",
    method: "get",
    params: {
      id,
    },
  });
}
