namespace leaf {

    /**
     * @internal
     */
    export class RenderSystem extends ecs.EntitySystem {

        update() {
            let gl = GLCore.gl;
            BlendModeFunc.changeBlendMode(leaf.BlendMode.NORMAL);
            //绑定舞台的渲染纹理。
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            //清除舞台，这句如果和 3d 合并之后应该去掉
            gl.clear(gl.COLOR_BUFFER_BIT);
            let tasks: Shader[] = [];
            for (let node = this.query.head; node; node = node.next) {
                let rd = node.value.getComponent(Render as any) as Render;
                let tk: Shader = rd.shader;
                if (tasks.indexOf(tk) === -1) tasks.push(tk);
                rd.preRender();
            }
            TextAtlas.$checkUpdate();
            for (let task of tasks) {
                task.render();
            }
        }
    }



}