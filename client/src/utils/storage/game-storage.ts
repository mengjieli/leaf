/**
 * @internal
 */
var iswx = false;
/**
 * @internal
 */
var wx = window["wx"];
try {
    if (window["wx"] && window["wx"].getFileSystemManager && window["wx"].getFileSystemManager()["stat"]) {
        iswx = true;
    }
} catch (e) {
    iswx = false;
}

if (iswx) {
    window["ofs"] = (function () {
        var fs = wx.getFileSystemManager();

        var exist = (path) => {
            return new Promise((resolve, reject) => {
                fs.access({
                    path: getWXPath(path),
                    success: () => resolve(true),
                    fail: () => resolve(false)
                })
            })
        }

        var getWXPath = function (path) {
            return path == '' ? wx.env.USER_DATA_PATH : wx.env.USER_DATA_PATH + '/' + path;
        }

        this.exist = (path) => {
            return new Promise((resolve, reject) => {
                var paths = path.split('/');
                var str = "";
                var i = -1;
                var f = () => {
                    i++;
                    if (i < paths.length) {
                        str += paths[i] + (i < paths.length - 1 ? "/" : "");
                        if (str.length > 1) {
                            exist(str).then(exist => {
                                if (!exist) {
                                    resolve(false);
                                } else {
                                    f();
                                }
                            }).catch(e => {
                                reject(e)
                            })
                        } else {
                            f();
                        }
                    } else {
                        resolve(true);
                    }
                }
                f();
            })
        }

        var mkdir = (path) => {
            return new Promise((resolve, reject) => {
                fs.mkdir({
                    dirPath: getWXPath(path),
                    success: () => resolve(),
                    fail: () => reject('创建目录出错:' + path)
                })
            })
        }

        this.mkdir = (path) => {
            return new Promise((resolve, reject) => {
                var paths = path.split('/');
                var str = "";
                var i = -1;
                var f = () => {
                    i++;
                    if (i < paths.length) {
                        str += paths[i] + (i < paths.length - 1 ? "/" : "");
                        if (str.length > 1) {
                            this.exist(str).then(exist => {
                                if (!exist) {
                                    mkdir(str).then(() => {
                                        f();
                                    }).catch(e => {
                                        reject(e)
                                    })
                                } else {
                                    f();
                                }
                            }).catch(e => {
                                reject(e)
                            })
                        } else {
                            f();
                        }
                    } else {
                        resolve();
                    }
                }
                f();
            })
        }

        this.writeFile = (path, data, encoding) => {
            encoding = encoding || 'utf8';
            return new Promise((resolve, reject) => {
                var dir = path.slice(0, path.length - path.split('/')[path.split('/').length - 1].length - 1);
                this.mkdir(dir).then(() => {
                    fs.writeFile({
                        filePath: getWXPath(path),
                        data: data,
                        encoding: encoding,
                        success: () => resolve(),
                        fail: () => reject
                    })
                }).catch(e => {
                    reject(e);
                })
            })
        }

        this.readFile = (path, encoding) => {
            return new Promise((resolve, reject) => {
                encoding = encoding || 'utf8';
                this.exist(path).then(exist => {
                    if (!exist) reject('文件不存在:' + path);
                    else {
                        fs.readFile({
                            filePath: getWXPath(path),
                            encoding: encoding,
                            success: data => resolve(data.data),
                            fail: e => reject(e)
                        })
                    }
                }).catch(e => reject(e))
            })
        }

        this.removeFile = (path) => {
            return new Promise((resolve, reject) => {
                this.exist(path).then(exist => {
                    if (!exist) resolve();
                    else {
                        fs.unlink({
                            filePath: getWXPath(path),
                            success: () => resolve(),
                            fail: e => reject(e)
                        })
                    }
                }).catch(e => reject(e))
            })
        }

        this.join = (dir1, dir2) => {
            if (dir1.charAt(dir1.length - 1) == '/') dir1 = dir1.slice(0, dir1.length - 1);
            if (dir2.charAt(0) == '/') dir2 = dir2.slice(1, dir2.length);
            return dir1 + '/' + dir2;
        }

        var readDir = (path) => {
            return new Promise((resolve, reject) => {
                this.exist(path).then(exist => {
                    if (!exist) resolve([]);
                    else {
                        fs.readdir({
                            dirPath: getWXPath(path),
                            success: (res) => {
                                var files = res.files;
                                var list = [];
                                files.forEach(name => list.push(this.join(path, name)));
                                resolve(list);
                            },
                            fail: e => reject(e)
                        })
                    }
                }).catch(e => reject(e))
            });
        }

        var isFile = (path) => {
            return new Promise((resolve, reject) => {
                fs.stat({
                    path: getWXPath(path),
                    success: res => resolve(res.stats.isFile()),
                    fail: e => reject(e)
                })
            });
        }


        this.isFile = (path) => {
            return new Promise((resolve, reject) => {
                this.exist(path).then(exist => {
                    if (!exist) reject('目录(文件)不存在:' + path);
                    else {
                        fs.stat({
                            path: getWXPath(path),
                            success: res => resolve(res.stats.isFile()),
                            fail: e => reject(e)
                        })
                    }
                }).catch(e => reject(e))
            });
        }

        this.readDir = (path) => {
            return new Promise((resolve, reject) => {
                var all = [];
                var f = (dir) => {
                    return new Promise((dresolve, dreject) => {
                        readDir(dir).then(list => {
                            if (list["length"] == 0) dresolve();
                            else {
                                var n = 0;
                                list["forEach"](url => {
                                    n++;
                                    isFile(url).then(
                                        flag => {
                                            if (flag) { //是文件
                                                all.push(url);
                                                n--;
                                                if (n === 0) dresolve();
                                            } else {
                                                f(url).then(() => {
                                                    n--;
                                                    if (n === 0) dresolve();
                                                }).catch(e => dreject(e));
                                            }
                                        }
                                    ).catch(e => dreject(e));
                                })
                            }
                        }).catch(e => dreject(e))
                    })
                }
                f(path).then(() => resolve(all)).catch(e => reject);
            });
        }

        var removeDir = (path) => {
            return new Promise((resolve, reject) => {
                fs.rmdir({
                    dirPath: getWXPath(path),
                    success: () => resolve(),
                    fail: e => reject(e)
                })
            });
        }

        this.removeDir = (path) => {
            return new Promise((resolve, reject) => {
                var all = [];
                var f = (dir) => {
                    return new Promise((dresolve, dreject) => {
                        readDir(dir).then(list => {
                            if (list["length"] == 0) dresolve();
                            else {
                                var n = 0;
                                list["forEach"](url => {
                                    n++;
                                    this.isFile(url).then(
                                        flag => {
                                            if (flag) { //是文件
                                                this.removeFile(url).then(() => {
                                                    n--;
                                                    if (n === 0) {
                                                        removeDir(dir).then(() => dresolve()).then(e => dreject());
                                                    }
                                                }).catch(e => dreject(e));
                                            } else {
                                                f(url).then(() => {
                                                    n--;
                                                    if (n === 0) {
                                                        removeDir(dir).then(() => dresolve()).then(e => dreject());
                                                    }
                                                }).catch(e => dreject(e));
                                            }
                                        }
                                    ).catch(e => dreject(e));
                                })
                            }
                        }).catch(e => dreject(e))
                    })
                }
                f(path).then(() => resolve(all)).catch(e => reject);
            });
        }

        var out: any = {};
        var list = [];
        var isCall = false;
        var _t = this;
        var callNext = () => {
            if (isCall) return;
            else if (list.length) {
                isCall = true;
                var item = list.shift();
                item.call.apply(_t, item.args).then(function () {
                    isCall = false;
                    item.resolve.apply(null, arguments);
                    callNext();
                }).then(e => {
                    isCall = false;
                    item.reject.apply(null, e);
                    callNext();
                }).catch(e => {
                    isCall = false;
                    item.reject(e);
                    callNext();
                });
            }
        }
        var decorate = (f) => {
            return function () {
                var args = arguments;
                return new Promise((resolve, reject) => {
                    list.push({
                        call: f,
                        args: args,
                        resolve: resolve,
                        reject: reject
                    });
                    callNext();
                });
            }
        };//wx.env.USER_DATA_PATH + '/'
        out.exist = decorate(this.exist);
        out.mkdir = decorate(this.mkdir);
        out.writeFile = decorate(this.writeFile);
        out.readFile = decorate(this.readFile);
        out.removeFile = decorate(this.removeFile);
        out.isFile = decorate(this.isFile);
        out.readDir = decorate(this.readDir);
        out.removeDir = decorate(this.removeDir);
        out.join = this.join;
        out.setStorages = (type, list) => {
            return new Promise((resolve, reject) => {
                if (list.length == 0) {
                    resolve();
                } else {
                    var n = list.length;
                    list.forEach(item => {
                        console.warn('存储:' + wx.env.USER_DATA_PATH + '/ofs/storage/' + type + '/' + item.key + '.txt');
                        out.writeFile('ofs/storage/' + type + '/' + item.key + '.txt', JSON.stringify(item.value)).then(r => {
                            n--;
                            console.warn('存储成功');
                            if (n == 0) resolve();
                        }).catch(e => {
                            reject(e);
                            console.warn('失败', e);
                        });
                    })
                }
            })
        }
        out.setStorage = (type, val) => {
            return out.setStorages(type, [{ key: type, value: val }]);
        }
        out.getStorages = (type) => {
            return new Promise((resolve, reject) => {
                out.readDir('ofs/storage/' + type).then(list => {
                    if (list.length == 0) {
                        resolve([]);
                    } else {
                        var all = [];
                        var n = list.length;
                        list.forEach(url => {
                            var name = url.split('/')[url.split('/').length - 1];
                            name = name.split('.')[0];
                            out.readFile(url).then(data => {
                                all.push({ 'key': name, 'value': JSON.parse(data) });
                                n--;
                                if (n == 0) resolve(all);
                            }).catch(e => resolve([])); //reject(e)
                        })
                    }
                }).catch(e => resolve([])); //reject(e)
            })
        }
        out.getStorage = (type) => {
            return new Promise((resolve, reject) => {
                out.readDir('ofs/storage/' + type).then(list => {
                    if (list.length == 0) {
                        resolve(null);
                    } else {
                        var all = [];
                        var n = list.length;
                        list.forEach(url => {
                            var name = url.split('/')[url.split('/').length - 1];
                            name = name.split('.')[0];
                            out.readFile(url).then(data => {
                                all.push({ 'key': name, 'value': JSON.parse(data) });
                                n--;
                                if (n == 0) resolve(all.length ? all[0].value : null);
                            }).catch(e => resolve(null)); //reject(e)
                        })
                    }
                }).catch(e => resolve(null)); //reject(e)
            })
        }
        out.removeStorage = (type) => {
            return new Promise((resolve, reject) => {
                out.removeDir('ofs/storage/' + type).then(() => resolve()).catch(e => reject(e));
            });
        }
        return out;

    }).call(() => { })
} else {
    var f: any = {};
    window["ofs"] = f;
    f.setStorages = function (type: string, list: { key: string, value: any }[]) {
        return new Promise<void>(resolve => {
            try {
                window.localStorage.setItem(type, JSON.stringify(list));
            } catch (e) {
            }
            resolve();
        })
    }
    f.setStorage = (type, val) => {
        return f.setStorages(type, [{ key: type, value: val }]);
    }
    f.getStorages = function (type: string) {
        return new Promise<{ key: string, value: any }[]>(resolve => {
            var items = [];
            try {
                items = JSON.parse(window.localStorage.getItem(type));
            } catch (e) {
                items = [];
            }
            resolve(items);
        })
    }
    f.getStorage = function (type: string) {
        return new Promise<{ key: string, value: any }[]>(resolve => {
            var items = [];
            try {
                items = JSON.parse(window.localStorage.getItem(type));
            } catch (e) {
                items = [];
            }
            resolve(items && items.length ? items[0].value : null);
        })
    }
    f.removeStorage = function (type: string) {
        return new Promise(resolve => {
            window.localStorage.removeItem(type);
            resolve();
        })
    }
}


export class File {
    public static removeFile: (path: string) => Promise<void> = window["ofs"].removeFile || (() => new Promise(resolve => resolve()));
}

export class GameStorage {
    public static setStorages: (key: string, value: { key: string, value: any }[]) => Promise<void> = window["ofs"].setStorage;
    public static getStorages: (key: string) => Promise<{ key: string, value: any }[]> = window["ofs"].getStorage;
    public static setStorage: (key: string, value: any) => Promise<void> = window["ofs"].setStorage;
    public static getStorage: (key: string) => Promise<any> = window["ofs"].getStorage;
    public static removeStorage: (key: string) => Promise<void> = window["ofs"].removeStorage;
}


window["GameStorage"] = GameStorage;