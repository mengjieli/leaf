namespace leaf {

    export var debug = false;

    export var world: ecs.World;

    export var runInfo: {
        frame: number,
        runTime: number,
        drawCall: number,
        drawCount: number,
        fps: number,
        fpsTime: number,
        fpsDrawCall: number,
        fpsDrawCount: number,
    } = {
        frame: 0,
        runTime: 0,
        drawCall: 0,
        drawCount: 0,
        fps: 0,
        fpsTime: 0,
        fpsDrawCall: 0,
        fpsDrawCount: 0,
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

    var onTick: Function;

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
        world.addSystem(RenderSystem, [Render as any]);
        var t = 0;
        var lastTime = Date.now();
        var lastFrame = 0;
        var lastDraCall = 0;
        var lastDrawCount = 0;
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
            world.update();
            requestAnimationFrame.call(window, onTick);
            let end = Date.now();
            t += end - now;
            runInfo.frame++;
            runInfo.runTime += end - now;
            if (end - lastTime >= 1000) {
                runInfo.fps = (~~(10 * (runInfo.frame - lastFrame) * 1000 / (end - lastTime))) / 10;
                runInfo.fpsTime = (~~(10 * t / (runInfo.frame - lastFrame))) / 10;
                runInfo.fpsDrawCall = (~~((runInfo.drawCall - lastDraCall) / (runInfo.frame - lastFrame)));
                runInfo.fpsDrawCount = (~~((runInfo.drawCount - lastDrawCount) / (runInfo.frame - lastFrame)));
                lastFrame = runInfo.frame;
                lastDraCall = runInfo.drawCall;
                lastDrawCount = runInfo.drawCount;
                lastTime = end;
                t = 0;
            }
        }
        requestAnimationFrame.call(window, onTick);
        return world;
    }

}