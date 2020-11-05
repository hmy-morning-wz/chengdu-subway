/**
 * 
 * https://developers.weixin.qq.com/miniprogram/dev/extended/utils/sm-crypto.html
 * sm2
获取密钥对
const sm2 = require('miniprogram-sm-crypto').sm2;

let keypair = sm2.generateKeyPairHex();

publicKey = keypair.publicKey; // 公钥
privateKey = keypair.privateKey; // 私钥
加密解密
const sm2 = require('miniprogram-sm-crypto').sm2;
const cipherMode = 1; // 1 - C1C3C2，0 - C1C2C3，默认为1

let encryptData = sm2.doEncrypt(msgString, publicKey, cipherMode); // 加密结果
let decryptData = sm2.doDecrypt(encryptData, privateKey, cipherMode); // 解密结果
签名验签
ps：理论上来说，只做纯签名是最快的。

const sm2 = require('miniprogram-sm-crypto').sm2;

// 纯签名 + 生成椭圆曲线点
let sigValueHex = sm2.doSignature(msg, privateKey); // 签名
let verifyResult = sm2.doVerifySignature(msg, sigValueHex, publicKey); // 验签结果

// 纯签名
let sigValueHex2 = sm2.doSignature(msg, privateKey, {
    pointPool: [sm2.getPoint(), sm2.getPoint(), sm2.getPoint(), sm2.getPoint()], // 传入事先已生成好的椭圆曲线点，可加快签名速度
}); // 签名
let verifyResult2 = sm2.doVerifySignature(msg, sigValueHex2, publicKey); // 验签结果

// 纯签名 + 生成椭圆曲线点 + der编解码
let sigValueHex3 = sm2.doSignature(msg, privateKey, {
    der: true,
}); // 签名
let verifyResult3 = sm2.doVerifySignature(msg, sigValueHex3, publicKey, {
    der: true,
}); // 验签结果

// 纯签名 + 生成椭圆曲线点 + sm3杂凑
let sigValueHex4 = sm2.doSignature(msg, privateKey, {
    hash: true,
}); // 签名
let verifyResult4 = sm2.doVerifySignature(msg, sigValueHex4, publicKey, {
    hash: true,
}); // 验签结果

// 纯签名 + 生成椭圆曲线点 + sm3杂凑（不做公钥推导）
let sigValueHex5 = sm2.doSignature(msg, privateKey, {
    hash: true,
    publicKey, // 传入公钥的话，可以去掉sm3杂凑中推导公钥的过程，速度会比纯签名 + 生成椭圆曲线点 + sm3杂凑快
});
let verifyResult5 = sm2.doVerifySignature(msg, sigValueHex5, publicKey, {
    hash: true,
    publicKey,
});
获取椭圆曲线点
const sm2 = require('miniprogram-sm-crypto').sm2;

let poin = sm2.getPoint(); // 获取一个椭圆曲线点，可在sm2签名时传入
sm3
const sm3 = require('miniprogram-sm-crypto').sm3;

let hashData = sm3('abc'); // 杂凑
sm4
加密
const sm4 = require('miniprogram-sm-crypto').sm4;
const key = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10];

let encryptData = sm4.encrypt([0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10], key); // 加密
解密
const sm4 = require('miniprogram-sm-crypto').sm4;
const key = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10];

let decryptData = sm4.decrypt([0x68, 0x1e, 0xdf, 0x34, 0xd2, 0x06, 0x96, 0x5e, 0x86, 0xb3, 0xe9, 0x4f, 0x53, 0x6e, 0x42, 0x46
 * 
 * 
 */
const {BigInteger} = require('jsbn')
const sm2 =require('../../sm').sm2;
const _ = require('../../sm/sm2/utils')
function generateEcparam() {
  // 椭圆曲线
  const p = new BigInteger('FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF', 16)
  const a = new BigInteger('FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC', 16)
  const b = new BigInteger('28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93', 16)
  //const curve = new ECCurveFp(p, a, b)
 const pOverFour = p.add(BigInteger.ONE).shiftRight(2)
 const pLength = Math.floor((p.bitLength() + 7) / 8)
  // 基点
 
  //const gxHex = '32C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7'
  //const gyHex = 'BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0'
  //const G = curve.decodePointHex('04' + gxHex + gyHex)

  const n = new BigInteger('FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123', 16)

  return {p, a, b,  n,pOverFour,pLength}//G
}

let Ecparam = generateEcparam()
export const SM2 = Ecparam

function pointFromX2XY(pub){
    let isOdd = 0x03 == parseInt(pub.substr(0, 2), 16)
    let s =pub.substr(2)
    let x = new BigInteger( s ,16)
    return pointFromX(isOdd,x)
}

function pointFromX(isOdd, x){
  
 var alpha = x.pow(3).add(Ecparam.a.multiply(x)).add(Ecparam.b).mod(Ecparam.p)
  var beta = alpha.modPow(Ecparam.pOverFour, Ecparam.p) // XXX: not compatible with all curves

  var y = beta
  if (beta.isEven() ^ !isOdd) {
    y = Ecparam.p.subtract(y) // -y % p
  }

  return '04'+x.toString(16) + y.toString(16)

}

/**
 * 
 
 * 
 * 
 */


export default {//SM2Utils
generateKey(){
let keypair = sm2.generateKeyPairHex();
//publicKey = keypair.publicKey; // 公钥
//privateKey = keypair.privateKey; // 私钥
return keypair
},
Sm2verify(userId,msg,sigValueHex5,publicKeyX){  
  try{
    let publicKey = pointFromX2XY(publicKeyX)
    let _msg = _.hexToArray(msg)
   console.log("Sm2verify",{userId,msg,sigValueHex5,publicKey,publicKeyX})
  //msg, signHex, publicKey, {der, hash} 
let verifyResult5 = sm2.doVerifySignature(_msg, sigValueHex5,publicKey , {
    hash: true  
});
console.log("Sm2verify verifyResult5",verifyResult5)
   return verifyResult5
  }catch(e) {
    console.warn(e)
  }
},
Sm2Sign(userId,msg,privateKey,publicKey){
   publicKey = pointFromX2XY(publicKey)
     console.log("Sm2Sign",{userId,msg,privateKey,publicKey})
let sigValueHex5 = sm2.doSignature(msg, privateKey, {
    hash: true,
    publicKey, // 传入公钥的话，可以去掉sm3杂凑中推导公钥的过程，速度会比纯签名 + 生成椭圆曲线点 + sm3杂凑快
});
return sigValueHex5
}
}

