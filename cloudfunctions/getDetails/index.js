const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

var $ = cloud.database().command.aggregate 
exports.main = async (event, context) => {
    const db = cloud.database()

    let {list} = 
    await db.collection('bill')
    .aggregate()
    .match({
        "_id":event.id
    })
    .lookup({
      from:'iconfont',
      localField:"classid",
      foreignField:"_id",
      as:"iconfont"
    })
    .replaceRoot({  //将关联表的内容输出到根部
      newRoot: $.mergeObjects([$.arrayElemAt(['$iconfont', 0]), '$$ROOT'])
    }).end()
    return list[0]
}