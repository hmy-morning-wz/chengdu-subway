let emojisReg = '';
let emojisBaseSrc = '';
const emojis = {};
import aliDiscode from './aliDiscode.js';
import HTMLParser from './htmlparser.js';
// Block Elements - HTML 5
const block = makeMap('br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');

// Inline Elements - HTML 5
const inline = makeMap('abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');

// Elements that you can, intentionally, leave open
// (and which close themselves)
const closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

function makeMap(str) {
  const obj = {};
  const items = str.split(',');
  for (let i = 0; i < items.length; i += 1) { obj[items[i]] = true; }
  return obj;
}


function removeDOCTYPE(html) {
  return html
    .replace(/<\?xml.*\?>\n/, '')
    .replace(/<.*!doctype.*\>\n/, '')
    .replace(/<.*!DOCTYPE.*\>\n/, '');
}

function trimHtml(html) {
  return html
    .replace(/\r?\n+/g, '')
    .replace(/<!--.*?-->/ig, '')
    .replace(/\/\*.*?\*\//ig, '')
    .replace(/[ ]+</ig, '<');
}


function html2json(html, bindName) {
  html = removeDOCTYPE(html);
  html = trimHtml(html);
  html = aliDiscode.strDiscode(html);
  const bufArray = [];
  const results = {
    node: bindName,
    nodes: [],
    images: [],
    imageUrls: [],
  };
  let index = 0;
  HTMLParser(html, {
    start(tag, attrs, unary) {
      // debug(tag, attrs, unary);
      // node for this element
      const node = {
        node: 'element',
        tag,
      };

      if (bufArray.length === 0) {
        node.index = index.toString();
        index += 1;
      } else {
        const parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        node.index = parent.index + '.' + parent.nodes.length;
      }

      if (block[tag]) {
        node.tagType = 'block';
      } else if (inline[tag]) {
        node.tagType = 'inline';
      } else if (closeSelf[tag]) {
        node.tagType = 'closeSelf';
      }

      if (attrs.length !== 0) {
        node.attr = attrs.reduce((pre, attr) => {
          const { name } = attr;
          let { value } = attr;
          if (name === 'class') {
            console.dir(value);
            //  value = value.join("")
            node.classStr = value;
          }
          // has multi attibutes
          // make it array of attribute
          if (name === 'style') {
            console.dir(value);
            //  value = value.join("")
            node.styleStr = value;
          }
          if (value.match(/ /)) {
            value = value.split(' ');
          }


          // if attr already exists
          // merge it
          if (pre[name]) {
            if (Array.isArray(pre[name])) {
              // already array, push to last
              pre[name].push(value);
            } else {
              // single value, make it array
              pre[name] = [pre[name], value];
            }
          } else {
            // not exist, put it
            pre[name] = value;
          }

          return pre;
        }, {});
      }

      // å¯¹imgæ·»å é¢å¤æ°æ®
      if (node.tag === 'img') {
        node.imgIndex = results.images.length;
        let imgUrl = node.attr.src;
        if (imgUrl[0] === '') {
          imgUrl.splice(0, 1);
        }
        const placeImgeUrlHttps = 'https';
        imgUrl = aliDiscode.urlToHttpUrl(imgUrl, placeImgeUrlHttps);
        node.attr.src = imgUrl;
        node.from = bindName;
        results.images.push(node);
        results.imageUrls.push(imgUrl);
      }

      // å¤çfontæ ç­¾æ ·å¼å±æ§
      if (node.tag === 'font') {
        const fontSize = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', '-webkit-xxx-large'];
        const styleAttrs = {
          color: 'color',
          face: 'font-family',
          size: 'font-size',
        };
        if (!node.attr.style) node.attr.style = [];
        if (!node.styleStr) node.styleStr = '';
        for (const key in styleAttrs) {
          if (node.attr[key]) {
            const value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
            node.attr.style.push(styleAttrs[key]);
            node.attr.style.push(value);
            node.styleStr += styleAttrs[key] + ': ' + value + ';';
          }
        }
      }

      // ä¸´æ¶è®°å½sourceèµæº
      if (node.tag === 'source') {
        results.source = node.attr.src;
      }

      if (unary) {
        // if this tag dosen't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        const parent = bufArray[0] || results;
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end(tag) {
      // debug(tag);
      // merge into parent tag
      const node = bufArray.shift();
      if (node.tag !== tag) console.error('invalid state: mismatch end tag');

      // å½æç¼å­sourceèµæºæ¶äºäºvideoè¡¥ä¸srcèµæº
      if (node.tag === 'video' && results.source) {
        node.attr.src = results.source;
        delete results.source;
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        const parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    },
    chars(text) {
      // debug(text);
      const node = {
        node: 'text',
        text,
        textArray: transEmojiStr(text),
      };

      if (bufArray.length === 0) {
        node.index = index.toString();
        index += 1;
        results.nodes.push(node);
      } else {
        const parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        node.index = parent.index + '.' + parent.nodes.length;
        parent.nodes.push(node);
      }
    },
  });
  return results;
}

function transEmojiStr(str) {
  const emojiObjs = [];
  // å¦ææ­£åè¡¨è¾¾å¼ä¸ºç©º
  if (emojisReg.length === 0 || !emojis) {
    const emojiObj = {};
    emojiObj.node = 'text';
    emojiObj.text = str;
    array = [emojiObj];
    return array;
  }
  // è¿ä¸ªå°æ¹éè¦è°æ´
  str = str.replace(/\[([^\[\]]+)\]/g, ':$1:');
  const eReg = new RegExp('[:]');
  let array = str.split(eReg);
  for (let i = 0; i < array.length; i += 1) {
    const ele = array[i];
    const emojiObj = {};
    if (emojis[ele]) {
      emojiObj.node = 'element';
      emojiObj.tag = 'emoji';
      emojiObj.text = emojis[ele];
      emojiObj.baseSrc = emojisBaseSrc;
    } else {
      emojiObj.node = 'text';
      emojiObj.text = ele;
    }
    emojiObjs.push(emojiObj);
  }

  return emojiObjs;
}

function emojisInit(reg = '', baseSrc = '/aliParse/emojis/', emojis) {
  emojisReg = reg;
  emojisBaseSrc = baseSrc;
  emojis = emojis;
}

module.exports = {
  html2json,
  emojisInit,
};
