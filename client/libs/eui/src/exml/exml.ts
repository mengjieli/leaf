namespace eui {


    export class EXML extends ecs.Component {

        [index: string]: any;

        skinParts: string[] = [];

        tweens: TweenGroup[] = [];

        private ids: any = {};

        init(exml: any) {
            EXMLParser.getEXML(this, exml);
            let ids = this.ids;
            for (let k in ids) {
                this.skinParts.push(k);
                this[k] = ids[k];
                if (this[k] instanceof TweenGroup) {
                    this.tweens.push(this[k]);
                }
            }
        }

        update(dt: number) {
            for (let tween of this.tweens) {
                if (tween.isPlaying) {
                    tween.update(dt);
                }
            }
        }

        playTweenGroup(tween: TweenGroup, loop = 0, completeCall?: Function, completeCallTarget?: any) {
            if (tween.frame == 1) {
                tween.update(0);
            } else {
                tween.isPlaying = true;
                tween.loop = loop || 100000000;
                tween.completeCall = completeCall;
                tween.completeCallTarget = completeCallTarget;
                tween.time = 0;
                tween.frame = 0;
                tween.update(0);
            }
        }

        stopTweenGroup(tween: TweenGroup) {
            tween.isPlaying = false;
        }

        onDestroy() {
            for (let k of this.skinParts) {
                if (this[k] && this[k] instanceof TweenGroup) {
                    this[k].updateCall = null;
                }
                delete this[k];
            }
            this.tweens.length = 0;
            this.skinParts.length = 0;
            this.ids = {};
        }
    }

}

window["eui"] = eui;