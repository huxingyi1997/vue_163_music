// 导入请求
import request from "@/plugins/request.js";

// 请求歌单地址
export function getPlaylistDetail({id}){
    return request({
        url:"/playlist/detail",
        method:"get",
        params:{
            id
        }
    })
}

// 获取歌单热门评论
export function getHotComments({id}){
    return request({
        url:"/comment/hot",
        method:"get",
        params:{
            type:2,
            id
        }
    })
}

// 获取歌单最新评论
export function getPlaylistComments({id,offset}){
    return request({
        url:"/comment/playlist",
        method:"get",
        params:{
            id,
            limit:5,
            offset
        }
    })
}

