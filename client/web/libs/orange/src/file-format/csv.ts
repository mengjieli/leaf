namespace orange {

  export class CSV {

    data: any[][];

    toString(arraySplit = ','): string {
      let list: any[][] = this.data;
      let str = '';
      for (let l = 0; l < list.length; l++) {
        let row = list[l];
        for (let r = 0; r < row.length; r++) {
          let item = row[r]
          if (item != null) {
            switch (typeof item) {
              case 'string':
                item.indexOf('"') != -1 && (item = '"' + item + '"');
                str += item;
                break;
              case 'number':
                str += item;
                break;
              default:
                if (item instanceof Array) {
                  str += '"[';
                  for (let i = 0; i < item.length; i++) {
                    str += item[i] + (i == item.length - 1 ? '' : arraySplit);
                  }
                  str += ']"';
                } else {
                  str += item.toString();
                }
            }
          }
          str += (r == row.length - 1 ? '' : ',');
        }
        str += (l == list.length - 1 ? '' : '\n');
      }
      return str;
    }

    static parse(content: string): CSV {
      let list = [];
      content = StringUtil.replace(content, '\r', '\n');
      content = StringUtil.replace(content, '\n\n', '\n');
      let arr = content.split('\n');
      for (let str of arr) {
        let row = [];
        let findBegin = false;
        let begin = 0;
        let specialBegin = false;
        for (let i = 0; i < str.length; i++) {
          if (!findBegin) {
            begin = i;
            if (str.charAt(i) == '"') {
              specialBegin = true;
              begin++;
            }
            findBegin = true;
          }
          if (!specialBegin) {
            if (str.charAt(i) == ',' || i == str.length - 1) {
              let item = str.slice(begin, i + (str.charAt(i) == ',' ? 0 : 1));
              item = StringUtil.replace(item, '""', '"', true);
              row.push(item);
              specialBegin = false;
              findBegin = false;
            }
          } else {
            if (str.charAt(i) == '"') {
              if (str.charAt(i + 1) == '"') {
                i++;
              } else if (str.charAt(i + 1) == ',' || i == str.length - 1) {
                let item = str.slice(begin, i);
                item = StringUtil.replace(item, '""', '"', true);
                row.push(item);
                specialBegin = false;
                findBegin = false;
                i++;
              }
            }
          }
        }
        list.push(row);
      }
      let csv = new CSV();
      csv.data = list;
      return csv;
    }


  }
}