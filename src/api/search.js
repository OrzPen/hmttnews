import $ajax from '@/utils/request.js'

// 封装搜索关键字联想建议请求
// q为向后台发送的关键字数据
export const getSuggestion = q => {
  return $ajax({
    method: 'get',
    url: `/app/v1_0/suggestion`,
    params: {
      q
    }
  })
}
