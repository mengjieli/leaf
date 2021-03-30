namespace leaf {

    export class Loader {

        resources: { [index: string]: LoaderResource } = {};

        private curResource: string;
        private firstName: string;
        private lastName: string;

        private onComplete: (loader: Loader, resources: { [index: string]: LoaderResource }) => any;

        init() {
            this.resources = {};
            this.onComplete = null;
            this.curResource = this.firstName = this.lastName = "";
        }

        add(name: string, url: string, itemType: LoaderItemType) {
            let r: LoaderResource = this.resources[name] = loaderEntity ? loaderEntity.addComponent(LoaderResource) : new LoaderResource();
            r.name = name;
            r.url = url;
            r.itemType = itemType;
            if (!this.firstName) {
                this.firstName = name;
            } else {
                this.resources[this.lastName].next = r.name;
            }
            this.lastName = name;
            return this;
        }

        load(onComplete?: (loader: Loader, resources: { [index: string]: LoaderResource }) => any) {
            if (this.curResource) return;
            this.onComplete = onComplete;
            this.curResource = this.firstName;
            this.loadCurrent();
        }

        private loadCurrent() {
            let r = this.resources[this.curResource];
            r.load();
            r.onComplete.on(this.loadCurrentComplete, this);
        }

        private loadCurrentComplete() {
            let r = this.resources[this.curResource];
            let next = this.resources[r.next];
            if (next) {
                this.curResource = next.name;
                this.loadCurrent();
            } else {
                let c = this.onComplete;
                this.onComplete = null;
                c && c(this, this.resources);
            }
        }
    }

    export class LoaderResource extends RecordComponent {

        name: string;
        url: string;
        itemType: LoaderItemType;
        private _data: any;
        next: string;

        private _xhr: any;

        onComplete: ecs.Broadcast<void> = new ecs.Broadcast<void>();

        isComplete: boolean = false;

        load() {
            if (this.itemType.loadType === LoaderType.TEXT) {
                if (window["wxloadText"] && (this.url.slice(0, "http://".length) != "http://" ||
                    this.url.slice(0, "https://".length) != "https://")) {
                    window["wxloadText"](this.url, (data) => {
                        this._data = data;
                        this.loadComplete();
                    })
                } else {
                    let xhr = this._xhr = this.getXHR();
                    xhr.onreadystatechange = this.onReadyStateChange.bind(this);
                    xhr.onprogress = this.updateProgress.bind(this);
                    xhr.open(this.itemType.method || "GET", this.url, true);
                    xhr.send(this.itemType.sendData);
                }
            } else if (this.itemType.loadType === LoaderType.IMAGE) {
                var img = new Image();
                img.src = this.url;
                img.crossOrigin = '*';
                this._data = img;
                img.onload = this.loadComplete;
            }
        }

        get data() {
            if (this.itemType.loadType === LoaderType.TEXT) {
                if (!this._xhr) {
                    return this._data;
                }
                if (this._xhr.response != undefined) {
                    return this._xhr.response;
                }
                if (!this.itemType.xhrType || this.itemType.xhrType == "text") {
                    return this._xhr.responseText;
                }
                // if (this.itemType.xhrType == "arraybuffer" && /msie 9.0/i.test(navigator.userAgent)) {
                //     var w = window;
                //     return w.convertResponseBodyToText(this._xhr["responseBody"]);
                // }
                if (this.itemType.xhrType == "document") {
                    return this._xhr.responseXML;
                }
            }
            if (this.itemType.loadType === LoaderType.IMAGE) {
                return this._data;
            }
        }

        updateProgress(event) {
            //event.loaded / event.total
        }

        loadComplete = () => {
            this.recordReady(() => {
                this.isComplete = true;
            });
        }

        checkRecord() {
            if (this.isComplete) {
                this.track();
                this.destroy();
                this.onComplete.dispatch();
            }
        }

        onReadyStateChange = function () {
            var xhr = this._xhr;
            if (xhr.readyState == 4) {
                var ioError_1 = (xhr.status >= 400 || xhr.status == 0);
                var url_1 = this._url;
                var self_1 = this;
                window.setTimeout(() => {
                    if (ioError_1) {
                        // if (true && !self_1.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                        //     egret.$error(1011, url_1);
                        // }
                        // self_1.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                    }
                    else {
                        // this.loadComplete();
                        setTimeout(()=>{
                            this.loadComplete();
                        },1000*Math.random());
                    }
                }, 0);
            }
        }

        getXHR() {
            if (window["XMLHttpRequest"]) {
                return new window["XMLHttpRequest"]();
            }
            else {
                return new window["ActiveXObject"]("MSXML2.XMLHTTP");
            }
        }
    }

    export enum LoaderType {
        TEXT = 1,
        IMAGE = 2
    }

    export interface LoaderItemType {
        loadType: LoaderType,
        xhrType?: string,
        method?: string,
        sendData?: any
    }

}