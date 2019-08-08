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

/**
 * 修改头像
 * photo file 否 头像
 * id_card_front file 否  身份证正面照片
 * id_card_back file 否 身份证背面照片
 * id card handheld file 否  手持身份证照片
 */
export const updateUserPhoto = (name, file) => {
  // 实例化formdata对象
  const formdata = new FormData()

  // 添加name 和 数据
  formdata.append(name, file)

  // 当Content-Type 的值 form-data时,此时 把formdata对象传递给data数据
  return $ajax({
    method: 'PATCH',
    url: `/app/v1_0/user/photo`,
    data: formdata
  })
}
