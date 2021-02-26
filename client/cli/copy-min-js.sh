cp ./js/egret.min.js ./../Eliminate_wxgame/js/egret.min.js
cp ./js/eui.min.js ./../Eliminate_wxgame/js/eui.min.js 
cp ./js/game.min.js ./../Eliminate_wxgame/js/game.min.js 
cp ./js/assetsmanager.min.js ./../Eliminate_wxgame/js/assetsmanager.min.js
cp ./js/tween.min.js ./../Eliminate_wxgame/js/tween.min.js
cp ./js/socket.min.js ./../Eliminate_wxgame/js/socket.min.js
uglifyjs ./../Eliminate/libs/lib/lib.js -o ./../Eliminate/libs/lib/lib.min.js
cp ./../Eliminate/libs/mobx/mobx.min.js ./../Eliminate_wxgame/js/mobx.min.js
cp ./../Eliminate/libs/orange/orange.min.js ./../Eliminate_wxgame/js/orange.min.js
cp ./../Eliminate/libs/orange-modules/egret-extend/egret-extend.min.js ./../Eliminate_wxgame/js/egret-extend.min.js
cp ./../Eliminate/libs/msgpack/msgpack.min.js ./../Eliminate_wxgame/js/msgpack.min.js
cp ./../Eliminate/libs/pako/pako.min.js ./../Eliminate_wxgame/js/pako.min.js
cp ./../Eliminate/libs/orange-modules/sync-data/sync-data.min.js ./../Eliminate_wxgame/js/sync-data.min.js
cp ./../Eliminate/libs/lib/lib.min.js ./../Eliminate_wxgame/js/lib.min.js