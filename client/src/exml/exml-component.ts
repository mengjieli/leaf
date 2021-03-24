
// export class EXMLComponent extends Render {

//     [index: number]: any;

//     skinParts: string[] = [];

//     tweens: TweenGroup[] = [];

//     init(exml: any) {
//         let container = new Container();
//         this.setDisplay(container);
//         getEXML(container, exml);
//         let ids = container["ids"];
//         for (let k in ids) {
//             this.skinParts.push(k);
//             this[k] = ids[k];
//             if (this[k] instanceof TweenGroup) {
//                 this.tweens.push(this[k]);
//             }
//         }
//     }

//     update(dt: number) {
//         for (let tween of this.tweens) {
//             if (tween.isPlaying) {
//                 tween.update(dt);
//             }
//         }
//     }

//     playTweenGroup(tween: TweenGroup, loop = 0, completeCall?: Function, completeCallTarget?: any) {
//         if (tween.frame == 1) {
//             tween.update(0);
//         } else {
//             tween.isPlaying = true;
//             tween.loop = loop || 100000000;
//             tween.completeCall = completeCall;
//             tween.completeCallTarget = completeCallTarget;
//             tween.time = 0;
//             tween.frame = 0;
//             tween.update(0);
//         }
//     }

//     stopTweenGroup(tween: TweenGroup) {
//         tween.isPlaying = false;
//     }

//     onDestroy() {
//         for (let k of this.skinParts) {
//             if (this[k] && this[k] instanceof TweenGroup) {
//                 this[k].updateCall = null;
//             }
//             delete this[k];
//         }
//         this.skinParts.length = 0;
//     }
// }