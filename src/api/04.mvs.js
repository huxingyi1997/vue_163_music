// 导入请求
import request from "@/plugins/request.js";

// 请求最新mv列表
export function getMvs({ limit, area, order, type, offset }) {
    return request({
      url: '/mv/all',
      method: 'get',
      params: {
        limit,
        area,
        order,
        type,
        offset
      }
    });
  }
  