
import require from '../utils/request'

const loginReq = async (model) => {
  let req = await require({
    url: 'login/LoginOrRegister',
    method: 'post',
    data: {
      ...model
    }
  })
  let { code, data } = req.data
  if (code === 200) {
    return data
  }
}


module.exports = {
  loginReq
}
