namespace lse {

    export class World {

        /**
         * 
         * @param frameTime 一帧运行的时间(毫秒)
         */
        constructor(frameTime: number = 16, extendedData?: any) {
            this.frame = {};
            this.frame[EMWorldType.SHOW] = 0;
            this.frame[EMWorldType.SYNC] = 0;
            this.frame[EMWorldType.REAL] = 0;
            this.itemIds = {};
            this.itemIds[EMWorldType.SHOW] = 0;
            this.itemIds[EMWorldType.SYNC] = 0;
            this.itemIds[EMWorldType.REAL] = 0;
            this.frameTime = frameTime;
            this.extendedData = extendedData;
            this.players = {};
            this.players[EMWorldType.SHOW] = new Link<Player>();
            this.players[EMWorldType.SYNC] = new Link<Player>();
            this.players[EMWorldType.REAL] = new Link<Player>();
            this.items = {};
            this.items[EMWorldType.SHOW] = new Link<Item>();
            this.items[EMWorldType.SYNC] = new Link<Item>();
            this.items[EMWorldType.REAL] = new Link<Item>();
        }

        clear() {
            this.extendedData = null;
            this.frame[EMWorldType.SHOW] = 0;
            this.frame[EMWorldType.SYNC] = 0;
            this.frame[EMWorldType.REAL] = 0;
            this.itemIds[EMWorldType.SHOW] = 0;
            this.itemIds[EMWorldType.SYNC] = 0;
            this.itemIds[EMWorldType.REAL] = 0;
            this.players = {};
            (this.items as any) = {};
        }

        extendedData: any;

        /**
         *一帧运行的时间(毫秒)
         */
        readonly frameTime: number;

        frame: { [index: number]: number };

        private itemIds: { [index: number]: number };

        getNewItemId(type: lse.EMWorldType.SHOW | lse.EMWorldType.SYNC | lse.EMWorldType.REAL): number {
            return this.itemIds[type]++;
        }

        /**
         * 当前显示的帧序号
         */
        get showFrame(): number {
            return this.frame[EMWorldType.SHOW];
        }

        /**
         * 同步预测的帧序号
         */
        get syncFrame(): number {
            return this.frame[EMWorldType.SYNC];
        }

        /**
         * 真实的帧序号
         */
        get realFrame(): number {
            return this.frame[EMWorldType.REAL];
        }

        /**
         * @internal
         */
        players: { [index: number]: Link<Player> };

        /**
         * 添加玩家
         * @param id 
         * @param data 
         * @param extendedData 
         */
        addPlayer(id: number, local: boolean, extendedData?: any, worldType: EMWorldType = EMWorldType.ALL) {
            if (worldType & EMWorldType.SHOW) {
                this.players[EMWorldType.SHOW].add(new Player(id, local, extendedData));
            }
            if (worldType & EMWorldType.SYNC) {
                this.players[EMWorldType.SYNC].add(new Player(id, local, extendedData));
            }
            if (worldType & EMWorldType.REAL) {
                this.players[EMWorldType.REAL].add(new Player(id, local, extendedData));
            }
        }

        /**
         * 删除玩家
         * @param id 
         */
        removePlayer(id: number, worldType: EMWorldType = EMWorldType.ALL) {
            if (worldType & EMWorldType.SHOW) {
                this.players[EMWorldType.SHOW].removeById(id);
            }
            if (worldType & EMWorldType.SYNC) {
                this.players[EMWorldType.SYNC].removeById(id);
            }
            if (worldType & EMWorldType.REAL) {
                this.players[EMWorldType.REAL].removeById(id);
            }
        }

        readonly items: { [index: number]: Link<Item> };

        /**
         * @internal
         */
        private _items: Link<Item>;

        get currentItems(): Link<Item> {
            return this._items;
        }

        addPlayerFrame(id: number, frame: number, worldType: EMWorldType = EMWorldType.ALL) {
            if (worldType & EMWorldType.REAL) {
                let player = this.players[EMWorldType.REAL].getById(id);
                if (player) {
                    (player.frame as any) = frame;
                    let frameData = player.getFrameData(frame);
                    if (!frameData) {
                        frameData = new PlayerFrame(id, frame);
                        player.frames.push(frameData);
                    }
                }
            }
            if (worldType & EMWorldType.SYNC) {
                let player = this.players[EMWorldType.SYNC].getById(id);
                if (player) {
                    (player.frame as any) = frame;
                    let frameData = player.getFrameData(frame);
                    if (!frameData) {
                        frameData = new PlayerFrame(id, frame);
                        player.frames.push(frameData);
                    }
                }
            }
            if (worldType & EMWorldType.SHOW) {
                let player = this.players[EMWorldType.SHOW].getById(id);
                if (player) {
                    (player.frame as any) = frame;
                    let frameData = player.getFrameData(frame);
                    if (!frameData) {
                        frameData = new PlayerFrame(id, frame);
                        player.frames.push(frameData);
                    }
                }
            }
        }

        addPlayerAction(id: number, type: number, data?: any, frame: number = -1, worldType: EMWorldType = EMWorldType.ALL) {
            if (frame === -1) frame = this.showFrame + 1;
            this.addPlayerFrame(id, frame, worldType);
            if (worldType & EMWorldType.REAL) {
                let player = this.players[EMWorldType.REAL].getById(id);
                if (player) {
                    let frameData = player.getFrameData(frame);
                    let action = new PlayerAction(type, data);
                    frameData.actions.push(action);
                }
            }
            if (worldType & EMWorldType.SYNC) {
                let player = this.players[EMWorldType.SYNC].getById(id);
                if (player) {
                    let frameData = player.getFrameData(frame);
                    let action = new PlayerAction(type, data);
                    frameData.actions.push(action);
                }
            }
            if (worldType & EMWorldType.SHOW) {
                let player = this.players[EMWorldType.SHOW].getById(id);
                if (player) {
                    let frameData = player.getFrameData(frame);
                    let action = new PlayerAction(type, data);
                    frameData.actions.push(action);
                }
            }
        }

        addItem(id: number, data: IItemData, playerId: number = -1, worldType: EMWorldType.SHOW | EMWorldType.SYNC | EMWorldType.REAL) {
            this.items[worldType].add(ObjectPools.createRecyableObject(Item, worldType, this, id, data, this.players[worldType].getById(playerId)));
        }

        removeItem(id: number, worldType: EMWorldType.SHOW | EMWorldType.SYNC | EMWorldType.REAL) {
            let item = this.items[worldType].getById(id);
            if (item) {
                this.items[worldType].remove(item);
                ObjectPools.releaseRecyableObject(item);
            }
        }

        update() {
            this.updateRealWorld();
            this.updateSyncWorld();
            this.updateShowWorld();
            this.syncShowWorld(this.items[EMWorldType.SHOW], this.items[EMWorldType.SYNC], EMWorldType.SYNC, this);
            ObjectPools.clearLinkPrePool();
        }

        /**
         * @internal
         */
        private updateRealWorld() {
            this._items = this.items[EMWorldType.REAL];
            let isOk = true;
            let hasUpdateAndHasAction = false;
            while (isOk && this.realFrame < this.showFrame + 1) {
                isOk = true;
                let frame = this.realFrame;
                for (let node = this.players[EMWorldType.REAL].head; node; node = node.next) {
                    let player = node.value;
                    if (!player.getFrameData(frame)) {
                        isOk = false;
                        break;
                    }
                }
                if (!isOk) break;
                //执行操作
                for (let node = this.players[EMWorldType.REAL].head; node; node = node.next) {
                    let player = node.value;
                    let frameData = player.getFrameData(frame);
                    player.frames.splice(player.frames.indexOf(frameData), 1);
                    if (frameData.actions.length) {
                        for (let action of frameData.actions) {
                            hasUpdateAndHasAction = true;
                            this.executePlayerAction(this.items[EMWorldType.REAL], player, action, EMWorldType.REAL, this);
                        }
                    }
                }
                //运行一帧
                this.runFrame(this.currentItems, EMWorldType.REAL, this);
                this.frame[EMWorldType.REAL]++;
                this.itemIds[EMWorldType.REAL] = 0;
                
                if (!this.players[EMWorldType.REAL].length) break;
            }
            if (!hasUpdateAndHasAction) return;
            //同步预测世界
            //目前采用每次逻辑帧回来都回滚
            let realItems = this.items[EMWorldType.REAL];
            let syncItems = this.items[EMWorldType.SYNC];
            //复制已有的数据和删除无用数据
            for (let node = syncItems.head; node; node = node.next) {
                let realItem = realItems.getById(node.value.id);
                if (!realItem) {
                    node.value.data.dispose();
                    syncItems.remove(node.value);
                } else {
                    realItem.data.copyTo(node.value.data, EMWorldType.SYNC);
                }
            }
            //创建没有的数据
            for (let node = realItems.head; node; node = node.next) {
                let syncItem = syncItems.getById(node.value.id);
                if (!syncItem) {
                    this.items[EMWorldType.SYNC].add(
                        ObjectPools.createRecyableObject(
                            Item,
                            EMWorldType.SYNC,
                            this,
                            node.value.id,
                            node.value.data.clone(EMWorldType.SYNC),
                            node.value.player ? this.players[EMWorldType.SYNC].getById(node.value.player.id) : null
                        )
                    );
                }
            }
            this.frame[EMWorldType.SYNC] = this.frame[EMWorldType.REAL];
            this.itemIds[EMWorldType.SYNC] = this.itemIds[EMWorldType.REAL];
        }

        /**
         * @internal
         */
        private updateSyncWorld() {
            this._items = this.items[EMWorldType.SYNC];
            while (this.syncFrame <= this.frame[EMWorldType.SHOW]) {
                let frame = this.syncFrame;
                //执行操作
                for (let node = this.players[EMWorldType.SYNC].head; node; node = node.next) {
                    let player = node.value;
                    //清理过期的帧数据
                    for (let i = 0; i < player.frames.length; i++) {
                        if (player.frames[i].frame < this.realFrame) {
                            if (player.frames[i].actions.length) {
                                for (let action of player.frames[i].actions) {
                                    this.executePlayerAction(this.items[EMWorldType.SYNC], player, action, EMWorldType.SYNC, this);
                                }
                            }
                            player.frames.splice(i, 1);
                            i--;
                        }
                    }
                    let frameData = player.getFrameData(frame);
                    if (!frameData) continue;
                    if (frame < this.realFrame) {
                        player.frames.splice(player.frames.indexOf(frameData), 1);
                    }
                    if (frameData.actions.length) {
                        for (let action of frameData.actions) {
                            this.executePlayerAction(this.items[EMWorldType.SYNC], player, action, EMWorldType.SYNC, this);
                        }
                    }
                }
                //运行一帧
                this.runFrame(this.currentItems, EMWorldType.SYNC, this);
                this.frame[EMWorldType.SYNC]++;
                this.itemIds[EMWorldType.SYNC] = 0;
            }
        }

        /**
         * @internal
         */
        private updateShowWorld() {
            this._items = this.items[EMWorldType.SHOW];
            let frame = this.showFrame;
            //执行操作
            for (let node = this.players[EMWorldType.SHOW].head; node; node = node.next) {
                let player = node.value;
                //清理过期的帧数据
                for (let i = 0; i < player.frames.length; i++) {
                    if (player.frames[i].frame < this.realFrame) {
                        if (player.frames[i].actions.length) {
                            for (let action of player.frames[i].actions) {
                                this.executePlayerAction(this.items[EMWorldType.SHOW], player, action, EMWorldType.SHOW, this);
                            }
                        }
                        player.frames.splice(i, 1);
                        i--;
                    }
                }
                let frameData = player.getFrameData(frame);
                if (!frameData) continue;
                if (frameData.actions.length) {
                    for (let action of frameData.actions) {
                        this.executePlayerAction(this.items[EMWorldType.SHOW], player, action, EMWorldType.SHOW, this);
                    }
                }
                player.frames.splice(player.frames.indexOf(frameData), 1);
            }
            //运行一帧
            this.runFrame(this.currentItems, EMWorldType.SHOW, this);
            this.frame[EMWorldType.SHOW]++;
            this.itemIds[EMWorldType.SHOW] = 0;
        }

        executePlayerAction: (items: Link<Item>, player: Player, action: PlayerAction, type: EMWorldType, world: World) => void;

        runFrame: (items: Link<Item>, type: EMWorldType, world: World) => void;

        syncShowWorld: (items: Link<Item>, syncItem: Link<Item>, type: EMWorldType, world: World) => void;
    }

    export interface IItemData {

        lockStepItem: Item;

        copyTo(item: IItemData, worldType: EMWorldType): IItemData;

        clone(worldType: EMWorldType): IItemData;

        dispose();
    }

    export enum EMWorldType {
        SHOW = 1,
        SYNC = 2,
        REAL = 4,
        SHOW_SYNC = 3,
        SHOW_REAL = 5,
        SYNC_REAL = 6,
        ALL = 7
    }

}

window["lse"] = lse;