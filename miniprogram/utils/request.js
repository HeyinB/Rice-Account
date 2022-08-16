const baseUrl = 'http://localhost:5000/v1/'
let temp_request = [], is_freshing = false;

function require({ url, data, method = 'GET' }) {
    url = baseUrl + url
    console.log('-------url---------', data);
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
                console.log('-------data-f返回了--------', res);
                // if(data.code === 200) resolve(res)
                switch (res.data.code) {
                    case 200: resolve(res); break;
                    case 401:
                        console.log('-----kkk----------kkk', is_freshing);
                        if (!is_freshing) {
                            //刷新token
                            await refresh()
                        }
                        // 关键步骤~~~~
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
    console.log('-----jll----------jll', temp_request);
    is_freshing = true;
    wx.login({
        async success(data) {
            console.log('-----888----------888');
            let res = await require({ url: 'login/refreshToken', method: 'POST', data })
            // uni.setStorageSync('api_token', res.token)
            // is_freshing = false
            // temp_request.map(cb => cb())
            // // 清空temp_request
            // temp_request = []
            console.log('-----进来了----------进来了');
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('id', res.data.id)
            is_freshing = false
            temp_request.map(cb => cb())
            // 清空temp_request
            temp_request = []
        }
    })
}

export default require
