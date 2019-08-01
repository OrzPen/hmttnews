import $ajax from '@/utils/request.js'

export const getChannelsDefaultOrUser = () => {
  return $ajax({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 获取所有频道数据
export const getAllChannels = () => {
  return $ajax({
    method: 'get',
    url: `/app/v1_0/channels`
  })
}
