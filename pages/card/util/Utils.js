
import { getCardInfo } from 'bus-tinyapp-components/es/utils'
// 时间
const getTimestamp = () => {
    return Math.floor(new Date().getTime() / 1000);
};

const arrayFind = (arr, predicate) => {
    if (!arr) {
    return null;
  }

  for (let i = 0; i < arr.length; i += 1) {
    if (predicate(arr[i], i)) {
      return arr[i];
    }
  }
};

const formatRMBYuanDecimal = (fen) => {
    return (fen / 100).toFixed(2);
};

const getAccountByType = (arr, tp) => {
    return arrayFind(arr, item => item.type === tp);
};

const isIOS = () => {
  if (getApp().systemInfo.platform) {
    return getApp().systemInfo.platform === 'iOS';
  } else {
    return false;
  }
};

const rpcCardInfo = (cardType)=> {
  return new Promise((resolve,reject) =>{
    let timerId =setTimeout(()=>{
      console.log('getCardInfo', "Timeout")
      reject(new Error("Timeout"))
    }, 3000)
     return getCardInfo(cardType).then(res => {
      clearTimeout(timerId)
      resolve(res)
    }).catch((err)=>{
       clearTimeout(timerId)
      console.log('getCardInfo', err)      
      reject(err)
    })
  }
  )

}

export default {
    rpcCardInfo,
    getTimestamp,
    arrayFind,
    formatRMBYuanDecimal,
    getAccountByType,
    isIOS,
};