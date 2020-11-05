
//const devDomain ='https://test-metro-nj-ech5.allcitygo.com' // 'https://metro-ech5.alipay-eco.com'// 'https://metro-ech5.allcitygo.com'
//const cardManageDomain ='https://test-metro-nj-ech5.allcitygo.com' // 'https://metro-ech5.alipay-eco.com' //'https://metro-ech5.allcitygo.com' // https://metro-ech5.allcitygo.com  https://metro-ech5.allcitygo.com
//const DefaultDomain ='https://test-metro-nj-ech5.allcitygo.com'  //  'https://metro-ech5.alipay-eco.com' //'https://metro-ech5.allcitygo.com'
const extJson = my.getExtConfigSync()
const DefaultDomain= extJson.apiHost ||  "https://metro-ech5.alipay-eco.com"
export default function getDomain(urlType) {
  /*
  let domain = devDomain
  if (urlType === 'default') {
    domain = DefaultDomain
  } else if (urlType === 'cardManageDomain') {
    domain = cardManageDomain
  }
  */
  return DefaultDomain
}
