export class BlockRender extends ecs.Component {

  draw(colors: number[][]) {
    this.entity.removeAll();
    for (let y = 0; y < colors.length; y++) {
      for (let x = 0; x < colors[y].length; x++) {
        let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
        bm.parent = this.entity;
        // bm.texture = leaf.PointTexture.ist.getColor(colors[y][x]);
        bm.resource = "block_png";
        bm.transform.x = x;
        bm.transform.y = y;
        // bm.transform.alpha = 0.5;
      }
    }
  }

}