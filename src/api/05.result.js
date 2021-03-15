// 导入请求
import request from "@/plugins/request.js";

// 搜索歌曲地址
export function getMusicUrl({keywords,limit,offset,type}) {
    return request({
      url: '/search',
      method: 'get',
      params:{
          keywords,
          limit,
          offset,
          type
      }
    });
  }