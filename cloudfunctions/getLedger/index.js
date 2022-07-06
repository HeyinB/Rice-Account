const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
exports.main = async (event, context) => {
    const db = cloud.database()
    const wxContext = cloud.getWXContext()

    let data = await getLedgerList(db,wxContext.OPENID)

    return data
}

function getLedgerList(db,OPENID){
    return new Promise((resolve,reject)=>{
        db.collection('ledger_association').aggregate().lookup({
            from: 'ledger',
            localField: 'ledgerid',
            foreignField: '_id',
            as: 'ledgerList',
          }).match({
            association_user_openid: OPENID
        }).end()
        .then(res => resolve(res.list))
    })
}

