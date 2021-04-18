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

    let cb = ecs.Entity.create().addComponent(leaf.Cube);
    // cb.transform.x = 1;
    // cb.transform.x = 0;
    cb.size = 4;
    // cb.transform.x = 320;
    // cb.transform.y = 500;
    // cb.transform.z = -500;
    cb.entity.parent = this.scene;
    cb.transform.setRotate(90, 0, 1, 0);
    // cb.transform.translate(0.1, 0, 0);
    // cb.transform.rotate(-10, 0, 1, 0);
    // cb.transform.rotate(-10, 1, 0, 0);
    // cb.transform.rotate(45, 0, 0, 1);
    // cb.transform.scale(1.1, 1, 1);
    // cb.addComponent(Rotate);
    // cb.transform.angleX = 45;
    // cb.transform.angleY = 45;
    // cb.transform.angleZ = 55;
    cb.color = 0xffffff;

    leaf.Normal3DTask.diffuseColor = [0.0, 0.0, 0.0];
    leaf.Normal3DTask.diffuseDirection = [0, 0, -1];
    leaf.Normal3DTask.ambientColor = [0.2, 0.2, 0.2];
    leaf.Normal3DTask.pointColor = [1.0, 1.0, 1.0];
    leaf.Normal3DTask.pointPosition = [2.3, 4.0, 3.5];


  // // Set the light color (white)
  // gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
  // // Set the light direction (in the world coordinate)
  // gl.uniform3f(u_LightPosition, 2.3, 4.0, 3.5);
  // // Set the ambient light
  // gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2);

    x = 0;
    y = 0;
    // let t2 = this.addTriangle([
    //   x, y, -0.9,
    //   x + 200, y, -1.1,
    //   x, y + 200, -1
    // ]);
    // t2.color = 0x5555ff;

    // console.error(t1.entity.id)
    // console.error("scene 3d");
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

class Rotate extends ecs.Component {

  update() {
    this.transform.angleX += 0.1;
    this.transform.angleY += 0.1;
    this.transform.angleZ += 0.1;
  }

}