import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("Test3dScene")
export class Test3dScene extends ModuleScene {


  constructor() {
    super();

    let x = 0;
    let y = 0;
    // let t1 = this.addTriangle([
    //   x, y, -1,
    //   x + 640, y, -1,
    //   x, y + 640, -1
    // ]);
    // t1.color = 0xff5555;
    // t1.transform.x = 0;
    // t1.transform.y = 0;

    // let cb = ecs.Entity.create().addComponent(leaf.Cube);
    // cb.size = 4;
    // cb.entity.parent = this.scene;
    // cb.transform.setRotate(90, 0, 1, 0);
    // cb.color = 0xffffff;
    // cb.resource = "house_png";

    let platform = ecs.Entity.create().addComponent(leaf.Platform);
    platform.width = 1.5;
    platform.height = 1.5 * 1052 / 678;
    platform.entity.parent = this.scene;
    // platform.resource = "house_png";
    platform.texture = leaf.PointTexture.getTexture(0xff0000);//

    let kb = platform.addComponent(leaf.KeyBoard);
    kb.onPressRight.on(() => {
      leaf.Normal3DTask.pointPosition[0] += 0.1;
      console.error(leaf.Normal3DTask.pointPosition);
    });
    kb.onPressLeft.on(() => {
      leaf.Normal3DTask.pointPosition[0] -= 0.1;
      console.error(leaf.Normal3DTask.pointPosition);
    });
    kb.onPressUp.on(() => {
      leaf.Normal3DTask.pointPosition[1] += 0.1;
      console.error(leaf.Normal3DTask.pointPosition);
    });
    kb.onPressDown.on(() => {
      leaf.Normal3DTask.pointPosition[1] -= 0.1;
      console.error(leaf.Normal3DTask.pointPosition);
    });
    kb.onPressZ.on(() => {
      leaf.Normal3DTask.pointPosition[2] += 0.1;
      console.error(leaf.Normal3DTask.pointPosition);
    });
    kb.onPressX.on(() => {
      leaf.Normal3DTask.pointPosition[2] -= 0.1;
      console.error(leaf.Normal3DTask.pointPosition);
    });
    // platform.color = 0xffffff;

    leaf.Normal3DTask.diffuseColor = [0.0, 0.0, 0.0];
    leaf.Normal3DTask.diffuseDirection = [1, 1, -1];
    leaf.Normal3DTask.ambientColor = [0.1, 0.1, 0.1];
    leaf.Normal3DTask.pointColor = [1.5, 1.5, 0.5];
    leaf.Normal3DTask.pointPosition = [0, 0, 0.5];
    leaf.Normal3DTask.spotDirection = [0, -1, -1];
    leaf.Normal3DTask.spotRot = 30 * Math.PI / 180;

    leaf.Normal3DTask.camera.identity();
    leaf.Normal3DTask.camera.translate(0, 0, -4);

    platform.addComponent(SpotRotate);

    x = 0;
    y = 0;
  }

  addTriangle(pos: number[]) {
    let t = ecs.Entity.create().addComponent(leaf.Triangle);
    t.point1.x = pos[0];
    t.point1.y = pos[1];
    t.point1.z = pos[2];

    t.point2.x = pos[3];
    t.point2.y = pos[4];
    t.point2.z = pos[5];

    t.point3.x = pos[6];
    t.point3.y = pos[7];
    t.point3.z = pos[8];


    t.parent = this.scene;

    return t;
  }

}

class SpotRotate extends ecs.Component {

  add = 0.001;

  update() {
    leaf.Normal3DTask.spotDirection[0] += this.add;
    if (leaf.Normal3DTask.spotDirection[0] > 0.1) this.add = -this.add;
    if (leaf.Normal3DTask.spotDirection[0] < -0.1) this.add = -this.add;
  }

}

class Rotate extends ecs.Component {

  update() {
    this.transform.angleX += 0.1;
    this.transform.angleY += 0.1;
    this.transform.angleZ += 0.1;
  }

}

window["ca"] = (a: number[], b: number[]) => {
  if (a.length != b.length) {
    console.error("length not equals !")
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (~~(a[i] * 1000) != ~~(b[i] * 1000)) {
      console.error(i, a[i], b[i])
      return false;
    }
  }
  return true;
}