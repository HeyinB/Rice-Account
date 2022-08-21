import require from "../utils/request";

// 根据id和openid获取用户icond
const getOwnClassIcon = async (data) => {
  return await require({
    url: "classicon/getOwnClassIcon",
    data
  });
};

const setBill = async (data)=>{
  return await require({
    url:'bill/setBill',
    method:'POST',
    data
  })
}

module.exports = {
  getOwnClassIcon,
  setBill
};
