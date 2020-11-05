// 旅客类型

export const passengertype = [
  { name: '成人', code: '1' },
  { name: '儿童', code: '2' },
  { name: '学生', code: '3' },
  { name: '残军', code: '4' }
];

// 证件类型
export const idType = [
  { name: '中国居民身份证', code: '1' },
  { name: '港澳居民来往内地通行证', code: 'C' },
  { name: '台湾居民来往大陆通行证', code: 'G' },
  { name: '护照', code: 'B' },
  { name: '外国人永久居留身份证', code: 'H' }
];

// 学制
export const schoolSystem = [
  { name: '1', code: '1' },
  { name: '2', code: '2' },
  { name: '3', code: '3' },
  { name: '4', code: '4' },
  { name: '5', code: '5' },
  { name: '6', code: '6' },
  { name: '7', code: '7' },
  { name: '8', code: '8' },
  { name: '9', code: '9' }
];

// 年份
const d = new Date();
const nowYear = d.getFullYear();
let _enterYear = [];
for (let i = 0; i <= 9; i++) {
  const j = nowYear - i;
  _enterYear.push({
    name: j,
    code: j
  });
}

console.log(_enterYear);

export const enterYear = _enterYear;
