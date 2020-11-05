// 配置文件
const base = {
  default: {
    appid: '2019022163294228',
    cardType: '',
    cityCode: '',
    title: ''
  }
}

const city = 'default'

export default base[city]

export const appKey = ''

export const alipayAppId = base[city].appid

export const rsaType = 'RSA2'

export const cardType = base[city].cardType
// localstorage
export const sessionIdName = 'tklc'