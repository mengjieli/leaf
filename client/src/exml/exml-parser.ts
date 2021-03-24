import { EXML } from "./exml";

var name_scale9Grid = "scale9Grid";
var name_source = "source";
var BlendModeAdd = "add";

export class EXMLParser {

    static childrenProperties = new Map<any, any>();

    static getEXML(ui: EXML, cfg: any, fps = 60) {
        let childrenProperties = this.childrenProperties;
        let properties;
        if (!this.childrenProperties.has(cfg)) {
            childrenProperties.set(cfg, {});
            properties = childrenProperties.get(cfg);
            this.decodeProperties(ui.entity, cfg.root.properties);
            this.decodeChildren(ui, ui.entity, cfg.root.children, properties);
            // this.decodeTween(ui, cfg.tweens, properties, fps);
        } else {
            this.decodeProperties(ui.entity, cfg.root.properties);
            this.decodeChildren(ui, ui.entity, cfg.root.children);
            // this.decodeTween(ui, cfg.tweens, null, fps);
        }
        return ui;
    }

    static decodeProperties(ui: ecs.Entity, properties: any) {
        for (let k in properties) {
            if (k == name_scale9Grid) {
                let arr = properties[k].split(",");
                ui[k] = {
                    x: +arr[0],
                    y: +arr[1],
                    width: +arr[2],
                    height: +arr[3]
                };
            } else if (k == name_source) {
                ui.getComponent(leaf.Bitmap).resource = properties[k];
            } else if (k == "blendMode") {
                if (properties[k] == BlendModeAdd) {
                    ui.getComponent(leaf.Render as any)["blendMode"] = leaf.BlendMode.ADD;
                } else {
                }
            } else if (k === "x" || k === "y" || k === "scaleX" || k === "scaleY") {
                ui.transform[k] = properties[k];
            } else if (k === "rotation") {
                ui.transform.angle = properties[k];
            } else {
                ui[k] = properties[k];
            }
        }
    }

    static decodeChildren(root: any, ui: ecs.Entity, children: any[],
        properties?: any) {
        const add = ui["blendMode"] === BlendModeAdd;
        children.forEach(child => {
            let display = this.decodeDisplay(root, child, properties);
            if (add) {
                display["blendMode"] = "add";
            }
            ui.addChild(display);
            if (child.properties.id) {
                root[child.properties.id] = display;
                root["ids"][child.properties.id] = display;
            }
        });
        // if (add && ui instanceof Container) {
        //     ui["blendMode"] = BlendMode.NORMAL;
        // }
    }

    static decodeDisplay(root: any, cfg: any, properties?: any): ecs.Entity {
        let entity = ecs.Entity.create();
        let define;
        if (cfg.type == "eui.Group") {

        } else if (cfg.type == "eui.Component") {

        } else if (cfg.type == "eui.Image") {
            entity.addComponent(leaf.Bitmap);
        } else {
            define = orange.GetUtil.getFromGlobal(cfg.type);
            if (define) {
                entity.addComponent(define);
            }
        }
        if (properties && cfg.properties.id) {
            properties[cfg.properties.id] = cfg.properties;
        }
        this.decodeProperties(entity, cfg.properties);
        this.decodeChildren(root, entity, cfg.children, properties);
        return entity;
    }

}