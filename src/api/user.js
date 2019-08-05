import $ajax from '../utils/request'

export const login = ({
  mobile,
  code
}) => {
  return $ajax({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 关注用户
 */
export const followUser = userId => {
  return $ajax({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
* 取消关注
*/
export const unFollowUser = userId => {
  return $ajax({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
