namespace leaf {

    export var debug = false;

    export var world: ecs.World;

    export var runInfo: {
        frame: number,
        runTime: number,
        drawCall: number,
        drawCount: number,
        logicTime: number,
        renderTime: number,
        preRenderTime: number,
        glRenderTime: number,
        fps: number,
        frameTime: number,
        frameLogicTime: number,
        frameRenderTime: number,
        framePreRenderTime: number,
        frameGlRenderTime: number,
        frameDrawCall: number,
        frameDrawCount: number,
    } = {
        frame: 0,
        runTime: 0,
        drawCall: 0,
        drawCount: 0,
        logicTime: 0,
        renderTime: 0,
        preRenderTime: 0,
        glRenderTime: 0,
        fps: 0,
        frameTime: 0,
        frameLogicTime: 0,
        frameRenderTime: 0,
        framePreRenderTime: 0,
        frameGlRenderTime: 0,
        frameDrawCall: 0,
        frameDrawCount: 0,
    };

    var runFlag = true;

    /**
     * 暂停
     */
    export function pause() {
        runFlag = false;
    }

    /**
     * 继续播放
     */
    export function play() {
        runFlag = true;
    }

    /**
     * @internal
     */
    export var loaderEntity: ecs.Entity;

    export function getStageWidth() {
        return GLCore.width / GLCore.scale;
    }

    export function getStageHeight() {
        return GLCore.height / GLCore.scale;
    }

    var onTick: Function;

    export var fixWidth = 640;

    /**
     * 初始化
     * @returns 
     */
    export function init(): ecs.World {
        if (world) return;
        GLCore.init();
        world = world || new ecs.World();
        loaderEntity = ecs.Entity.create();
        loaderEntity.parent = world.root;
        let rs: RecordSystem;
        world.addSystem(RecordSystem, [RecordComponent]);
        rs = world.getSystem(RecordSystem);
        var rm = new RenerManager();
        var renderType = 2;
        if (renderType === 1) {
            world.addSystem(RenderSystem, [Render as any]);
        }
        var t = 0;
        var lastTime = Date.now();
        var lastFrame = 0;
        var lastDraCall = 0;
        var lastDrawCount = 0;
        var lastLogicTime = 0;
        var lastRenderTime = 0;
        var lastPreRenderTime = 0;
        var lastGlRenderTime = 0;
        onTick = function (): void {
            if (rs.checkReplayReady() === false) {
                requestAnimationFrame.call(window, onTick);
                return;
            }
            if (!runFlag) {
                requestAnimationFrame.call(window, onTick);
                return;
            }
            let now = Date.now();
            let rt = runInfo.renderTime;
            world.update();
            if (renderType === 2) {
                rm.update();
            }
            requestAnimationFrame.call(window, onTick);
            let end = Date.now();
            runInfo.logicTime += end - now - (runInfo.renderTime - rt);
            t += end - now;
            runInfo.frame++;
            runInfo.runTime += end - now;
            if (end - lastTime >= 1000) {
                runInfo.fps = (~~(10 * (runInfo.frame - lastFrame) * 1000 / (end - lastTime))) / 10;
                runInfo.frameTime = (~~(10 * t / (runInfo.frame - lastFrame))) / 10;
                runInfo.frameLogicTime = (~~(10 * (runInfo.logicTime - lastLogicTime) / (runInfo.frame - lastFrame))) / 10;
                runInfo.frameRenderTime = (~~(10 * (runInfo.renderTime - lastRenderTime) / (runInfo.frame - lastFrame))) / 10;
                runInfo.framePreRenderTime = (~~(10 * (runInfo.preRenderTime - lastPreRenderTime) / (runInfo.frame - lastFrame))) / 10;
                runInfo.frameGlRenderTime = (~~(10 * (runInfo.glRenderTime - lastGlRenderTime) / (runInfo.frame - lastFrame))) / 10;
                runInfo.frameDrawCall = (~~((runInfo.drawCall - lastDraCall) / (runInfo.frame - lastFrame)));
                runInfo.frameDrawCount = (~~((runInfo.drawCount - lastDrawCount) / (runInfo.frame - lastFrame)));
                lastFrame = runInfo.frame;
                lastDraCall = runInfo.drawCall;
                lastDrawCount = runInfo.drawCount;
                lastLogicTime = runInfo.logicTime;
                lastRenderTime = runInfo.renderTime;
                lastPreRenderTime = runInfo.preRenderTime;
                lastGlRenderTime = runInfo.glRenderTime;
                lastTime = end;
                t = 0;
            }
        }
        requestAnimationFrame.call(window, onTick);
        return world;
    }

}

window["leaf"] = leaf;