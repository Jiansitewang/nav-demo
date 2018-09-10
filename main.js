


//1、数据初始化
let hashA = init()
let keys = hashA['keys']
let hash = hashA['hash']
console.log(hash)

//2、生成键盘
generateKeyboard(keys,hash)

//3、监听用户动作
listenToUser(hash)





// 工具函数
function init() {
  let keys = {
    '0': {0: '~', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '0', 11: '-', 12: '=', 13: 'delete', length: 14},
    '1': {0: 'tab', 1: 'q', 2: 'w', 3: 'e', 4: 'r', 5: 't', 6: 'y', 7: 'u', 8: 'i', 9: 'o', 10: 'p', 11: '[', 12: ']', 13: '\\', length: 14},
    '2': {0: 'caps lock', 1: 'a', 2: 's', 3: 'd', 4: 'f', 5: 'g', 6: 'h', 7: 'j', 8: 'k', 9: 'l', 10: ';', 11: '\'', 12: 'enter', length: 13},
    '3': {0: 'shift', 1: 'z', 2: 'x', 3: 'c', 4: 'v', 5: 'b', 6: 'n', 7: 'm', 8: ',', 9: '.', 10: '/', 11: 'shift', length: 12},
    'length': 4
  };
  let hash = {
    'q': 'qq.com',
    'w': 'weibo.com',
    'e': 'ele.me',
    'r': 'renren.com',
    'i': 'iqiyi.com',
    'o': 'opera.com',
    's': 'sohu.com',
    'z': 'zhihu.com',
    'm': 'www.mcdonalds.com.cn',
  };
  // 取出localStorage 中 zzz 对应的hash
  let hashInlocalStorage = getFromLocalStorage('zzz')
  if (hashInlocalStorage) {
    hash = hashInlocalStorage
  }
  return{
    'keys':keys,
    'hash':hash
  }
}


function generateKeyboard(keys,hash) {
  //遍历keys，生成标签
  for (let index = 0; index< keys['length'];index = index+1){
    let div = tag('div');
    div.className = 'row'
    main.appendChild(div);

    let row = keys[index]; //抽出第一个数组、第二个数组、第三个数组
    for(let index2 = 0;index2< row['length'];index2 = index2 + 1){
      let spanTag = createSpan(row[index2])
      let buttonTag = createButton(row[index2]);
      let img = createImg(hash[row[index2]])
      let kbdTag = tag('kbd');
      kbdTag.className = 'keyCss';

      kbdTag.appendChild(spanTag)
      kbdTag.appendChild(img)
      kbdTag.appendChild(buttonTag);

      div.appendChild(kbdTag);
    }
  }
}

function listenToUser(hash) {
  document.onkeypress = function (KeyPress) {
    console.log(KeyPress)
    let keyPressed = KeyPress['key'];
    // console.log(KeyPress['key'])
    let webName = hash[keyPressed];
    // console.log(hash[keyPressed])
    window.open('http://' + webName, '_blank')
  }
}

function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name || 'null'))
}

function tag(tagName) {
  return document.createElement(tagName)
}

function createSpan(textContent) {
  let spanTag = tag('span')
  spanTag.textContent = textContent;
  spanTag.className = "text"
  return spanTag
}

function createButton(id) {
  let buttonTag = tag('button')
  buttonTag.textContent = '编辑';
  buttonTag.id = id
  buttonTag.onclick = function (KeyPress) {
    //KeyPress['target']就是用户点击的元素
    let button2 = KeyPress['target']
    let img2 = button2.previousSibling
    let keyClick = button2['id'];
    let editedWebsite = prompt('请输入网址');
     hash[keyClick] = editedWebsite;// hash变更
    img2.src = 'http://' + editedWebsite + '/favicon.ico'
    img2.onerror = function (xxx) {
      xxx.target.src = '//i.loli.net/2018/09/09/5b9513bb345e0.png'
    }
    localStorage.setItem('zzz', JSON.stringify(hash))
  };
  return buttonTag
}

function createImg(domain) {
  let img = tag('img')
  if(domain){
    img.src = 'http://' + domain + '/favicon.ico'
  }else {
    img.src = '//i.loli.net/2018/09/09/5b9513bb345e0.png'
  }
  img.onerror = function (xxx) {
    xxx.target.src = '//i.loli.net/2018/09/09/5b9513bb345e0.png'
  }
  return img
}