import $ajax from '@/utils/request.js'

export const getChannelsDefaultOrUser = () => {
  return $ajax({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
