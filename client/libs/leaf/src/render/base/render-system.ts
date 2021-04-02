namespace leaf {

    /**
     * @internal
     */
    export class RenderSystem extends ecs.EntitySystem {

        update() {
            let now = Date.now();
            let gl = GLCore.gl;
            BlendModeFunc.changeBlendMode(leaf.BlendMode.NORMAL);
            //绑定舞台的渲染纹理。
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            //清除舞台，这句如果和 3d 合并之后应该去掉
            gl.clear(gl.COLOR_BUFFER_BIT);
            let tasks: Shader[] = [];
            for (let node = this.query.head; node; node = node.next) {
                let rd = node.value.getComponent(Render as any) as Render;
                if (rd) {
                    let tk: Shader = rd.shader;
                    if (tk) {
                        if (tasks.length && tasks[tasks.length - 1] != tk) {
                            for (let t of tasks) {
                                t.startNewTask();
                            }
                        }
                        if (!tasks.length || tasks[tasks.length - 1] != tk) {
                            tasks.push(tk);
                        }
                    }
                }
                rd.preRender();
            }
            for (let t of tasks) {
                t.startNewTask();
            }
            let now2 = Date.now();
            runInfo.preRenderTime += now2 - now;
            TextAtlas.$checkUpdate();
            for (let task of tasks) {
                task.render();
            }
            let now3 = Date.now();
            runInfo.glRenderTime += now3 - now2;
            runInfo.renderTime += now3 - now;
        }
    }



}