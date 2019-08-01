import request from '@/utils/request.js'

// 每个频道对应的文章列表
//  channel_id 是 频道ID
//  timestamp是时间戳 Date.now() 整数单位毫秒时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
//  with_top是0或1是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含

export const getArticle = (data) => {
  return request({
    method: 'get',
    url: `/app/v1_1/articles`,
    params: data
  })
}

// 对文章不喜欢封装
// 参数为不喜欢的文章的ID
// 后台当前不喜欢的文章ID
export const dislikesArticle = articleId => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/dislikes`,
    data: {
      target: articleId
    }
  })
}
