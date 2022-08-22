
import require from '../utils/request'

const getBill = async (model) => {
  return await require({
    url: 'bill/getBill',
    method: 'get',
    data: {
      ...model
    }
  })
}

const getBillById = async (model) =>{
  return await require({
    url:'bill/getBillById',
    data:{
      ...model
    }
  })
}


module.exports = {
    getBill,
    getBillById
}
