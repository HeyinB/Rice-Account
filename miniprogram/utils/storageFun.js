async function getStorageFun(name) {
  return new Promise(async (resolve, reject) => {
    await wx.getStorage({
      key: name,
      encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
      success(res) {
        resolve(res.data.data);
      },
    });
  });
}

async function setStorageFun(name,data) {
  return new Promise(async (resolve, reject) => {
    await wx.setStorage({
      key: name,
      data,
      encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
      success(res) {
        resolve(res.data.data);
      },
    });
  });
}


module.exports = {
    getStorageFun,
    setStorageFun
}