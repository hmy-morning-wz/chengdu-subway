import utils from 'mini-base64';
import SM2Utils from './sm2Utils'
import {testsm2key,prdsm2key,yzprdkey,yztestkey} from "./key"
const ecurve = require('ecurve');
const BigInteger = require('bigi');
const SECP192K1 = ecurve.getCurveByName('secp192k1');
const SECP256K1 = ecurve.getCurveByName('secp256k1');
const { KJUR ,CryptoJS} = require('../../sm/jsrsasign-all-min')
const {arrayBufferToBase64, base64ToArrayBuffer} = utils;
const TAG = 'QRCODE'
const CERT_FILE ="013439309088661218.IG02" ;
const PUBLIC_FILE ="01010000.JG02" ;
const CERT ="24010120200212013439301218908866" +
            "04042021030DBF032921DCE84D198460" +
            "49D07043CEC077486CBB64BC4C659975" +
            "F23A849AE5BB2589B795054A26B49068" +
            "5384CAAF21E7EDA1D55E6688C8F46B83" +
            "701C77C6FDC6C968C369DFD06F3EEBF8" +
            "2D08A563BC94074E7F59EA91604D59F5" +
            "19A3069B7E";
 const ALG_SECP192K1=3;
const ALG_SECP256K1=1;
const ALG_SM2=2;
function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}            
class StringBuilder{
  str=""
  constructor(){

  }
  append(str){
    this.str +=str
    return this
 }
 toString(){
   return this.str
 }
}

class ByteString{
   buffer=[]
   constructor(buffer){
    this.buffer = buffer
 
  }
  hex(){
    return buf2hex( this.buffer)
  }
  utf8(){  
    return this.buffer.reduce((p,v)=>{ 
      p += String.fromCharCode(v) 
      return p
      },"")
  }
}


function arraycopy(src, srcPos, dest, destPos, lenght) {
  for(let i=0;i<lenght;i++) {
   dest[destPos+i] =    src [srcPos+i]
  }
  
}    
function ByteStringOf(a) {
  return new ByteString(a)
}
function integerToString(x){
  return  x.toString()
}

function toHexString(x){ 
  return x.toString(16)
}
function dateFormat(f,d){
   return d.toLocaleString() 
}

export  function decodeCert21(/*byte []*/data){
         let  qr = {}
        /*byte[]*/ let buffer;
        let index = 0;
        let stringBuilder = new StringBuilder();
        stringBuilder.append("证书-记录头: ");
        stringBuilder.append(toHexString(0x00ff&data[index]));index+=1;
        stringBuilder.append("\n");
        stringBuilder.append("证书-服务标识: ");
        buffer= new Uint8Array(4)///*[] // [4]*/[];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");

        buffer= new Uint8Array(5) // [5];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;


        stringBuilder.append("证书-中心CA证书公钥索引: ");
        stringBuilder.append(toHexString(0x00ff&data[index]));index+=1;
        stringBuilder.append("\n");

        stringBuilder.append("证书-证书失效日期: ");
        buffer= new Uint8Array(2)//[] // [2];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");

        stringBuilder.append("证书-发卡机构公钥签名算法标识: ");
        stringBuilder.append(toHexString(0x00ff&data[index]));index+=1;
        stringBuilder.append("\n");

        stringBuilder.append("证书-发卡机构公钥参数标识: ");
        stringBuilder.append(toHexString(0x00ff&data[index]));index+=1;
        stringBuilder.append("\n");




        stringBuilder.append("证书-发卡机构公钥长度: ");
        let len = data[index];
        stringBuilder.append(integerToString(len));index+=1;
        stringBuilder.append("\n");

        stringBuilder.append("证书-发卡机构公钥: ");
        buffer=  new Uint8Array(len) // [len];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");
        if (len == 64) {
            qr.pubKey =new Uint8Array(65) // [65];
            qr.pubKey[0] = 0x04;
            arraycopy(buffer, 0, qr.pubKey, 1, buffer.length);
        } else {
            qr.pubKey = buffer;
        }



        stringBuilder.append("证书-数字签名: ");
        buffer= /*[] // [64]*/[];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");
        /*byte[]*/let  sign1 =  buffer;




        return  stringBuilder.toString();
    }

export function decodeCert(qr,/*byte []*/data){
        /*byte[]*/let  buffer;
        //let qr={}
        let index = 0;
        let stringBuilder = new StringBuilder();
        stringBuilder.append("证书-记录头: ");
        stringBuilder.append(toHexString(0x00ff&data[index]));index+=1;
        stringBuilder.append("\n");
        stringBuilder.append("证书-服务标识: ");
        buffer= new Uint8Array(4)// /*[] // [4]*/[];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");
        stringBuilder.append("证书-中心CA证书公钥索引: ");
        stringBuilder.append(toHexString(0x00ff&data[index]));index+=1;
        stringBuilder.append("\n");
        stringBuilder.append("证书-证书格式: ");
        stringBuilder.append(toHexString(0x00ff&data[index]));index+=1;
        stringBuilder.append("\n");
        stringBuilder.append("证书-发卡机构标识: ");
        buffer= new Uint8Array(4) ///*[] // [4]*/[];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");

        stringBuilder.append("证书-证书失效日期: ");
        buffer= new Uint8Array(2) // [2];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");

        stringBuilder.append("证书-证书序列号: ");
        buffer=new Uint8Array(3) // [3];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");

        stringBuilder.append("证书-发卡机构公钥签名算法标识: ");
        stringBuilder.append(toHexString(0x00ff&data[index]));index+=1;
        stringBuilder.append("\n");

        stringBuilder.append("证书-发卡机构公钥加密算法标识: ");
        stringBuilder.append(toHexString(0x00ff&data[index]));index+=1;
        stringBuilder.append("\n");

        stringBuilder.append("证书-发卡机构公钥参数标识: ");
        stringBuilder.append(toHexString(0x00ff&data[index]));index+=1;
        stringBuilder.append("\n");

        stringBuilder.append("发卡机构公钥长度: ");
        stringBuilder.append(integerToString(data[index]));index+=1;
        stringBuilder.append("\n");

        stringBuilder.append("证书-发卡机构公钥: ");
        buffer=new Uint8Array(33)// /*[] // [33]*/[];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");
        qr.pubKey = buf2hex(buffer);

        stringBuilder.append("证书-数字签名: ");
        buffer=new Uint8Array(64) ///*[] // [64]*/[];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");
        /*byte[]*/let sign1 =  buffer;

        let PUBLIC_KEY =null// "04017459D79CDD1AC07ACBBFEEBFBE88D6E6D083B96DCDDF979E40170F61308FAB2F4092F6B75389AF8B028C4D15CA3F8CAE88CBD69D98280FDA40E683DB02EBCF";
        if(PUBLIC_KEY!=null) {
            try {
                //2101010000a000000632021240041140dcb53b215317dd87eac919eea6524085cacf49e37cf055b0b6c0aa84d8157f496f32bfd10bef202cdd897fa8e6172f2f14e3ca810fed8089702cb61277690c6c4ef502d60834bb033ab536d4d652a200f08ee141cdd6695c44580f0a75af944249fc17b5652bab5e4df6b2c692fa351e04ac52850a6adffb2e12053f34b800d2
                /*byte[]*/let  msgsha1 =new Uint8Array(data.length - 64 - 1 - 4 - 1) // [data.length - 64 - 1 - 4 - 1];
                arraycopy(data, 6, msgsha1, 0, msgsha1.length);
                // ECPublicKeyParameters publicKeyParameters1 = CryptoHelper.getECPubKey("SM2", ByteString.decodeHex(PUBLIC_KEY).toByteArray());
                let  ret = SM2Utils.Sm2verify(null, buf2hex(msgsha1), buf2hex(sign1), PUBLIC_KEY);
                qr.ret0 = ret;
                stringBuilder.append("证书-证书签名验证 ");
                stringBuilder.append(ret);
                stringBuilder.append("\n");
               console.log(TAG,"证书-证书签名验证  "+ret);
            }catch (e){
              
            }
        }

        return  stringBuilder.toString();
    }

export function decodeDataJTB(/*byte []*/data){
        let qr= {
          cert:new Uint8Array(117)//117
        }  
        /*byte[]*/ let buffer;
        let index = 0;
        let stringBuilder = new StringBuilder();
        stringBuilder.append("版本: ");
        stringBuilder.append(toHexString(qr.version = (0x00ff & (data[index])))); index+=1;
        stringBuilder.append("\n");
        stringBuilder.append("二维码数据长度:");
        stringBuilder.append(qr.len =getShort(data,index)); index+=2;
        stringBuilder.append("\n");
        stringBuilder.append("机构证书:");
        arraycopy(data,index,qr.cert,0,qr.cert.length);index+=qr.cert.length;
        stringBuilder.append(ByteStringOf(qr.cert).hex());
        stringBuilder.append("\n");
        stringBuilder.append(decodeCert(qr,qr.cert));
        stringBuilder.append("\n");
        stringBuilder.append("支付账户号:");
        /*byte[]*/let  userId =new Uint8Array(16) // [16];
        arraycopy(data,index,userId,0,userId.length);index+=userId.length;
        stringBuilder.append(qr.userId = ByteStringOf(userId).utf8());
        stringBuilder.append("\n");

        stringBuilder.append("用户账户号:");
        buffer= new Uint8Array(10) // [10];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(qr.cardNo = ByteStringOf(buffer).hex());
        stringBuilder.append("\n");


        stringBuilder.append("发卡机构代码:");
        buffer=new Uint8Array(4)// /*[] // [4]*/[];
        arraycopy(data,index,buffer,0,buffer.length);;index+=buffer.length;
        stringBuilder.append(qr.ccCode = ByteStringOf(buffer).hex());
        stringBuilder.append("\n");


        stringBuilder.append("发码平台编号:");
        buffer=new Uint8Array(4) ///*[] // [4]*/[];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(qr.cpCode = ByteStringOf(buffer).hex());
        stringBuilder.append("\n");


        stringBuilder.append("用户账户类型:");

        stringBuilder.append(qr.accountType =  data[index]);index+=1;
        stringBuilder.append("\n");

        stringBuilder.append("单笔限额:");
        stringBuilder.append(qr.moneyLimit =  getShort(data,index));index+=3;
        stringBuilder.append("\n");

        stringBuilder.append("公钥:");
        buffer=new Uint8Array(33) ///*[] // [33]*/[];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(ByteStringOf(buffer).hex());
        stringBuilder.append("\n");
        qr.userPubkey = buf2hex(buffer);
        stringBuilder.append("支付账户系统授权过期时间:");
        qr.expTimestamp = getLong(data,index);index+=4;
        stringBuilder.append(qr.expTimestamp ).append(" ");
        stringBuilder.append( dateFormat("yyyy-M-d HH:mm:ss.sss",new Date(qr.expTimestamp*1000)));
        stringBuilder.append("\n");
        stringBuilder.append("二维码有效时间:");
        stringBuilder.append(qr.timeout =  getShort(data,index));index+=2;
        stringBuilder.append("秒\n");









        stringBuilder.append("卡数据（发卡机构自定义域）:");
        let len = data[index]; index+=1;
       console.log(TAG,"卡数据（发卡机构自定义域） len = "+len);
        buffer=new Uint8Array(len) // [len];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append(qr.cardData = ByteStringOf(buffer).hex());
        stringBuilder.append("\n");

        buffer = new Uint8Array(index-3) // [index-3];
        arraycopy(data,3,buffer,0,buffer.length);
        qr.msgsha1 =buffer;

        index+=1;
        stringBuilder.append("发卡机构授权签名:");
        buffer=new Uint8Array(64)// /*[] // [64]*/[];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append( ByteStringOf(buffer).hex());
        stringBuilder.append("\n");
        qr.sign1 = buffer;
        // ECPublicKeyParameters publicKeyParameters1 = CryptoHelper.getECPubKey("SM2", qr.pubKey);

        let  ret1  = SM2Utils.Sm2verify(null,buf2hex(qr.msgsha1),buf2hex(qr.sign1), qr.pubKey);
        stringBuilder.append("发卡机构授权签名验证 ").append(ret1).append("\n");
        qr.ret1 = ret1;

        stringBuilder.append("二维码生成时间:");
        qr.timestamp = getLong(data,index);index+=4;
        stringBuilder.append(qr.timestamp ).append(" ");
        stringBuilder.append( dateFormat("yyyy-M-d HH:mm:ss.sss",new Date(qr.timestamp*1000)));
        stringBuilder.append("\n");

        buffer =new Uint8Array(index) // [index];
        arraycopy(data,0,buffer,0,buffer.length);
        qr.msgsha2 =buffer;

        index+=1;
        stringBuilder.append("支付账户用户私钥签名:");
        buffer= new Uint8Array(64)///*[] // [64]*/[];
        arraycopy(data,index,buffer,0,buffer.length);index+=buffer.length;
        stringBuilder.append( ByteStringOf(buffer).hex());
        stringBuilder.append("\n");
        qr.sign2 = buffer;
        // ECPublicKeyParameters publicKeyParameters2 = CryptoHelper.getECPubKey("SM2", qr.userPubkey);
       console.log(TAG,"支付账户用户私钥签名验证...");
        let  ret2  = SM2Utils.Sm2verify(null,buf2hex(qr.msgsha2),buf2hex(qr.sign2),qr.userPubkey);
       console.log(TAG,"支付账户用户私钥签名验证结果 "+ret2);
        stringBuilder.append("支付账户用户私钥签名验证 ").append(ret2).append("\n");
        qr.ret2= ret2;

        qr.out = stringBuilder.toString();
        console.log(TAG,qr.out ,qr);
        return qr;
    }

export function decodeData(/*byte []*/data,option={}){
      //  console.log("decodeData",data)
      let {type} = option  
          let alg2 = ALG_SECP192K1
        let qr= {};
       //this.qr = qr;
        let  stringBuilder = new StringBuilder();
        stringBuilder.append("版本: ");
        stringBuilder.append(qr.version = data[0]);
        stringBuilder.append("\n");
        stringBuilder.append("算法标识:");
        qr.alg =data[1]      
        stringBuilder.append(`${qr.alg}(${qr.alg==ALG_SECP256K1?'SECP256K1':'SM2'})`);
        stringBuilder.append("\n");
        stringBuilder.append("公钥索引:");
        stringBuilder.append(qr.keyIndex = data[2]);
        stringBuilder.append("\n");
        stringBuilder.append("长度:");
        stringBuilder.append(qr.data1Len = data[3]);
        stringBuilder.append("\n");
        stringBuilder.append("userId:");
        /*byte[]*/let  userId =new Uint8Array(16)/// [16];
        
        arraycopy(data,4,userId,0,userId.length);
        stringBuilder.append(qr.userId = ByteStringOf(userId).utf8());
        stringBuilder.append("\n");
        stringBuilder.append("过期时间:");
        qr.expTimestamp = getLong(data,20);
        stringBuilder.append(qr.expTimestamp ).append(" ");
        stringBuilder.append( dateFormat("yyyy-M-d HH:mm:ss.sss",new Date(qr.expTimestamp*1000)));
        stringBuilder.append("\n");
        stringBuilder.append("有效时间:");
        stringBuilder.append(qr.timeout =  getShort(data,24));
        stringBuilder.append("秒\n");

        stringBuilder.append("单笔限额:");
        stringBuilder.append(qr.moneyLimit =  getShort(data,26));
        stringBuilder.append("\n");
/*
        stringBuilder.append("身份信息:");
        stringBuilder.append(getLong(data,28));
        stringBuilder.append("\n");

            stringBuilder.append("机构编号:");
        stringBuilder.append(getLong(data,32));
        stringBuilder.append("\n");

               stringBuilder.append("保留字段:");
        stringBuilder.append(getLong(data,36));
        stringBuilder.append("\n");
        */
        /*byte[]*/ let buffer;
        stringBuilder.append("用户公钥:");
        let userPubkey = buffer=new Uint8Array(25) // [25];
        arraycopy(data,40,buffer,0,buffer.length);
        stringBuilder.append( ByteStringOf(buffer).hex());
        stringBuilder.append("\n");
        qr.userPubkey=buffer;

        stringBuilder.append("卡类型:");
        buffer= new Uint8Array(8)// [8];
        arraycopy(data,65,buffer,0,buffer.length);
        stringBuilder.append(qr.cardType = ByteStringOf(buffer).utf8());
        stringBuilder.append("\n");

        stringBuilder.append("卡号:");
        buffer=new Uint8Array(data[73]) // [data[73]];
        arraycopy(data,74,buffer,0,buffer.length);
        stringBuilder.append(qr.cardNo = ByteStringOf(buffer).utf8());
        stringBuilder.append("\n");


        stringBuilder.append("卡数据:");
        let index = data[73]+74;
        buffer= new Uint8Array(data[index]) // [data[index]];
        arraycopy(data,index+1,buffer,0,buffer.length);
        stringBuilder.append(qr.cardData = ByteStringOf(buffer).hex());
        stringBuilder.append("\n");
        index+=buffer.length

   

        let body1len = data[3];
        let sig1len =   data[3 + 1 + body1len] ;
        let body2len =  data[3 + 1 + body1len + 1 + sig1len];
        let sig2len =   data[3 + 1 + body1len + 1 + sig1len + 1 + body2len];
        let msg1 =  new Uint8Array(body1len);
        let sign1 =  new Uint8Array(sig1len);
        let msg = new Uint8Array(data.length - sig2len - 1);
        let sign = new Uint8Array(sig2len);
        let time = new Uint8Array(4);

        arraycopy(data, 3+1, msg1, 0, msg1.length);//(3 + 1 + 62
        arraycopy(data, 3+1 +  body1len+1, sign1, 0, sign1.length);//67

        arraycopy(data, 0, msg, 0, msg.length);
        arraycopy(data, data.length - sign.length, sign, 0, sign.length);
        arraycopy(data, data.length - sign.length - 1 - 4, time, 0, time.length);
        let pub2 = new Uint8Array(alg2 == ALG_SECP192K1 ? 25 : 33);
        arraycopy(msg, 40, pub2, 0, pub2.length);
        let  t = getLong(time, 0) * 1000;
        stringBuilder.append("生码时间:");
        stringBuilder.append(dateFormat('',new Date(t)));
        stringBuilder.append("\n");
        stringBuilder.append("sigData:");
        stringBuilder.append(msg = ByteStringOf(msg).hex());
        stringBuilder.append("\n");
        stringBuilder.append("sigValue:");
        stringBuilder.append(sign = ByteStringOf(sign).hex());
        stringBuilder.append("\n");
    

      

           
        let Q = ecurve.Point.decodeFrom(SECP192K1,new Buffer(ByteStringOf(userPubkey).hex(),'hex' )); 
        let sig = new KJUR.crypto.Signature({ alg: 'SHA1withECDSA' })
        // console.log('Q', Q.getEncoded(false))
        sig.initVerifyByPublicKey({ ecpubhex: Q.getEncoded(false).toString('hex'), eccurvename: 'secp192k1' })
        sig.updateHex(msg)
        let verify = sig.verify(sign)
        console.log('secp192k1 verify',verify)       
        stringBuilder.append("用户私钥签名验证:"+verify);
        stringBuilder.append("\n");

        let msg1Hex =  ByteStringOf(msg1).hex()
        let sign1Hex =  ByteStringOf(sign1).hex()
        try{
        if(type==0) {//通卡二维码
          if(qr.alg==ALG_SECP256K1) {
             let Q = ecurve.Point.decodeFrom(SECP256K1,new Buffer(yzprdkey,'hex' )); 
             let sig = new KJUR.crypto.Signature({ alg: 'SHA1withECDSA' })
             sig.initVerifyByPublicKey({ ecpubhex: Q.getEncoded(false).toString('hex'), eccurvename: 'secp256k1' })
             sig.updateHex((msg1Hex))
             let verify = sig.verify((sign1Hex))
             if(verify){
             console.log('secp256k1 verify',verify)   
             stringBuilder.append("生产环境密钥机构签名验证:"+verify);
             stringBuilder.append("\n");
             }else {
             let Q = ecurve.Point.decodeFrom(SECP256K1,new Buffer(yztestkey,'hex' )); 
             let sig = new KJUR.crypto.Signature({ alg: 'SHA1withECDSA' })
             sig.initVerifyByPublicKey({ ecpubhex: Q.getEncoded(false).toString('hex'), eccurvename: 'secp256k1' })
             sig.updateHex((msg1Hex))
             let verify = sig.verify((sign1Hex))
             console.log('secp256k1 verify',verify)   
             verify && stringBuilder.append("测试环境密钥")
             stringBuilder.append("机构签名验证:"+verify);
             stringBuilder.append("\n");
             }
          }else { //sm2
             let lenR = sign1[3];             
             let  r = sign1.slice(4, 4 + lenR);
             let  s = sign1.slice(6 + lenR);
             r = BigInteger.fromDERInteger(r).toBuffer(32);
             s = BigInteger.fromDERInteger(s).toBuffer(32);
             sign1Hex = Buffer.concat([r, s], r.length + s.length).toString('hex');
             let  verify  = SM2Utils.Sm2verify(null,(msg1Hex),(sign1Hex),prdsm2key[qr.keyIndex]);
             if(!verify) {
                verify = SM2Utils.Sm2verify(null,(msg1Hex),(sign1Hex),testsm2key[qr.keyIndex]);
                verify && stringBuilder.append("测试环境密钥")
             }else {
                stringBuilder.append("生产环境密钥")
             }
             console.log('sm2 verify',msg1Hex,sign1Hex,verify)   
             stringBuilder.append("机构签名验证:"+verify);
             stringBuilder.append("\n");
          }
        }else {//支付宝二维码

        }
        }catch(e){
          console.warn(e)
        }


        qr.out = stringBuilder.toString();
        console.log(TAG,qr.out,qr );  
        return qr;
    }

function getShort(b, index) {
        let a = 0;
        a |= 0x00ff&b[index+0];
        a<<=8;
        a |= 0x00ff&b[index + 1] ;
        return a;
    }

function getLong(b, index) {
        let a = 0;
        a |= 0x00ff&b[index+0];
        a<<=8;
        a |= 0x00ff&b[index + 1] ;
        a<<=8;
        a |= 0x00ff&b[index + 2] ;
        a<<=8;
        a |= 0x00ff&b[index + 3] ;
        return a;
    }

/*
 class QR {

        public String out;
        public let version;
        public byte alg;
        public short len;
        public String cardData;
        public String cardNo;
        public String cardType;
        public  userPubkey;
        public let moneyLimit;
        public let timeout;

        public let expTimestamp;
        public String userId;
        public byte data1Len;
        public byte keyIndex;
        public  cert = [] // [117];
        public String ccCode;
        public String cpCode;
        public byte accountType;
        public let timestamp;
        public pubKey;
        public  msgsha1;
        public  msgsha2;
        public  sign1;
        public  sign2;
        public let  ret1=false;
        public let  ret2=false;
        public  userPrvkey;
        public String errMsg;
        public let  ret0;
    }
*/

/*

export const refreshQR = async () => {
    this.state.timerId && clearTimeout(this.state.timerId)
    let haveQrcode = false
    if (this.state.qrcodeExpire && this.state.qrcodeContent) {
      let date = new Date(this.state.qrcodeExpire * 1000)
      let now = Date.now()
      if (date <= now) {
        haveQrcode = false
        console.log('haveQrcode: date > now '+date + " "+ now)
      } else {
        haveQrcode = true
      }
    }else {
      console.log('state:'+ JSON.stringify(this.state))
    }
    console.log('haveQrcode:'+haveQrcode)
    let qrcodeContent = this.state.qrcodeContent
    if (!haveQrcode) {
      qrcodeContent = await this.fetchQR().qrcodeContent
    }
    qrcodeContent = this.parseArrayBufferToHex(
      Taro.base64ToArrayBuffer(qrcodeContent)
    )

    console.log('qrcodeContent : ' + qrcodeContent)
    let privateKey = this.state.privateKey
    let publicKey = this.state.publicKey

    let now = parseInt(Date.now() / 1000).toString(16)
    console.log('now = ' + now)
    let msg = qrcodeContent + now
    let msgStr = hexCharCodeToStr(msg)
    let sigValueHex = sm2.doSignature(this.hexToArray(msg), privateKey, {
      hash: true,
      publicKey: publicKey
    }) // 签名
    console.log(sigValueHex)
    let verifyResult = sm2.doVerifySignature(
      this.hexToArray(msg),
      sigValueHex,
      publicKey,
      {
        hash: true
      }
    ) // 验签结果
    console.log(verifyResult)
    let hashData = sm3(msgStr) // 杂凑
    console.log('msg:' + msg)
    console.log('hashData:' + hashData)
    var size = 200
    msg = msg + '15' + sigValueHex
    let qrimg = createQrCodeImg(hexCharCodeToStr(msg), { size: parseInt(size) })
    console.log(msg)
    this.setState({ qrimg: qrimg })*/
    /*      drawQrcode({
           width: 200,
           height: 200,
           canvasId: 'myQrcode',
           text: 'https://github.com/yingye'
         }); */
/*
    let that = this
    let id =   setTimeout(() => {
           that.refreshQR()
         }, 60000)
         this.setState({ timerId: id })    
  }

  */