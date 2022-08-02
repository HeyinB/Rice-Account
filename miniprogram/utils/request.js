export default function(url, data) {
    return new Promise((resolve, reject) => {
        wx.request({
            url, //仅为示例，并非真实的接口地址
            data,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
                resolve(res)
            },
            fail(res){
                reject(res)
            }
          })
    })
}