import './js/libs/weapp-adapter'
import './js/libs/ecs'
import './js/libs/leaf'
import './js/libs/eui'
import './js/libs/tiny2d'
import './js/libs/mobx'
import './js/libs/msgpack'
import './js/libs/orange'
import './js/libs/native'
import './js/libs/sync-data'
import './js/libs/behavior-tree'
import './js/libs/tween'
import './js/libs/symbol'

import './js/main'

window["IS_WEB"] = true;

var fs = window.wxfs = wx.getFileSystemManager();
window.wxloadText = function(url,onComplete) {
  fs.readFile({
    filePath:url,
    encoding:"utf-8",
    success:function(a) {
      onComplete(a.data)
    }
  })
}

new window.Main();
