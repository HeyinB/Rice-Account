const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
exports.main = async (event, context) => {
    const db = cloud.database()

    let {
        data
    } = await db.collection('iconfont').where({
        iconflag: '1'
    }).get()

    return data
}