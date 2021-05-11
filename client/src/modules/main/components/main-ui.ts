import { TopInfoView } from "./top-info-view";
import { MainTop } from "./main-top";
import { GameItemRenderer } from "./game-item-renderer";
import { GameConfig } from "../../../utils/game-config";
import { gameConfigs } from "../../../config/game-config";
import { GameTag } from "../../../net/game-tag";

orange.autoloadLink("MainScene");

export class MainUI extends ecs.Component {

    top = 255;

    bottom = 50;

    list: leaf.List<GameConfig>;

    emptyLabel: leaf.Label;

    init() {
        this.addBg();

        ecs.Entity.create().addComponent(TopInfoView).parent = this.entity;

        let top = this.addComponent(MainTop);
        top.selected = 0;
        top.onChangeMenu.on(this.refresh, this);

        let list = this.list = ecs.Entity.create().addComponent(leaf.List, [], GameItemRenderer, 640, leaf.getStageHeight() - this.top - this.bottom);
        list.addComponent(leaf.TileLayout, 300, 300, 10, 10).addComponent(leaf.Scroller, list, false, true).speedV = 3;
        list.parent = this.entity;
        list.transform.y = this.top + 10;
        list.transform.x = 15;

        this.refresh(top.selected);
    }

    refresh(index: number) {
        if (this.emptyLabel) {
            this.emptyLabel.entity.destroy();
            this.emptyLabel = null;
        }
        let data = [];
        if (index === 2) {
            for (let id of GameTag.tags.hot.gameIds) {
                if (gameConfigs[id]) {
                    data.push(gameConfigs[id]);
                }
            }
        } else if (index === 3) {
            for (let id of GameTag.tags.push.gameIds) {
                if (gameConfigs[id]) {
                    data.push(gameConfigs[id]);
                }
            }
        } else {
            for (let k in gameConfigs) {
                let cfg = gameConfigs[k];
                if (index === 4) {
                    if (!cfg.isActive) data.push(cfg);
                }
                if (index === 1) {
                    if (cfg.isActive) data.push(cfg);
                }
            }
        }
        this.list.data = data;
        if (!data.length) {
            this.emptyLabel = ecs.Entity.create().addComponent(leaf.Label);
            this.emptyLabel.fontColor = 0x777777;
            this.emptyLabel.text = "列表暂时是空的，看看其它分类吧~";
            this.emptyLabel.parent = this.entity;
            this.emptyLabel.transform.x = (leaf.getStageWidth() - this.emptyLabel.textWidth) / 2;
            this.emptyLabel.transform.y = this.top + (leaf.getStageHeight() - this.top - this.emptyLabel.textHeight) / 2;
        }
    }


    addBg() {
        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.resource = "bg";
        bg.parent = this.entity;
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight();

        let bg2 = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg2.texture = leaf.PointTexture.getTexture(0xf4f4f4);
        bg2.parent = this.entity;
        bg2.transform.scaleX = leaf.getStageWidth();
        bg2.transform.y = this.top;
        bg2.transform.scaleY = leaf.getStageHeight() - bg2.transform.y;
    }
}