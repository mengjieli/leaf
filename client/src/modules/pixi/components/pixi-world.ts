// orange.autoloadLink("PixiScene");

// export class PixiWorld extends ecs.Component {

//     backgrounds: Background[][];

//     lights: Light[];

//     width: number = 40;

//     height: number = 60;

//     init() {
//         this.backgrounds = [];
//         for (let y = 0; y < this.height; y++) {
//             this.backgrounds[y] = [];
//             for (let x = 0; x < this.width; x++) {
//                 let bg = ecs.Entity.create().addComponent(Background, x, y);
//                 bg.entity.parent = this.entity;
//                 bg.entity.transform.x = x * 16;
//                 bg.entity.transform.y = y * 16;
//                 this.backgrounds[y][x] = bg;
//             }
//         }

//         this.addComponent(Light, this, 20, 30, 30);
//     }

// }

// export class Background extends ecs.Component {

//     show: leaf.Bitmap;

//     x: number;

//     y: number;

//     init(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//         if (!this.show) {
//             this.show = this.addComponent(leaf.Bitmap);
//             this.show.texture = leaf.PointTexture.getTexture(0xffffff);
//             this.entity.transform.scaleX = this.entity.transform.scaleY = 16;
//         }
//         this.show.tint = 0;
//     }

//     onDestroy() {
//         this.lightColors = [];
//     }

//     private lightColors: Light[] = [];

//     addLight(light: Light) {
//         this.lightColors.push(light);
//         let val = 0;
//         for (let c of this.lightColors) {
//             let dis = Math.sqrt((this.x - c.x) * (this.x - c.x) + (this.y - c.y) * (this.y - c.y));
//             let factor = dis > c.range ? 0 : 1 - dis / c.range;
//             let r = c.color.value * factor;
//             if(r > val) val = r
//         }
//         val = val < 0 ? 0 : val > 1 ? 1 : val;
//         this.show.tint = ((~~(0xff * val)) << 16) + ((~~(0xff * val)) << 8) + (~~(0xff * val));
//     }

//     removeLight(color: Light) {
//         if (this.lightColors.indexOf(color) != -1) {
//             this.lightColors.splice(this.lightColors.indexOf(color), 1);
//             let val = 0;
//             for (let c of this.lightColors) {
//                 let dis = Math.abs(this.x - c.x) + Math.abs(this.y - c.y);
//                 let factor = dis > c.range ? 0 : dis / c.range;
//                 let r = c.color.value * factor;
//                 if(r > val) val = r
//             }
//             val = val < 0 ? 0 : val > 1 ? 1 : val;
//             this.show.tint = ((~~(0xff * val)) << 16) + ((~~(0xff * val)) << 8) + (~~(0xff * val));
//         }
//     }
// }

// export class Light extends ecs.Component {

//     color: LightColor = new LightColor();

//     pixiWorld: PixiWorld;

//     x: number;

//     y: number;

//     range: number;

//     init(pixiWorld: PixiWorld, x: number, y: number, range: number = 10, value: number = 1) {
//         this.pixiWorld = pixiWorld;
//         this.x = x;
//         this.y = y;
//         this.range = range;
//         this.color.value = 1;
//         for (let y = -range; y <= range; y++) {
//             for (let x = -range; x <= range; x++) {
//                 let px = x + this.x;
//                 let py = y + this.y;
//                 if (px >= 0 && px < this.pixiWorld.width &&
//                     py >= 0 && py < this.pixiWorld.height) {
//                     this.pixiWorld.backgrounds[py][px].addLight(this);
//                 }
//             }
//         }
//     }

//     onDestroy() {
//         this.color.onChange.removeAll();
//     }

// }

// export class LightColor {

//     private _value: number;

//     get value() {
//         return this._value;
//     }

//     set value(val: number) {
//         if (this._value === val) return;
//         this._value = val;
//         this.onChange.dispatch(val);
//     }

//     onChange = new ecs.Broadcast<number>();
// }