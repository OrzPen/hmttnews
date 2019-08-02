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

/*
 * 批量修改用户频道列表（重置式）
 * ├─ id,integer必须频道id
 * ├─ seq,integer必须顺序序号 10
 *          seq顺序序号-> 从2开始 -> 接口设计人员的反馈
 *
 * channels->[{id:?,seq:?}]
 *
 * 重置频道-> '推荐'的频道 不需要放在数组里
 *
 */
export const resetUserChannels = channels => {
  return $ajax({
    method: 'put',
    url: `/app/v1_0/user/channels`,
    data: {
      channels: channels
    }
  })
}

// 删除频道接口  参数:target 用户频道ID
export const deleChannelById = channelId => {
  return $ajax({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
