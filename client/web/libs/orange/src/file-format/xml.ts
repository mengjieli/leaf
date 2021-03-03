namespace orange {

  export class XML {

    name: string;

    value: string = "";

    attributes: XMLAttribute[] = [];

    namespaces: XMLNamespace[] = [];

    elements: XML[] = [];

    /**
     * 过滤 xml ，返回符合条件的 xml 数组
     * 某个 xml 只要满足 filterName 或者 filterAttribute 中的任何一个即通过筛选
     * @param filterName 过滤 xml 名称
     * @param filterAttribute 过滤 xml 属性
     */
    filter(filterName?: (elementName: string) => boolean, filterAttribute?: (attribute: XMLAttribute) => boolean): XML[] {
      let list = [];
      this.filterInChildren(list, filterName, filterAttribute);
      return list;
    }

    /**
     * 过滤 xml ，返回符合条件的第一个 xml 
     * 某个 xml 只要满足 filterName 或者 filterAttribute 中的任何一个即通过筛选
     * @param filterName 过滤 xml 名称
     * @param filterAttribute 过滤 xml 属性
     */
    filterOne(filterName?: (elementName: string) => boolean, filterAttribute?: (attribute: XMLAttribute) => boolean): XML[] {
      let list = [];
      this.filterInChildren(list, filterName, filterAttribute, true);
      return list.length ? list[0] : null;
    }

    /**
     * @internal
     * @param list 
     * @param filterName 
     * @param filterAttribute 
     */
    private filterInChildren(list: XML[], filterName?: (elementName: string) => boolean, filterAttribute?: (attribute: XMLAttribute) => boolean, one: boolean = false) {
      if (filterName && filterName(this.name)) {
        list.push(this);
      } else if (filterAttribute) {
        for (let attribute of this.attributes) {
          if (filterAttribute(attribute)) {
            list.push(this);
            if (one) return;
            break;
          }
        }
      }
      for (let element of this.elements) {
        element.filterInChildren(list, filterName, filterAttribute, one);
      }
    }

    /**
     * @internal
     * @param content 
     */
    private parse(content) {
      var delStart = -1;
      for (var i = 0; i < content.length; i++) {
        if (delStart == -1 && (content.slice(i, i + 2) == "<!" || content.slice(i, i + 2) == "<?")) {
          delStart = i;
        }
        if (delStart != -1 && content.charAt(i) == ">") {
          content = content.slice(0, delStart) + content.slice(i + 1, content.length);
          i = i - (i - delStart + 1);
          delStart = -1;
        }
      }
      this.readInfo(content);
    }

    /**
     * @internal
     * @param str 
     */
    private __isStringEmpty(str) {
      for (var i = 0, len = str.length; i < len; i++) {
        var char = str.charAt(i);
        if (char != " " && char != "\t" && char != "\r" && char != "\n" && char != "　") {
          return false;
        }
      }
      return true;
    }

    /**
     * @internal
     * @param content 
     * @param startIndex 
     */
    readInfo(content, startIndex = 0) {
      var leftSign = -1;
      var len = content.length;
      var c;
      var j;
      for (var i = startIndex; i < len; i++) {
        c = content.charAt(i);
        if (c == "<") {
          for (j = i + 1; j < len; j++) {
            c = content.charAt(j);
            if (c != " " && c != "\t") {
              i = j;
              break;
            }
          }
          for (j = i + 1; j < len; j++) {
            c = content.charAt(j);
            if (c == " " || c == "\t" || c == "\r" || c == "\n" || c == "/" || c == ">") {
              this.name = content.slice(i, j);
              i = j;
              break;
            }
          }
          break;
        }
      }
      var end = false;
      var attribute;
      var nameSpace;
      for (; i < len; i++) {
        c = content.charAt(i);
        if (c == "/") {
          end = true;
        }
        else if (c == ">") {
          i++;
          break;
        }
        else if (c == " " || c == "\t" || c == "\r" || c == "\n" || c == "　") {
        }
        else {
          for (j = i + 1; j < len; j++) {
            c = content.charAt(j);
            if (c == "=" || c == " " || c == "\t") {
              var atrName = content.slice(i, j);
              if (atrName.split(":").length == 2) {
                nameSpace = new XMLNamespace();
                this.namespaces.push(nameSpace);
                nameSpace.name = atrName.split(":")[1];
              }
              else {
                attribute = new XMLAttribute();
                this.attributes.push(attribute);
                attribute.name = atrName;
              }
              break;
            }
          }
          j++;
          var startSign;
          for (; j < len; j++) {
            c = content.charAt(j);
            if (c == "\"" || c == "'") {
              i = j + 1;
              startSign = c;
              break;
            }
          }
          j++;
          for (; j < len; j++) {
            c = content.charAt(j);
            if (c == startSign && content.charAt(j - 1) != "\\") {
              if (attribute) {
                attribute.value = content.slice(i, j);
                attribute = null;
              }
              else {
                nameSpace.value = content.slice(i, j);
                nameSpace = null;
              }
              i = j;
              break;
            }
          }
        }
      }
      if (end == true)
        return i;
      var contentStart;
      for (; i < len; i++) {
        c = content.charAt(i);
        if (c != " " && c != "\t") {
          contentStart = i;
          i--;
          break;
        }
      }
      for (; i < len; i++) {
        c = content.charAt(i);
        if (c == "<") {
          for (j = i + 1; j < len; j++) {
            c = content.charAt(j);
            if (c != " " && c != "\t") {
              break;
            }
          }
          if (c == "/") {
            for (j = i + 1; j < len; j++) {
              c = content.charAt(j);
              if (c == " " || c == "\t" || c == ">") {
                var endName = content.slice(i + 2, j);
                if (endName != this.name) {
                  console.log('错误的 xml 格式', this.name, endName);
                  // $error(1020, this.name, endName);
                }
                break;
              }
            }
            if (this.elements.length == 0) {
              i--;
              for (; i >= 0; i--) {
                c = content.charAt(i);
                if (c != " " && c != "\t") {
                  break;
                }
              }
              this.value = content.slice(contentStart, i + 1);
              if (this.value == "" || this.__isStringEmpty(this.value)) {
                this.value = null;
              }
            }
            for (; j < len; j++) {
              c = content.charAt(j);
              if (c == ">") {
                i = j + 1;
                break;
              }
            }
            end = true;
            break;
          }
          else { //视图找 <abcsklsklskl />a
            var isNextElement = true;
            for (var n = i + 1; n < len; n++) {
              c = content.charAt(n);
              if (c != " " && c != "\t") {
                break;
              }
            }
            for (; n < len; n++) {
              c = content.charCodeAt(n);
              if (c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58) {
                continue;
              } else {
                break;
              }
            }
            for (; n < len; n++) {
              c = content.charAt(n);
              if (c != " " && c != "\t") {
                break;
              }
            }
            var c = content.charCodeAt(n);
            if (c == 47 || c == 62 || c >= 97 && c <= 122 || c >= 65 && c <= 90) {

            } else {
              isNextElement = false;
            }
            if (isNextElement) {
              var element = new XML();
              this.elements.push(element);
              i = element.readInfo(content, i) - 1;
            }
          }
        }
      }
      return i;
    }

    toString() {
      let str = `<${this.name}`;
      this.attributes.forEach(attribute => {
        str += ` ${attribute.name}=${attribute.value}`;
      });
      if (this.elements.length || this.value != "") {
        str += `>`
        if (this.value) str += this.value;
        this.elements.forEach(xml => {
          str += xml.toString();
        });
        str += `</${this.name}>`
      } else {
        str += '/>'
      }
      return str;
    }

    static parse(content): XML {
      var xml = new XML();
      xml.parse(content);
      return xml;
    }
  }
}









