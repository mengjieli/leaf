import { Platform } from "./platform";

export class VideoAd {

    uid: string;

    isShow: boolean = false;

    loaded: boolean = false;

    rewardedVideoAd: any;

    constructor(uid: string) {
        this.uid = uid;
        this.init();
    }

    onComplete: Function;
    onCancel: Function;

    init() {
        if (Platform.isWeb) return;
        // 创建激励视频广告实例，提前初始化
        let rewardedVideoAd = this.rewardedVideoAd = window["wx"].createRewardedVideoAd({
            adUnitId: this.uid
        })

        rewardedVideoAd.onLoad(() => {
            this.loaded = true;
            console.error("广告加载成功")
            if (this.isShow) {
                rewardedVideoAd.show().then(() => console.log('激励视频 广告显示'))
            }
        })

        rewardedVideoAd.onError(err => {
            console.error("广告加载失败")
            if (this.isShow) {
                share();
            }
            delete VideoAd[this.uid];
        })

        let share = () => {
            VideoAd.videos[this.uid] = null;
            let t = Date.now();
            let call = () => {
                window["wx"].offShow(call);
                this.complete();
            }
            window["wx"].onShow(call);
            window["wx"].shareAppMessage({
                title: '好家伙!原来私房钱藏这了...'
            })
        }

        rewardedVideoAd.onClose((data) => {
            if (data.isEnded) {
                this.complete();
            } else {
                this.isShow = false;
                this.onCancel && this.onCancel();
            }
            console.error("广告看完", data.isEnded)
        })

        rewardedVideoAd.load();

    }

    show(complete: Function, onCancel: Function) {
        if (Platform.isWeb) {
            complete();
            return;
        }
        this.isShow = true;
        this.onComplete = complete;
        this.onCancel = onCancel;
        if (this.loaded) {
            this.rewardedVideoAd.show().then(() => console.log('激励视频 广告显示'))
        }
    }

    complete() {
        this.onComplete && this.onComplete();
        this.isShow = false;
    }

    static videos = {};

    static show(uid: string, onComplete?: Function, onCancel?: Function) {
        this.createVideo(uid);
        this.videos[uid].show(onComplete, onCancel);
    }

    static createVideo(uid: string) {
        if (this.videos[uid]) return;
        this.videos[uid] = new VideoAd(uid);
    }

}