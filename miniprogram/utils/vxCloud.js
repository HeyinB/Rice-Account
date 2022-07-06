export default function(name, query) {
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name,
            data: {
                ...query
            }
        }).then((res) => {
            resolve(res)
        }).catch((e) => {
            reject(e)
        });
    })
}