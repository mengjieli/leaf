import { PlayerData } from "../net/player-data";

export class Platform {

    public static get isWeb(): boolean {
        return !!window["IS_WEB"];
    }

    public static login(back: Function) {
        if (this.isWeb) {

        } else {
            let openid: string;
            let call = () => {
                window["wx"].cloud.callFunction({
                    name: 'login',
                    success: res => {
                        openid = res.result.openid;
                        loadData();
                    },
                    fail: err => {
                        onFail();
                    }
                });
            }
            let uid = 10000;
            let createUId = (call: Function) => {
                const db = window["wx"].cloud.database();
                db.collection('uid').get({
                    success: async (res) => {
                        uid = res.data[0].count++;
                        db.collection('uid').doc(res.data[0]._id).update({
                            data: {
                                count: res.data[0].count
                            },
                            success: async (res) => {
                                call();
                            },
                            fail: (err2) => {
                                console.error(err2);
                                createUId(call);
                            }
                        })
                    },
                    fail: (err) => {
                        console.error(err);
                        createUId(call);
                    }
                })
            }
            let loadData = () => {
                const db = window["wx"].cloud.database();
                db.collection('role').where({
                    _openid: openid
                }).get({
                    success: async (res) => {
                        if (!res.data || !res.data.length) {
                            createUId(async () => {
                                PlayerData.instance["_uid"] = uid;
                                await db.collection('role').add({
                                    data: PlayerData.instance.encode(),
                                    success: (res) => {
                                        loadData();
                                    },
                                    fail: () => {
                                        onFail();
                                    }
                                })
                            })
                        } else {
                            back(res.data[0]);
                        }

                    },
                    fail: () => {
                        onFail();
                    }
                })
            }
            let onFail = () => {
                loadData();
            }
            call();
        }
    }

}