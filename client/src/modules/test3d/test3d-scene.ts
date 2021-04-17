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
    cb.size = 300;
    cb.transform.x = 320;
    cb.transform.y = 500;
    cb.entity.parent = this.scene;
    // cb.transform.angleX = 45;
    // cb.transform.angleY = 45;
    // cb.transform.angleZ = 45;

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