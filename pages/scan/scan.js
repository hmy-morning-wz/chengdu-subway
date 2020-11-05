import utils from 'mini-base64';
import {decodeData,decodeDataJTB} from './utils'
//import {sm3} from './sm3'
const sm3 = require('../../sm').sm3;
const _ = require('../../sm/sm2/utils')
/*
const { KJUR ,CryptoJS} = require('../../utils/jsrsasign-all-min')
let secret = 'f13fd4b597da5a2ac73f68115bd51a7c186a55f7f8a50fde4ff5d0ae057acce9'
let pub = '04aca0068c12466893591bde12c2024c1009332e0004d07381e570b6c38d5e2803335fcc60a6a9d1aeb2285a519d67d3911a7da03d69cc6cccf2ff58446e72595b'
let signData  = secret

 var sig = new KJUR.crypto.Signature({ alg: 'SHA1withECDSA' })
  sig.initSign({ ecprvhex: secret, eccurvename: 'secp256k1' })
  sig.updateHex(signData)
  var sigValue = sig.sign()
  console.log('sigValue',sigValue)

   var sig = new KJUR.crypto.Signature({ alg: 'SHA1withECDSA' })
   sig.initVerifyByPublicKey({ ecpubhex: pub, eccurvename: 'secp256k1' })
   sig.updateHex(signData)
   var verify = sig.verify(sigValue)
   console.log('verify',verify)

var hasher = CryptoJS.algo.SHA1.create();
hasher.reset();
hasher.update('message');
var hash = CryptoJS.enc.Hex.stringify(hasher.finalize());
console.log('hash', hash)

//var SECP192K1 = require("../../sm/secp192");
var SECP256K1 = require("../../sm/secp256");

var BigInteger = require('bigi');
let prvkey = secret//'9001070404002103317bf9bcc4e7c7873794a927fec18011ddb183de4879715a'
var msg_sha1 = new BigInteger(hash,16)//new Buffer(prvkey,'hex');
var d = new BigInteger(prvkey,16)//.fromBuffer(new Buffer(prvkey,'hex'));
var sig  = SECP256K1.sign(msg_sha1,d);
console.log("sig",sig.r.toString(16),sig.s.toString(16))
var Q = SECP256K1.getQ(d)
var out  = SECP256K1.verify(msg_sha1,sig,Q);
console.log("out",out)
*/
/*

const DEFAULT_USER_ID = "1234567812345678";

let msg ='AC03F938EC8987E7883709BBD6A553621831256D3E74648F490C1EE681BBEA98240101000017120211345006209001070404002103317bf9bcc4e7c7873794a927fec18011ddb183de4879715a30b7de257d23793cf0266e0f15c0fb4da577cfacd1249c5728859b38a4aaea46b7469497367672f0325216db9b9cfa6d460132468172921a79b0adbeba7edcab9036a10cc970d67832303838373032333732383632303934900120887023728620940211345050023301000007d00318cb7fdc88d321a794b672e690ed5e5e9914aa34d7ab2ada505a863807971bc05efad92c025800'

let sm3hash = sm3(msg)
console.log('sm3hash',sm3hash)

const SM3Digest = require('../../sm/sm2/sm3')
const smDigest = new SM3Digest()
 const hashData = new Array(smDigest.getDigestSize())
 msg = _.hexToArray(msg)
  smDigest.blockUpdate(msg, 0, msg.length)

  smDigest.doFinal(hashData, 0)

   let out = _.arrayToHex(hashData).toString()
console.log('SM3Digest',out)
*/
/*
const bs64 = 'QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODk=';
console.log(arrayBufferToBase64(base64ToArrayBuffer(bs64)) === bs64); // true

// 将 ArrayBuffer 数据转成 Base64 字符串
const arrayBuffer = new Uint8Array([11, 22, 33])
const base64 = arrayBufferToBase64(arrayBuffer)
*/
/*
// 将 Base64 字符串转成 ArrayBuffer 数据
const base64 = 'CxYh'
const arrayBuffer = base64ToArrayBuffer(base64)
*/

function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}
const qr1 = '02010073323038383730323337323836323039345ef9516002580dac00000007000000000000000003c10b8ff7c642415fb8fb93ced68c06f7c472f21d48ceffb7543033333031303010333130303730303031313736303431301c1b010002000000000000000012345678341200000000000080557170463044022002a52f852ecc469570b4f107e4bf12313fada8127dbad936443127a45ca0ee3a0220204be33dbe67f364527cfa39ae6f2097785c9d9fe2c3bf55079bd20cd5709e2b045ef01a443730350218669e4be90edf2717628827a518d5a22a5b0e28e1cd482320021900d0e2f1f550ec81a0b25bdc4c3597f24873c9db9022efc856'
const qr2 = "AgEAczIwODg3MDIzNzI4NjIwOTRe+VFgAlgNrAAAAAcAAAAAAAAAAAPBC4/3xkJBX7j7k87WjAb3xHLyHUjO/7dUMDMzMDEwMBAzMTAwNzAwMDExNzYwNDEwHBsBAAIAAAAAAAAAABI0Vng0EgAAAAAAAIBVcXBGMEQCIAKlL4UuzEaVcLTxB+S/EjE/ragSfbrZNkQxJ6RcoO46AiAgS+M9vmfzZFJ8+jmubyCXeFydn+LDv1UHm9IM1XCeKwRe8BpENzA1AhhmnkvpDt8nF2KIJ6UY1aIqWw4o4c1IIyACGQDQ4vH1UOyBoLJb3Ew1l/JIc8nbkCLvyFY="
const qr3 ='gQFJJAEBAAAXEgIRNFAGIJABBwQEACEDMXv5vMTnx4c3lKkn/sGAEd2xg95IeXFaMLfeJX0jeTzwJm4PFcD7TaV3z6zRJJxXKIWbOKSq6ka3RpSXNnZy8DJSFtubnPptRgEyRoFykhp5sK2+un7cq5A2oQzJcNZ4MjA4ODcwMjM3Mjg2MjA5NJABIIhwI3KGIJQCETRQUAIzAQAAB9ADGMt/3IjTIaeUtnLmkO1eXpkUqjTXqyraUFqGOAeXG8Be+tksAlgAFSyBus79bW3zapMRJ7YsOv+UVSsblBaK7kpIvW+B8jnd5R8ojfQP1jfDSPGTHRAOrjGYG7HZEc564D0GjFRMyjhe8Z6sFaI1EkRfXiPMYBRVW/GhiJt3noo6x8fw2jg65pJ40R3AkOD6HT3urp51MEExy/69qp+y5XWvhVgPwuuYr/GM0t8='
const qr4 = 'VAECAhB1MjY2MDAwMDAwMTUzOTE3MV71UzUCWAfQAAAAAAAAAAAAAAAAArakiFVxF1rXBGJnrLy5damp/kaWfEGV3DAwMDAwMDAwEDcyMTAwMDA0NDUwMjcyMjQeAQFyEBqGk5ggKBEjAABkAAAAAAAnEI5J0KBGAo+hRzBFAiBGFEgtEFaMnZ004/+183yPDu690vfhR0U0Q+/T1Gp8fAIhAMvJTqaNmeiuSJuC+yFBBGC3lktfYZ9Js+oz03TfugQfBF70Abc4MDYCGQCESdLdUMSS5FYJxBS+Y5TExFo8s3IAeDkCGQDZ0PaqmPww8/myVFV06xdnsMjtW5X/GU4='
const qr5 = 'VAECAQF1MzIwMjAwMTAwMDAwMDAwMl75pekCWAfQAAAAAAAAAAAAAAAAArr92yvfwthua3qEoql70jlFY7hFpYLr7zAwMDAwMDAwEDk2MTY5NTAwMDAwMDEwNTIeAQEiUAAABBwgJxIYAABkAAAAAAAnEFY6t7BWOdXURjBEAiBjhnNPMcZ4Lg1sgPkmVSOu5PrOrI/r2AB6B4+WSSMPCwIgf6HFLXzC6WacnnV5PUZxFzZIMiYN8GnjfLL0Fv3xd9YEXvhUajYwNAIYcVytLXz5Q5fR7/yXOBuVHRkmCIWGJjTiAhgMZjnbwx4KeGnuS7wO8ZzXk8N9ndNfQaM='
/**
 * 02010073323038383730323337323836323039345ef9516002580dac00000007000000000000000003c10b8ff7c642415fb8fb93ced68c06f7c472f21d48ceffb7543033333031303010333130303730303031313736303431301c1b010002000000000000000012345678341200000000000080557170463044022002a52f852ecc469570b4f107e4bf12313fada8127dbad936443127a45ca0ee3a0220204be33dbe67f364527cfa39ae6f2097785c9d9fe2c3bf55079bd20cd5709e2b045ef01a443730350218669e4be90edf2717628827a518d5a22a5b0e28e1cd482320021900d0e2f1f550ec81a0b25bdc4c3597f24873c9db9022efc856
 * 
 */
const {arrayBufferToBase64, base64ToArrayBuffer} = utils;
function verifyQrcode(token){   
  const TAG = "QRCODE"    
        let buffer =token = new Uint8Array(base64ToArrayBuffer(token));  
         let type
        if ( buffer[0]==0x54 && (buffer[1]==0x01 || buffer[1]==0x02)    ) {
            console.log(TAG,"通卡二维码");            
            buffer = token = buffer.subarray(2)
            type = 0;          
            this.setData({codeType:"通卡二维码"})
        } else if ((buffer[0] & 0x0080) != 0) {
             console.log(TAG, "交通部二维码");
            type = 2;       
             this.setData({codeType:"交通部二维码"})
        }  else if ((buffer[0] & 0x00ff) ==0x55) {
             console.log(TAG, "统一发码平台二维码");
            type = 3;  
              this.setData({codeType:"统一发码平台二维码"})       
        } else if(buffer[0]==0x02 && buffer[1]==0x01){
             console.log(TAG,"支付宝二维码");
              this.setData({codeType:"支付宝二维码"})  
            type = 1;        
        }else {
           this.setData({codeType:"未知码类型"})  
          return {out:"unknown"}
        }

        if(type==0 || type==1) {
            try {       
               // QR decode = decodeData(token);
           return  decodeData(token,{type})
            } catch (e) {
               console.log(e)
              this.setData({codeType:"解析错误"}) 
            }
        }else if(type == 2 || type == 3 ){
            try {
            return  decodeDataJTB(token);
               // QR decode = decodeDataJTB(token);
             
               
            } catch (e) {
               console.log(e)
                this.setData({codeType:"解析错误"}) 
            }
        }
        return {};
}
Page({
  data:{
  // base64Data:qr2
  },
  verifyQrcode,
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  
   // this.verifyQrcode(qr2)
   // this.verifyQrcode(qr3)
    //this.verifyQrcode(qr5)
    //this.verifyQrcode("")
    
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
    handleCopy(e) {
      console.log(e)
      let {currentTarget:{dataset:{text}} }  = e
   if (text){
     my.setClipboard({
      text: text,
    });
    my.showToast({content:"setClipboard" });
   }
  },
  onScan(){
    my.scan({success:(res)=>{      
      let base64Data = res.rawData
      if(base64Data) {
      const arrayBuffer = base64ToArrayBuffer(base64Data)
      let qr = this.verifyQrcode(base64Data)
      this.setData({rawData:arrayBuffer,base64Data:res.rawData,hexData:buf2hex(arrayBuffer),decodeData:qr.out})
      }
    }})
  }
});
