const baseUrl = 'http://localhost:5000/v1/'
let temp_request = [], is_freshing = false;

function require({ url, data, method = 'GET' }) {
    url = baseUrl + url
    let params_ = arguments
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data,
            method,
            header: {
                'content-type': 'application/json', // 默认值
                'authorization': wx.getStorageSync('token')
            },
            async success(res) {
                // if(data.code === 200) resolve(res)
                switch (res.data.code) {
                    case 200: resolve(res); break;
                    case 401:
                        if (!is_freshing) {
                            //刷新token
                            await refresh()
                        }
                        resolve(new Promise(reslove => {
                            temp_request.push(() => {
                                reslove(require(...params_))
                            })
                        }))
                        break;
                    default:
                        reject(res.data)
                }
            },
            fail(res) {
                reject(res)
            }
        })
    })
}


async function refresh() {
    is_freshing = true;
    wx.login({
        async success(res) {
            let id = await wx.getStorageSync('id')
            let { data } = await require({ url: 'login/refreshToken', method: 'POST', data: { id } })
            wx.setStorageSync('token', data.data.token)
            wx.setStorageSync('id', data.data.id)
            is_freshing = false
            temp_request.map(cb => cb())
            // 清空temp_request
            temp_request = []
        }
    })
}

export default require
