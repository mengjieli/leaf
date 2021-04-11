import { GameStorage } from "../utils/storage/game-storage";

export class PlayerData {

    private _id: string;

    private _openid: string;

    get openid(): string {
        return this._openid;
    }

    private _uid: number = 0;

    get uid(): number {
        return this._uid;
    }

    private _head: string;

    get head(): string {
        return this._head;
    }

    private _sexy: number;

    get sexy(): number {
        return this._sexy;
    }

    private _games: GameData[] = [];

    get games(): GameData[] {
        return this._games;
    }

    //[1,1,0,0,0]
    private _shareIndex: number;

    get shareIndex(): number {
        return this._shareIndex;
    }

    get isNextShare(): boolean {
        return this._shareIndex % 5 <= 1 ? true : false;
    }

    getGame(name: string): GameData {
        for (let game of this._games) {
            if (game.name === name) return game;
        }
        let game = new GameData();
        game.name = name;
        game.maxLevel = 0;
        this._games.push(game);
        return game;
    }

    private isOld: boolean = false;

    save(obj?: any) {
        if (obj) {
            for (let k in obj) {
                this[k] = obj[k];
            }
        }
        this.isOld = true;
        this.saveToServer();
    }

    load(success?: Function, fail?: Function) {
        if (window["IS_WEB"]) {
            GameStorage.getStorage("puzzle-game").then((obj) => {
                if (!obj) return;
                this.decode(obj);
                success && success();
            });
        } else {
            const db = window["wx"].cloud.database();
            db.collection('role').where({
                _openid: this._openid
            }).get({
                success: (res) => {
                    this.decode(res.data);
                    success && success();
                },
                fail: () => {
                    fail && fail();
                }
            })
        }
    }

    decode(obj: any) {
        if (obj._id) this._id = obj._id;
        if (obj._openid) this._openid = obj._openid;
        if (obj.uid) this._uid = obj.uid;
        this._head = obj.head || "";
        this._sexy = obj.sexy || 0;
        this._shareIndex = obj.shareIndex || 0;
        this._games.length = 0;
        if (obj.games) {
            for (let gameObj of obj.games) {
                let game = new GameData();
                game.decode(gameObj);
                this._games.push(game);
            }
        }
    }

    encode() {
        let obj = {
            head: this.head || "",
            sexy: this.sexy || 0,
            uid: this.uid,
            shareIndex: this.shareIndex,
            games: []
        } as any;
        for (let game of this._games) {
            obj.games.push(game.encode());
        }
        return obj;
    }

    private isSaving = false;

    private saveToServer() {
        if (!this.isOld) return;
        if (this.isSaving) return;
        this.isOld = false;
        let obj = this.encode();
        if (window["IS_WEB"]) {
            obj._openid = this._openid;
            obj._id = this._id;
            GameStorage.setStorage("puzzle-game", obj);
        } else {
            const db = window["wx"].cloud.database();
            db.collection('role').where({
                _id: this._id
            }).update({
                data: obj,
                success: (res) => {
                    this.isSaving = false;
                    this.saveToServer();
                },
                fail: () => {
                    window["wx"].showToast({
                        title: "请检查网络",
                        complete: () => {
                            this.isSaving = false;
                            this.isOld = true;
                        }
                    })
                }
            })
        }
    }

    static instance: PlayerData = new PlayerData();
}

export class GameData {

    name: string;

    maxLevel: number;

    encode() {
        return {
            name: this.name,
            maxLevel: this.maxLevel
        }
    }

    decode(obj: any) {
        this.name = obj.name;
        this.maxLevel = obj.maxLevel || 0;
    }
}