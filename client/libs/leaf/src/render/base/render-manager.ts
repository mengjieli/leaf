namespace leaf {

    /**
     * @internal
     */
    export class RenerManager {

        matrix: ecs.Matrix = new ecs.Matrix();

        cc = 0;

        update() {
            let now = Date.now();
            let gl = GLCore.gl;
            BlendModeFunc.changeBlendMode(leaf.BlendMode.NORMAL);
            //绑定舞台的渲染纹理。
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            //清除舞台，这句如果和 3d 合并之后应该去掉
            gl.clear(gl.COLOR_BUFFER_BIT);
            let tasks: Shader[] = [];
            this.matrix.identity();
            this.cc = 0;
            this.preRenderEntity(world.root, this.matrix, 1, tasks);

            let rd = world.root.getComponent(Render);
            if (rd) {
                let tk: Shader = rd.shader;
                if (tk) {
                    if (tasks.length && tasks[tasks.length - 1] != tk) {
                        tasks[tasks.length - 1].startNewTask();
                    }
                    if (!tasks.length || tasks[tasks.length - 1] != tk) {
                        tasks.push(tk);
                    }
                }
                rd.preRender2(this.matrix, 1);
            }
            tasks.length && tasks[tasks.length - 1].startNewTask();

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

        preRenderEntity(entity: ecs.Entity, matrix: ecs.Matrix, alpha: number, tasks: Shader[]) {
            let rd = entity.getComponent(Render);
            if (!rd || rd.renderChildren) {
                matrix.save();
                matrix.reconcat(entity.transform.local);
                for (let c of entity.children) {
                    rd = c.getComponent(Render);
                    if ((!rd || rd.renderChildren) && c.children.length) this.preRenderEntity(c, matrix, alpha * c.transform.alpha, tasks);
                    if (rd) {
                        let tk: Shader = rd.shader;
                        if (tk) {
                            if (tasks.length && tasks[tasks.length - 1] != tk) {
                                tasks[tasks.length - 1].startNewTask();
                            }
                            if (!tasks.length || tasks[tasks.length - 1] != tk) {
                                tasks.push(tk);
                            }
                        }
                        matrix.save();
                        rd.preRender2(matrix, alpha);
                        matrix.restore();
                    }
                }
                matrix.restore();
            }
            this.cc++;
        }
    }



}