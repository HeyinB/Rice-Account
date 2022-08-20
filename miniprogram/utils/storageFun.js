async function getStorageFun(name) {
  return wx.getStorageSync(name);
}

async function setStorageFun(name, data) {
  wx.setStorageSync(name, data);
}

module.exports = {
  getStorageFun,
  setStorageFun,
};
