// 导入请求
import request from "@/plugins/request.js";

// 获取最新音乐数据
export function getNewSongs({ type }) {
  return request({
    url: "/top/song",
    method: "get",
    params: {
      type,
    },
  });
}
