namespace orange {

  export class StringUtil {

    /**
     * 采用 utf8 编码把字符串转成字节数组
     * @param str 
     */
    static encodeUTF8(str: string): number[] {
      var res = [];
      var num;
      for (var i = 0; i < str.length; i++) {
        num = str.charCodeAt(i);
        if (num < 128) {
          res.push(num);
        }
        else if (num < 2048) {
          res.push(Math.floor(num / 64) + 128 + 64);
          res.push((num % 64) + 128);
        }
        else if (num < 65536) {
          res.push(Math.floor(num / 4096) + 128 + 64 + 32);
          res.push(Math.floor((num % 4096) / 64) + 128);
          res.push((num % 64) + 128);
        }
        else {
          res.push(Math.floor(num / 262144) + 128 + 64 + 32 + 16);
          res.push(Math.floor((num % 262144) / 4096) + 128);
          res.push(Math.floor((num % 4096) / 64) + 128);
          res.push((num % 64) + 128);
        }
      }
      return res;
    }

    /**
     * 把 utf8 编码的字节数组还原成字符串
     * @param arr 
     */
    static decodeUTF8(arr: number[]): string {
      if (!(arr instanceof Array)) {
        let list = [];
        for (let i = 0, len = arr["length"]; i < len; i++) {
          list[i] = arr[i];
        }
        arr = list;
      }
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] < 0) arr[i] += 256;
      }
      var res = [];
      for (i = 0; i < arr.length; i++) {
        if (arr[i] == 0) break;
        if ((arr[i] & 128) == 0) res.push(arr[i]);				//1位
        else if ((arr[i] & 64) == 0) res.push(arr[i] % 128);		//1位
        else if ((arr[i] & 32) == 0)	//2位
        {
          res.push((arr[i] % 32) * 64 + (arr[i + 1] % 64));
          i++;
        }
        else if ((arr[i] & 16) == 0)	//3位
        {
          res.push((arr[i] % 16) * 64 * 64 + (arr[i + 1] % 64) * 64 + (arr[i + 2] % 64));
          i++;
          i++;
        }
        else if ((arr[i] & 8) == 0)	//4位
        {
          res.push((arr[i] % 8) * 64 * 64 * 64 + (arr[i + 1] % 64) * 64 * 64 + (arr[i + 2] % 64) * 64 + (arr[i + 2] % 64));
          i++;
          i++;
          i++;
        }
      }
      var str = "";
      for (i = 0; i < res.length; i++) {
        str += String.fromCharCode(res[i]);
      }
      return str;
    }



    //替换某些字符串为指定的字符串
    static replace(str: string, findStr: string, tstr: string, jumpFind = false) {
      for (var i = 0; i < str.length; i++) {
        if (StringUtil.hasStringAt(str, [findStr], i)) {
          str = str.slice(0, i) + tstr + str.slice(i + findStr.length, str.length);
          if (!jumpFind) i -= tstr.length - findStr.length;
        }
      }
      return str;
    }

    //某个位置是否含有指定字符串之一
    static hasStringAt(str, hstrs, pos) {
      for (var i = 0; i < hstrs.length; i++) {
        var hstr = hstrs[i];
        if (str.length - pos >= hstr.length && str.slice(pos, pos + hstr.length) == hstr) {
          return true;
        }
      }
      return false;
    }

    /**
     * 打印表格
     * @param table 表格
     * @param gap 每个字段间隔多少个空格，默认空 4 个
     */
    static tableToString(table: string[][], gap = 4): string {
      var str = '';
      var lens = [];
      for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
          table[y][x] = '' + table[y][x];
          if (!lens[x]) lens[x] = StringUtil.getLength(table[y][x]);
          else StringUtil.getLength(table[y][x]) > lens[x] && (lens[x] = StringUtil.getLength(table[y][x]));
        }
      }
      for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
          str += table[y][x];
          for (let i = 0; i < gap + lens[x] - StringUtil.getLength(table[y][x]); i++) str += ' ';
        }
        y < table.length - 1 && (str += '\n');
      }
      return str;
    }

    /**
     * 获取字符串的长度，小于 255 的长度为 1，其它为 2
     * @param str 
     */
    static getLength(str:string):number {
      var len = 0;
      for(let i = 0; i < str.length; i++) {
        if(str.charCodeAt(i) < 256) len++;
        else len += 2;
      }
      return len;
    }
  }
}