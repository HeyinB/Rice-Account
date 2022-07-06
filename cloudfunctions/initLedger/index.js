const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
cloud.init();
const db = cloud.database();
// 获取openId云函数入口函数
exports.main = async (event, context) => {
    const db = cloud.database()
    const wxContext = cloud.getWXContext()

    try {

        //判断有没有注册
        let regData = await db.collection('user').where({
            user_openid: wxContext.OPENID
        }).get()
        console.log('regData99999999', regData, event)
        // 如果有
        if (regData.data.length > 0) return {
            code: 200,
            data: [],
            msg: '登陆成功'
        }

        // 没有
        //1.保存用户信息
        await db.collection('user').add({
            data: {
                user_openid: wxContext.OPENID,
                avatar: event.avatarUrl,
                name: event.nickName,
                createTime: new Date()
            }
        })

        //2.初始化icon表
        //2.1 查找icon

        let iconData = await db.collection('iconfont').where({
            iconflag: "1"
        }).get()
        //2.2 插入iconfont
        if (iconData.data.length > 0) {
            for (let i = 0; i < iconData.data.length; i++) {
                await db.collection('own_iconfont').add({
                    data: {
                        icon_created_user_openid: wxContext.OPENID,
                        icon_class: iconData.data.iconclass,
                        icon_name: iconData.data.iconname,
                        icon_sort: iconData.data.iconsort,
                        is_remove: 1
                    }
                })
            }
        }
        //初始化账本 
        let ledgerDate = await db.collection('ledger').add({
            data: {
                create_user_openid: wxContext.OPENID,
                create_time: new Date(),
                billname: '日常账单',
                isreomve: "1"
            }
        })

        //初始化账本关联
        // ledger_association
        await db.collection('ledger_association').add({
            data: {
                ledgerid: ledgerDate._id,
                association_user_openid: wxContext.OPENID
            }
        })

        return {
            code: 200,
            data: [],
            msg: '登陆成功'
        }

    } catch (e) {
        console.log(e)
    }
};