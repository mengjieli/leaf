namespace leaf {

    /**
     * @internal
     */
    export class RenerManager {

        matrix: ecs.Matrix = new ecs.Matrix();

        cc = 0;

        masks: RectMask[] = [];

        newTask: boolean;

        hasMask: boolean;

        update() {
            let now = Date.now();
            let gl = GLCore.gl;
            BlendModeFunc.changeBlendMode(leaf.BlendMode.NORMAL);
            //绑定舞台的渲染纹理。
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            //清除舞台，这句如果和 3d 合并之后应该去掉
            gl.clear(gl.COLOR_BUFFER_BIT);
            // gl.clear(gl.STENCIL_BUFFER_BIT);
            let tasks: Shader[] = [];
            this.matrix.identity();
            this.cc = 0;
            this.masks.length = 0;
            this.newTask = false;
            this.hasMask = false;
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
            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i];
                if (this.masks[i]) {
                    let mask = this.masks[i];
                    gl.enable(gl.SCISSOR_TEST);
                    // turn on scissor test
                    // set the scissor rectangle
                    let global = mask.transform.worldMatrix;
                    // global.save();
                    // global.translate(mask.x, mask.y);
                    let x = global.tx + mask.x * global.a;
                    let y = global.ty + mask.y * global.d;;
                    let w = mask.width * global.a;
                    let h = mask.height * global.d;
                    gl.scissor(x, GLCore.height - y - h, w, h);
                    // execute drawing commands in the scissor box (e.g. clear)
                    // turn off scissor test again
                }
                task.render();
                if (this.masks[i]) {
                    gl.disable(gl.SCISSOR_TEST);
                }
            }
            let now3 = Date.now();
            runInfo.glRenderTime += now3 - now2;
            runInfo.renderTime += now3 - now;
            this.masks.length = 0;
        }

        preRenderEntity(entity: ecs.Entity, matrix: ecs.Matrix, alpha: number, tasks: Shader[]) {
            let mask = entity.getComponent(RectMask);
            if (mask) {
                this.masks[tasks.length] = mask;
                if (tasks.length) {
                    tasks[tasks.length - 1].startNewTask();
                }
                this.newTask = true;
                this.hasMask = true;
            }
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
                            if (!tasks.length || tasks[tasks.length - 1] != tk || this.newTask) {
                                this.newTask = false;
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
            if (mask) {
                if (tasks.length) {
                    tasks[tasks.length - 1].startNewTask();
                }
                this.newTask = true;
                this.hasMask = true;
            }
            this.cc++;
        }
    }



}