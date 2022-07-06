const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const MAX_LIMIT = 100
exports.main = async (event, context) => {
    const db = cloud.database()
    const wxContext = cloud.getWXContext()
    

    // 先取出集合记录总数
    const countResult = await db.collection('bill').where({
        openId: wxContext.OPENID
    }).count()
    
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    // 承载所有读操作的 promise 的数组
    const data = []
    for (let i = 0; i < batchTimes; i++) {
        await db.collection('bill').aggregate().lookup({
            from: 'iconfont',
            localField: 'classid',
            foreignField: '_id',
            as: 'classInfo',
          }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).match({
            openId: wxContext.OPENID
        }).sort({
            create_date: -1
        }).end()
        .then(res => data.push(...res.list))
    }

    return {
        data,
        total
    }
}