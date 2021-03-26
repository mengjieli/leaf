namespace orange {

  export class URLUtil {

    constructor(url: string) {
      if (url.indexOf('?') == -1) {
        this.baseURL = url;
      } else {
        this.baseURL = url.slice(0, url.indexOf('?'));
        let str = url.slice(url.indexOf('?') + 1, url.length);
        let list = str.split('&');
        for (let i = 0; i < list.length; i++) {
          let k = list[i].slice(0, list[i].indexOf('='));
          let v = list[i].slice(list[i].indexOf('=') + 1, list[i].length);
          this.params[k] = v;
        }
      }
    }

    baseURL: string;

    params = {};

    get url(): string {
      let res = this.baseURL;
      if (this.params) {
        res += '?';
        for (let k in this.params) {
          res += k + '=' + this.params[k] + '&';
        }
      }
      if (res[res.length - 1] == '&') res = res.slice(0, res.length - 1);
      return res;
    }

    static join(...paths: string[]): string {
      let res = "";
      paths.forEach(url => {
        if (res.length) {
          if (res.charAt(res.length - 1) != "/") res += "/";
          if (url.charAt(0) == "." && url.charAt(1) == "/") url = url.slice(2, url.length);
          if (url.charAt(0) == "/") url = url.slice(1, url.length);
          res += url;
        } else {
          res = url;
        }
      })
      return res;
    }
  }
}