const cloud = require('wx-server-sdk');
// cloud.init({
//   env: cloud.DYNAMIC_CURRENT_ENV
// });
cloud.init();
const db = cloud.database();
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // return {event, context}
  // let data = 
  try{
    return await db.collection('bill').add({
      data:{
        classid: event.classid,
        price: event.price,
        remark: event.remark,
        date: event.date,
        create_date: event.create_date,
        date_unix:event.date_unix,
        openId: event.userInfo.openId
      },
      success: function (res) {
      }
    })
  } catch(e){
    console.log(e)
  }
};