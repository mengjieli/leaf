// import { TweenGroupConfig, TweenItemConfig } from "./tween-config";
// import { TweenGroup } from "./tween-group";

// var childrenProperties = new Map<any, any>();

// export class DecodeEXMLPool {

//     static tweenItems: {}[] = [];

// }

// export function getEXML(ui: Container, cfg: any, fps = 60) {
//     ui = ui || new Container();
//     ui["ids"] = {};
//     let properties;
//     if (!childrenProperties.has(cfg)) {
//         childrenProperties.set(cfg, {});
//         properties = childrenProperties.get(cfg);
//         decodeProperties(ui, cfg.root.properties);
//         decodeChildren(ui, ui, cfg.root.children, properties);
//         decodeTween(ui, cfg.tweens, properties, fps);
//     } else {
//         decodeProperties(ui, cfg.root.properties);
//         decodeChildren(ui, ui, cfg.root.children);
//         decodeTween(ui, cfg.tweens, null, fps);
//     }
//     return ui;
// }

// var name_scale9Grid = "scale9Grid";
// var name_source = "source";

// function setBitmapTexture(bitmapNode: egret.sys.BitmapNode, texture: egret.Texture) {
//     bitmapNode.image = texture.$bitmapData;
//     bitmapNode.imageWidth = texture.$sourceWidth;
//     bitmapNode.imageHeight = texture.$sourceHeight;
//     var textureW: number = Math.round(texture.$getScaleBitmapWidth());
//     var textureH: number = Math.round(texture.$getScaleBitmapHeight());
//     var offsetX = texture.$offsetX;
//     var offsetY = texture.$offsetY;
//     var bitmapX = texture.$bitmapX;
//     var bitmapY = texture.$bitmapY;
//     var bitmapWidth = texture.$bitmapWidth;
//     var bitmapHeight = texture.$bitmapHeight;
//     bitmapNode.drawImage(bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureW, textureH);
// }

// async function decodeProperties(ui: Container, properties: any) {
//     for (let k in properties) {
//         // if (properties.id == "image_icon") {
//         //     console.error(k, properties[k]);
//         // }
//         if (k == name_scale9Grid) {
//             let arr = properties[k].split(",");
//             ui[k] = new egret.Rectangle(+arr[0], +arr[1], +arr[2], +arr[3]);
//         } else if (k == name_source) {
//             let texture = RES.getRes(properties[k]);
//             if (texture) {
//                 setBitmapTexture(ui as any, texture);
//                 // (ui as any).texture = texture;
//             } else {
//                 RES.getResAsync(properties[k], (function () {
//                     // this.ui.texture = RES.getRes(this.url);
//                     setBitmapTexture(this.ui as any, RES.getRes(this.url));
//                 }).bind({
//                     ui: ui,
//                     url: properties[k],
//                 }), null);
//             }
//         } else if (k == "blendMode") {
//             if (properties[k] == egret.BlendMode.ADD) {
//                 ui[k] = BlendMode.ADD;
//             } else {
//                 ui[k] = BlendMode.NORMAL;
//             }
//         } else {
//             ui[k] = properties[k];
//         }
//     }
// }

// // function decodeChildren(root: any, ui: egret.DisplayObjectContainer, children: any[],
// //     properties?: any) {
// //     children.forEach(child => {
// //         let display = decodeDisplay(root, child, properties);
// //         ui.addChild(display);
// //         if (child.properties.id) {
// //             root[child.properties.id] = display;
// //         }
// //     });
// // }

// function decodeChildren(root: any, ui: Container, children: any[],
//     properties?: any) {
//     const add = ui["blendMode"] === BlendMode.ADD;
//     children.forEach(child => {
//         let display = decodeDisplay(root, child, properties);
//         if (add) {
//             display["blendMode"] = BlendMode.ADD;
//         }
//         ui.addNode(display);
//         if (child.properties.id) {
//             root[child.properties.id] = display;
//             root["ids"][child.properties.id] = display;
//         }
//     });
//     if (add && ui instanceof Container) {
//         ui["blendMode"] = BlendMode.NORMAL;
//     }
// }



// function decodeDisplay(root: any, cfg: any, properties?: any): egret.sys.RenderNode {
//     let display;
//     // if (cfg.type == "eui.Image") {
//     //   display = new TweenImage();
//     // } else {
//     let define;
//     if (cfg.type == "eui.Group") {
//         display = DecodeEXMLPool.groups.length ? DecodeEXMLPool.groups.pop() : new Container();
//     } else if (cfg.type == "eui.Component") {
//         display = DecodeEXMLPool.components.length ? DecodeEXMLPool.components.pop() : new Container();
//     } else if (cfg.type == "eui.Image") {
//         display = DecodeEXMLPool.images.length ? DecodeEXMLPool.images.pop() : new BitmapNode();
//     } else {
//         define = orange.GetUtil.getFromGlobal(cfg.type);
//         display = new define();
//         // egret.error("???? what");
//     }
//     // }
//     if (properties && cfg.properties.id) {
//         properties[cfg.properties.id] = cfg.properties;
//     }
//     decodeProperties(display, cfg.properties);
//     decodeChildren(root, display, cfg.children, properties);
//     return display;
// }

// var tweenConfigs = new Map<any, TweenGroupConfig[]>();

// function decodeTween(ui: any, cfg: any, childrenProperties: any, fps = 60) {
//     if (!tweenConfigs.has(cfg)) {
//         let list = [];
//         cfg.forEach(tweenGroupCfg => {
//             let group = TweenGroupConfig.create();
//             list.push(group);
//             let time = 0;
//             let length = 0;
//             tweenGroupCfg.items.forEach(itemCfg => {
//                 let item = decodeTweenItem(itemCfg, childrenProperties, fps);
//                 group.items.push(item);
//                 length = item.frames.length > length ? item.frames.length : length;
//                 time = item.time > time ? item.time : time;
//             });
//             group.items.forEach(item => {
//                 while (item.frames.length && item.frames.length < length) {
//                     item.frames.push(item.frames[item.frames.length - 1]);
//                 }
//             });
//             group.frameLength = length;
//             group.time = time;
//             group.id = tweenGroupCfg.id;
//             ui[group.id] = group;
//         });
//         tweenConfigs.set(cfg, list);
//     }
//     let groups = [];
//     tweenConfigs.get(cfg).forEach(tweenGroupCfg => {
//         let tweenGroup = DecodeEXMLPool.tweenGroups.length ? DecodeEXMLPool.tweenGroups.pop() : TweenGroup.create();
//         groups.push(tweenGroup);
//         tweenGroup.display = ui;
//         tweenGroup.groups = groups;
//         tweenGroup.tween = tweenGroupCfg;
//         tweenGroup.fps = fps;
//         ui[tweenGroupCfg.id] = tweenGroup;
//         ui["ids"][tweenGroupCfg.id] = tweenGroup;
//     });
// }

// var names = ['x', 'y', 'width', 'height', 'scaleX', 'scaleY', 'rotation', 'alpha'];
// var inits = {
//     'x': 0,
//     'y': 0,
//     'scaleX': 1,
//     'scaleY': 1,
//     'alpha': 1,
//     'rotation': 0
// };
// var name_width = 'width';
// var name_height = 'height';
// var reduce1 = ['x', 'y', 'rotation'];
// var reduce2 = ['scaleX', 'scaleY', 'alpha'];

// function decodeTweenItem(cfg: any, childrenProperties: any, fps = 60): TweenItemConfig {
//     let item = TweenItemConfig.create();
//     item.targetId = cfg.target;
//     childrenProperties = childrenProperties[item.targetId];
//     let properties = {};
//     let time = 0;
//     cfg.items.forEach(itemCfg => {
//         if (itemCfg.duration) {
//             time = itemCfg.time + itemCfg.duration;
//         } else {
//             time = itemCfg.time;
//         }
//         for (let k in itemCfg) {
//             if (names.indexOf(k) != -1) {
//                 properties[k] = true;
//             }
//         }
//     });
//     let initProperties = {};
//     for (let k in properties) {
//         if (childrenProperties[k] != null) {
//             initProperties[k] = childrenProperties[k];
//         } else {
//             if (k == name_width) {
//                 // egret.error('error peorperty "width"')
//             } else if (k == name_height) {
//                 // egret.error('error peorperty "height"')
//             } else {
//                 initProperties[k] = inits[k];
//             }
//         }
//     }
//     let frameGap = 1000 / fps;
//     let frameLength = Math.ceil(time / frameGap) + 1;
//     for (let f = 0; f < frameLength; f++) {
//         let t = f * frameGap;
//         let currentProperties = {};
//         for (let k in initProperties) {
//             currentProperties[k] = initProperties[k];
//         }
//         for (let ind = 0; ind < cfg.items.length; ind++) {
//             let itemCfg = cfg.items[ind];
//             if (itemCfg.time <= t) {
//                 if (itemCfg.duration != null) { //tween to
//                     if (itemCfg.time + itemCfg.duration <= t) {
//                         for (let k in properties) {
//                             if (itemCfg[k] != null) {
//                                 currentProperties[k] = itemCfg[k];
//                             }
//                         }
//                     } else {
//                         for (let k in properties) {
//                             if (itemCfg[k] != null) {
//                                 currentProperties[k] = currentProperties[k] + (itemCfg[k] - currentProperties[k]) * eases[itemCfg.ease || easeName]((t - itemCfg.time) / itemCfg.duration);
//                             }
//                         }
//                     }
//                 } else { //tween set
//                     for (let k in properties) {
//                         if (itemCfg[k] != null) {
//                             currentProperties[k] = itemCfg[k];
//                         }
//                     }
//                 }
//             } else {
//                 break;
//             }
//         }
//         let frame = currentProperties;
//         item.time = time;
//         item.frames.push(frame);
//     }
//     return item;
// }

// class EaseFunction {
//     static None(t) {
//         return t;
//     }

//     static SineEaseIn(t) {
//         return Math.sin((t - 1) * Math.PI * .5) + 1;
//     }

//     static SineEaseOut(t) {
//         return Math.sin(t * Math.PI * .5);
//     }

//     static SineEaseInOut(t) {
//         return Math.sin((t - .5) * Math.PI) * .5 + .5;
//     }

//     static SineEaseOutIn(t) {
//         if (t < 0.5) {
//             return Math.sin(t * Math.PI) * .5;
//         }
//         return Math.sin((t - 1) * Math.PI) * .5 + 1;
//     }

//     static QuadEaseIn(t) {
//         return t * t;
//     }

//     static QuadEaseOut(t) {
//         return -(t - 1) * (t - 1) + 1;
//     }

//     static QuadEaseInOut(t) {
//         if (t < .5) {
//             return t * t * 2;
//         }
//         return -(t - 1) * (t - 1) * 2 + 1;
//     }

//     static QuadEaseOutIn(t) {
//         var s = (t - .5) * (t - .5) * 2;
//         if (t < .5) {
//             return .5 - s;
//         }
//         return .5 + s;
//     }

//     static CubicEaseIn(t) {
//         return t * t * t;
//     }

//     static CubicEaseOut(t) {
//         return (t - 1) * (t - 1) * (t - 1) + 1;
//     }

//     static CubicEaseInOut(t) {
//         if (t < .5) {
//             return t * t * t * 4;
//         }
//         return (t - 1) * (t - 1) * (t - 1) * 4 + 1;
//     }

//     static CubicEaseOutIn(t) {
//         return (t - .5) * (t - .5) * (t - .5) * 4 + .5;
//     }

//     static QuartEaseIn(t) {
//         return t * t * t * t;
//     }

//     static QuartEaseOut(t) {
//         var a = (t - 1);
//         return -a * a * a * a + 1;
//     }

//     static QuartEaseInOut(t) {
//         if (t < .5) {
//             return t * t * t * t * 8;
//         }
//         var a = (t - 1);
//         return -a * a * a * a * 8 + 1;
//     }

//     static QuartEaseOutIn(t) {
//         var s = (t - .5) * (t - .5) * (t - .5) * (t - .5) * 8;
//         if (t < .5) {
//             return .5 - s;
//         }
//         return .5 + s;
//     }

//     static QuintEaseIn(t) {
//         return t * t * t * t * t;
//     }

//     static QuintEaseOut(t) {
//         var a = t - 1;
//         return a * a * a * a * a + 1;
//     }

//     static QuintEaseInOut(t) {
//         if (t < .5) {
//             return t * t * t * t * t * 16;
//         }
//         var a = t - 1;
//         return a * a * a * a * a * 16 + 1;
//     }

//     static QuintEaseOutIn(t) {
//         var a = t - .5;
//         return a * a * a * a * a * 16 + 0.5;
//     }

//     static ExpoEaseIn(t) {
//         return Math.pow(2, 10 * (t - 1));
//     }

//     static ExpoEaseOut(t) {
//         return -Math.pow(2, -10 * t) + 1;
//     }

//     static ExpoEaseInOut(t) {
//         if (t < .5) {
//             return Math.pow(2, 10 * (t * 2 - 1)) * .5;
//         }
//         return -Math.pow(2, -10 * (t - .5) * 2) * .5 + 1.00048828125;
//     }

//     static ExpoEaseOutIn(t) {
//         if (t < .5) {
//             return -Math.pow(2, -20 * t) * .5 + .5;
//         }
//         return Math.pow(2, 10 * ((t - .5) * 2 - 1)) * .5 + .5;
//     }

//     static CircEaseIn(t) {
//         return 1 - Math.sqrt(1 - t * t);
//     }

//     static CircEaseOut(t) {
//         return Math.sqrt(1 - (1 - t) * (1 - t));
//     }

//     static CircEaseInOut(t) {
//         if (t < .5) {
//             return .5 - Math.sqrt(.25 - t * t);
//         }
//         return Math.sqrt(.25 - (1 - t) * (1 - t)) + .5;
//     }

//     static CircEaseOutIn(t) {
//         var s = Math.sqrt(.25 - (.5 - t) * (.5 - t));
//         if (t < .5) {
//             return s;
//         }
//         return 1 - s;
//     }

//     static BackEaseIn(t) {
//         return 2.70158 * t * t * t - 1.70158 * t * t;
//     }

//     static BackEaseOut(t) {
//         var a = t - 1;
//         return 2.70158 * a * a * a + 1.70158 * a * a + 1;
//     }

//     static BackEaseInOut(t) {
//         var a = t - 1;
//         if (t < .5) {
//             return 10.80632 * t * t * t - 3.40316 * t * t;
//         }
//         return 10.80632 * a * a * a + 3.40316 * a * a + 1;
//     }

//     static BackEaseOutIn(t) {
//         var a = t - .5;
//         if (t < .5) {
//             return 10.80632 * a * a * a + 3.40316 * a * a + .5;
//         }
//         return 10.80632 * a * a * a - 3.40316 * a * a + .5;
//     }

//     static ElasticEaseIn(t) {
//         if (t == 0 || t == 1)
//             return t;
//         return -(Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.075) * 2 * Math.PI / .3));
//     }

//     static ElasticEaseOut(t) {
//         if (t == 0 || t == .5 || t == 1)
//             return t;
//         return (Math.pow(2, 10 * -t) * Math.sin((-t - .075) * 2 * Math.PI / .3)) + 1;
//     }

//     static ElasticEaseInOut(t) {
//         if (t == 0 || t == .5 || t == 1)
//             return t;
//         if (t < .5) {
//             return -(Math.pow(2, 10 * t - 10) * Math.sin((t * 2 - 2.15) * Math.PI / .3));
//         }
//         return (Math.pow(2, 10 - 20 * t) * Math.sin((-4 * t + 1.85) * Math.PI / .3)) * .5 + 1;
//     }

//     static ElasticEaseOutIn(t) {
//         if (t == 0 || t == .5 || t == 1)
//             return t;
//         if (t < .5) {
//             return (Math.pow(2, -20 * t) * Math.sin((-t * 4 - .15) * Math.PI / .3)) * .5 + .5;
//         }
//         return -(Math.pow(2, 20 * (t - 1)) * Math.sin((t * 4 - 4.15) * Math.PI / .3)) * .5 + .5;
//     }

//     private static bounceEaseIn(t) {
//         return 1 - EaseFunction.bounceEaseOut(1 - t);
//     }

//     private static bounceEaseOut(t) {
//         var s;
//         var a = 7.5625;
//         var b = 2.75;
//         if (t < (1 / 2.75)) {
//             s = a * t * t;
//         }
//         else if (t < (2 / b)) {
//             s = (a * (t - (1.5 / b)) * (t - (1.5 / b)) + .75);
//         }
//         else if (t < (2.5 / b)) {
//             s = (a * (t - (2.25 / b)) * (t - (2.25 / b)) + .9375);
//         }
//         else {
//             s = (a * (t - (2.625 / b)) * (t - (2.625 / b)) + .984375);
//         }
//         return s;
//     }


//     static BounceEaseInOut(t) {
//         if (t < .5)
//             return EaseFunction.bounceEaseIn(t * 2) * .5;
//         else
//             return EaseFunction.bounceEaseOut(t * 2 - 1) * .5 + .5;
//     }

//     static BounceEaseOutIn(t) {
//         if (t < .5)
//             return EaseFunction.bounceEaseOut(t * 2) * .5;
//         else
//             return EaseFunction.bounceEaseIn(t * 2 - 1) * .5 + .5;
//     }

//     static BounceEaseIn = EaseFunction.bounceEaseIn;
//     static BounceEaseOut = EaseFunction.bounceEaseOut;
// }
// var easeName = 'none';
// var eases = {
//     'none': EaseFunction.None,
//     'quadIn': EaseFunction.QuadEaseIn,
//     'quadOut': EaseFunction.QuadEaseOut,
//     'quadInOut': EaseFunction.QuadEaseInOut,
//     'cubicIn': EaseFunction.CubicEaseIn,
//     'cubicOut': EaseFunction.CubicEaseOut,
//     'cubicInOut': EaseFunction.CubicEaseInOut,
//     'quartIn': EaseFunction.QuartEaseIn,
//     'quartOut': EaseFunction.QuartEaseOut,
//     'quartInOut': EaseFunction.QuartEaseInOut,
//     'quintIn': EaseFunction.QuintEaseIn,
//     'quintOut': EaseFunction.QuintEaseOut,
//     'quintInOut': EaseFunction.QuintEaseInOut,
//     'sineIn': EaseFunction.SineEaseIn,
//     'sineOut': EaseFunction.SineEaseOut,
//     'sineInOut': EaseFunction.SineEaseInOut,
//     'backIn': EaseFunction.BackEaseIn,
//     'backOut': EaseFunction.BackEaseOut,
//     'backInOut': EaseFunction.BackEaseInOut,
//     'circIn': EaseFunction.CircEaseIn,
//     'circOut': EaseFunction.CircEaseOut,
//     'circInOut': EaseFunction.CircEaseInOut,
//     'bounceIn': EaseFunction.BounceEaseIn,
//     'bounceOut': EaseFunction.BounceEaseOut,
//     'bounceInOut': EaseFunction.BounceEaseInOut,
//     'elasticIn': EaseFunction.ElasticEaseIn,
//     'elasticOut': EaseFunction.ElasticEaseOut,
//     'elasticInOut': EaseFunction.ElasticEaseInOut
// }