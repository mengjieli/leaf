import { PuzzleScriptGameData } from "../data/puzzle-script-game-data";
import { PuzzleScriptGameKeyBoard } from "./puzzle-script-game-key-board";
import { PuzzleScriptGameSize } from "./puzzle-script-game-size";
import { Platform } from "../../../utils/platform";
import { PuzzleScriptGameShow } from "./puzzle-script-game-show";
import { PuzzleScriptGameRefresh } from "./puzzle-script-game-refresh";
import { PuzzleScriptGameUI } from "../ui/puzzle-script-game-ui";
import { VersionComponent } from "../../../components/version-component";
import { PuzzleScriptGameLoop } from "./puzzle-script-game-loop";
import { ModuleScene } from "../../../utils/ui/module-scene";

orange.autoloadLink("PuzzleScriptScene");

export class PuzzleScriptGame extends ecs.Component {

    data: PuzzleScriptGameData;

    level: number;

    gridsRoot: ecs.Entity;

    ready: boolean;

    onReadyCall: Function;

    showLine: boolean;

    screenWidth: number;

    screenHeight: number;

    oldflickscreendat: number[];

    init(game: string, level: number = 0, onReadyCall?: Function, showLine: boolean = false) {
        this.oldflickscreendat = [];;
        this.onReadyCall = onReadyCall;
        this.showLine = showLine;
        this.ready = false;
        this.level = level;
        this.gridsRoot = ecs.Entity.create();
        this.gridsRoot.parent = this.entity;
        this.data = PuzzleScriptGameData.getGameData(game);
        if (!this.data.data) {
            this.data.onComplete.on(this.onDataReady, this);
            this.data.load();
        } else {
            this.onDataReady();
        }
    }

    onDataReady() {
        this.initScreen();
        this.createLevel();
        if (Platform.isWeb) this.addComponent(PuzzleScriptGameKeyBoard);
        this.ready = true;
        if (this.getComponent(PuzzleScriptGameShow)) this.getComponent(PuzzleScriptGameShow).refresh();
        if (this.getComponent(PuzzleScriptGameSize)) this.resize();
        this.onReadyCall && this.onReadyCall();
        this.onReadyCall = null;
    }

    createLevel() {
        this.data.start(this.level);
    }

    private initScreen() {
        let screenwidth = this.width;
        let screenheight = this.height;
        let state = this.data.data;
        if (state !== undefined) {
            let flickscreen = state.metadata.flickscreen !== undefined;
            let zoomscreen = state.metadata.zoomscreen !== undefined;
            if (flickscreen) {
                screenwidth = state.metadata.flickscreen[0];
                screenheight = state.metadata.flickscreen[1];
            } else if (zoomscreen) {
                screenwidth = state.metadata.zoomscreen[0];
                screenheight = state.metadata.zoomscreen[1];
            }
        }
        this.screenWidth = screenwidth;
        this.screenHeight = screenheight;
    }

    getScreen(): { mini: number, maxi: number, minj: number, maxj: number, width: number, height: number } {
        let screenwidth = this.screenWidth;
        let screenheight = this.screenHeight;
        var mini = 0;
        var maxi = screenwidth;
        var minj = 0;
        var maxj = screenheight;
        let state = this.data.data;
        let flickscreen = state.metadata.flickscreen !== undefined;
        let zoomscreen = state.metadata.zoomscreen !== undefined;
        let level = this.data.levels[this.level];
        let oldflickscreendat = this.oldflickscreendat;
        if (flickscreen) {
            var playerPositions = window["getPlayerPositions"]();
            if (playerPositions.length > 0) {
                var playerPosition = playerPositions[0];
                var px = (playerPosition / (level.height)) | 0;
                var py = (playerPosition % level.height) | 0;
                var screenx = (px / screenwidth) | 0;
                var screeny = (py / screenheight) | 0;
                mini = screenx * screenwidth;
                minj = screeny * screenheight;
                maxi = Math.min(mini + screenwidth, level.width);
                maxj = Math.min(minj + screenheight, level.height);
                oldflickscreendat = [mini, minj, maxi, maxj];
            }
            else if (oldflickscreendat.length > 0) {
                mini = oldflickscreendat[0];
                minj = oldflickscreendat[1];
                maxi = oldflickscreendat[2];
                maxj = oldflickscreendat[3];
            }
        } else if (zoomscreen) {
            var playerPositions = window["getPlayerPositions"]();
            if (playerPositions.length > 0) {
                var playerPosition = playerPositions[0];
                var px = (playerPosition / (level.height)) | 0;
                var py = (playerPosition % level.height) | 0;
                mini = Math.max(Math.min(px - ((screenwidth / 2) | 0), level.width - screenwidth), 0);
                minj = Math.max(Math.min(py - ((screenheight / 2) | 0), level.height - screenheight), 0);
                maxi = Math.min(mini + screenwidth, level.width);
                maxj = Math.min(minj + screenheight, level.height);
                oldflickscreendat = [mini, minj, maxi, maxj];
            } else if (oldflickscreendat.length > 0) {
                mini = oldflickscreendat[0];
                minj = oldflickscreendat[1];
                maxi = oldflickscreendat[2];
                maxj = oldflickscreendat[3];
            }
        }
        return { mini, maxi, minj, maxj, width: maxi - mini, height: maxj - minj };
    }

    onDestroy() {
        this.data.onComplete.remove(this.onDataReady, this);
        this.data = null;
        this.gridsRoot = null;
        this.line1 = this.line2 = null;
    }

    get width() {
        return this.data.levels[this.level].width;
    }

    get height() {
        return this.data.levels[this.level].height;
    }

    line1: leaf.Bitmap;
    line2: leaf.Bitmap;

    resize() {
        if (!this.ready) return;

        let w = this.getComponent(PuzzleScriptGameSize).width;
        let h = this.getComponent(PuzzleScriptGameSize).height;
        let selfWidth = this.screenWidth * this.data.blockWidth;
        let selfHeight = this.screenHeight * this.data.blockHeight;
        let scale = Math.min(w / selfWidth, h / selfHeight);
        this.gridsRoot.transform.scaleX = this.gridsRoot.transform.scaleY = scale;
        if (this.getComponent(PuzzleScriptGameSize).autoMid) {
            this.gridsRoot.transform.x = (w - scale * selfWidth) / 2;
            this.gridsRoot.transform.y = (h - scale * selfHeight) / 2;
        }

        if (this.showLine) {
            let line: leaf.Bitmap;
            if (!this.line1) this.line1 = ecs.Entity.create().addComponent(leaf.Bitmap);
            line = this.line1;
            line.texture = leaf.PointTexture.getTexture(0x010241);
            line.transform.scaleY = 5;
            line.transform.scaleX = leaf.getStageWidth();
            line.transform.y = this.gridsRoot.transform.y - 5;
            line.parent = this.entity;

            if (!this.line2) this.line2 = ecs.Entity.create().addComponent(leaf.Bitmap);
            line = this.line2;
            line.texture = leaf.PointTexture.getTexture(0x010241);
            line.transform.scaleY = 5;
            line.transform.scaleX = leaf.getStageWidth();
            line.transform.y = this.gridsRoot.transform.y + scale * selfHeight;
            line.parent = this.entity;
        }
    }

    static gameRoot: ecs.Entity;

    static start(gameName: string, levelIndex: number = 0) {
        if (this.gameRoot) {
            this.gameRoot.destroy();
        }
        this.gameRoot = ecs.Entity.create();
        this.gameRoot.parent = leaf.world.scene;

        let title = ecs.Entity.create().addComponent(leaf.Label);
        title.parent = this.gameRoot;
        title.text = `第${levelIndex + 1}关`;
        title.fontSize = 12;
        title.transform.y = 40;
        title.transform.x = (leaf.getStageWidth() - title.textHeight) / 2;
        title.parent = this.gameRoot;

        let level = ecs.Entity.create().addComponent(PuzzleScriptGame, gameName, levelIndex, null, true);
        level.addComponent(PuzzleScriptGameLoop);
        level.addComponent(PuzzleScriptGameShow);
        level.addComponent(PuzzleScriptGameRefresh);
        level.addComponent(PuzzleScriptGameSize, leaf.getStageWidth(), leaf.getStageHeight() - 200);
        level.addComponent(PuzzleScriptGameUI);
        level.transform.y = 60;
        level.parent = this.gameRoot;


        this.gameRoot.addComponent(VersionComponent);
        window["setWin"](false);
    }

}