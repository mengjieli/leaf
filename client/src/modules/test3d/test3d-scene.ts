import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("Test3dScene")
export class Test3dScene extends ModuleScene {


  constructor() {
    super();

    let x = 0;
    let y = 0;
    let tail = ecs.Entity.create().addComponent(Tail, this.scene);
    tail.parent = this.scene;
    tail.normal = ecs.Vector3.create(0, 0, 1);
    tail.width = 0.01;
    tail.lifeTime = 1000;
    let time = 300;
    let call = () => {
      tail.addComponent(tween.Tween, tail.transform, time, { x: 0.8 }).onComplete = () => {
        // time = Math.max(time - 100, 300);
        tail.addComponent(tween.Tween, tail.transform, time, { x: 0, y: 0.8 }).onComplete = () => {
          // time = Math.max(time - 100, 300);
          // tail.addComponent(tween.Tween, tail.transform, time, { x: -0.8, y: 0 }).onComplete = call;
          // time = Math.max(time - 100, 300);
        }
      };
    }
    call();
    // tail.addComponent(CircleMove2D, 1, 0.003);

    this.scene.addComponent(SpotRotate);
    let kb = this.scene.addComponent(leaf.KeyBoard);
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

    x = 0;
    y = 0;
  }

}

class CircleMove2D extends ecs.Component {

  radius: number;
  speed: number;
  time: number;

  init(radius: number = 1, speed: number = 1) {
    this.radius = radius;
    this.speed = speed;
    this.time = 0;
  }

  update(dt: number) {
    this.time += dt;
    this.transform.x = Math.cos(this.time * this.speed) * this.radius;
    this.transform.y = Math.sin(this.time * this.speed) * this.radius;
  }

}

class Tail extends ecs.Component {

  points: leaf.Vertex3[] = [];
  lifeTime: number;
  tail: leaf.Triangles;
  normal: ecs.Vector3;
  width: number;
  color: number;

  init() {
    this.points.length = 0;
    this.lifeTime = 1000;
    this.width = 0.1;
    this.color = 0xffffff;
    this.tail = ecs.Entity.create().addComponent(leaf.Triangles);
  }

  update(dt: number) {
    if (this.tail.parent != this.entity.parent) {
      this.tail.parent = this.entity.parent;
    }
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      p.alpha = Math.max(p.alpha - dt / this.lifeTime, 0);
      if (p.alpha <= 0 && (i === 1 || i === 0 && this.points.length === 1)) {
        this.points.shift();
        i--;
      }
    }
    for (let i = 1; i < this.points.length - 1; i++) {
      let lp = this.points[i - 1];
      let p = this.points[i];
      let np = this.points[i + 1];
      let p1 = p.clone().add(p.clone().reduce(lp).dot(p.normal).normalize().scale(this.width / 2));
      let p2 = p.clone().add(p.clone().reduce(lp).dot(p.normal).normalize().scale(-this.width / 2));
      let p3 = np.clone().add(np.clone().reduce(p).dot(np.normal).normalize().scale(this.width / 2));
      let p4 = np.clone().add(np.clone().reduce(p).dot(np.normal).normalize().scale(-this.width / 2));
      this.tail.setTriangle(p1, p2, p3, i * 2 + 0);
      this.tail.setTriangle(p2, p4, p3, i * 2 + 1);
    }
    this.tail.length = (this.points.length - 1) * 2;
    if (this.points.length) {
      let p = this.points[this.points.length - 1];
      if (p.x === this.transform.x && p.y === this.transform.y && p.z === this.transform.z) return;
    }
    let center = leaf.Vertex3.create(this.transform.x, this.transform.y, this.transform.z, 1, this.color);
    center.normal.set(this.normal.x, this.normal.y, this.normal.z);
    this.points.push(center);
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