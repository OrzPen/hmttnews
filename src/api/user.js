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

// 获取用户基本信息
export const getCurrentUserInfo = () => {
  return $ajax({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}
// 获取用户详细信息
export const getCurrentUserProfile = () => {
  return $ajax({
    method: 'GET',
    url: `/app/v1_0/user/profile`
  })
}

// 编辑个人信息api
export const updateUserProfile = ({
  name,
  photo,
  gender,
  birthday,
  realName,
  idNumber,
  idCardFront,
  idCardBack,
  idCardHandheld,
  intro
}) => {
  return $ajax({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data: {
      name,
      photo,
      gender,
      birthday,
      real_name: realName,
      id_number: idNumber,
      id_card_front: idCardFront,
      id_card_back: idCardBack,
      id_card_handheld: idCardHandheld,
      intro
    }
  })
}
