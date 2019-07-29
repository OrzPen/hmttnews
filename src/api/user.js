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
