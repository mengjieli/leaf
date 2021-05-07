
orange.autoloadLink("BullScene");

export class BullCore extends ecs.Component {

    core: BullCoreData;

    fake: boolean = true;

    selfTeam = 0;

    otherTeam = 1;

    debugStep = false;

    init() {
        this.startGame();
    }

    sourceCreateAt: number;
    ops: any[];
    opIndex = 0;

    startGame() {

        window["bc"] = this;

        let core = this.core = new BullCoreData(5);

        core.ops = [];

        let fakeData = {
            "battlefield": { "aid": 2961, "bid": 1492367892733193187, "infos": [{ "uid": 347468977, "bet": 1, "headImg": "https://thirdwx.qlogo.cn/mmopen/vi_32/tzg4JOb3iaibYucZpGF7JCMy3ONqYhgHO9RIG4WA9FEgj86l95pZqw1xIvVBjDComkficnZsiamphk5bfJUXqHkwtQ/132", "gender": 1, "name": "小雨衣", "bullSkilId": -1, "score": 137 }, { "uid": 143616995, "bet": 1, "headImg": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI7vT3ySnFIKlVzPT9QSmpuJ81NN5xHW572Ka7GAGBReSqtNUMnOKF1u838oaodQ4T0EpJblnooWg/132", "gender": 1, "name": "滥好人", "bullSkilId": -1, "score": 119 }], "createdAt": 1620312695813, "tracks": [{ "uid": 347468977, "trackId": 2, "timestamp": 1620312699515 }, { "uid": 143616995, "trackId": 2, "timestamp": 1620312701916 }, { "uid": 347468977, "trackId": 2, "timestamp": 1620312702697 }, { "uid": 143616995, "trackId": 2, "timestamp": 1620312705026 }, { "uid": 347468977, "trackId": 2, "timestamp": 1620312705788 }, { "uid": 143616995, "trackId": 2, "timestamp": 1620312708143 }, { "uid": 347468977, "trackId": 2, "timestamp": 1620312708862 }, { "uid": 143616995, "trackId": 2, "timestamp": 1620312711256 }, { "uid": 347468977, "trackId": 2, "timestamp": 1620312711943 }, { "uid": 143616995, "trackId": 2, "timestamp": 1620312714682 }, { "uid": 347468977, "trackId": 1, "timestamp": 1620312715060 }, { "uid": 347468977, "timestamp": 1620312718144 }, { "uid": 143616995, "trackId": 1, "timestamp": 1620312718661 }, { "uid": 347468977, "trackId": 3, "timestamp": 1620312721234 }, { "uid": 143616995, "trackId": 1, "timestamp": 1620312721757 }, { "uid": 347468977, "trackId": 3, "timestamp": 1620312724305 }, { "uid": 143616995, "trackId": 1, "timestamp": 1620312724891 }, { "uid": 347468977, "timestamp": 1620312727395 }, { "uid": 143616995, "trackId": 1, "timestamp": 1620312727983 }, { "uid": 347468977, "timestamp": 1620312730476 }, { "uid": 347468977, "trackId": 3, "timestamp": 1620312730614 }, { "uid": 143616995, "timestamp": 1620312731095 }, { "uid": 347468977, "trackId": 3, "timestamp": 1620312733574 }, { "uid": 143616995, "timestamp": 1620312734215 }, { "uid": 347468977, "trackId": 3, "timestamp": 1620312736679 }, { "uid": 143616995, "timestamp": 1620312737642 }, { "uid": 143616995, "timestamp": 1620312741367 }, { "uid": 347468977, "timestamp": 1620312743833 }, { "uid": 143616995, "trackId": 1, "timestamp": 1620312744974 }, { "uid": 347468977, "timestamp": 1620312746916 }, { "uid": 143616995, "timestamp": 1620312748639 }, { "uid": 347468977, "trackId": 1, "timestamp": 1620312749984 }, { "uid": 143616995, "timestamp": 1620312751762 }, { "uid": 347468977, "trackId": 1, "timestamp": 1620312753049 }, { "uid": 143616995, "timestamp": 1620312755704 }, { "uid": 347468977, "timestamp": 1620312756157 }, { "uid": 347468977, "trackId": 2, "timestamp": 1620312759258 }, { "uid": 143616995, "timestamp": 1620312759711 }, { "uid": 143616995, "timestamp": 1620312763674 }, { "uid": 347468977, "timestamp": 1620312765610 }, { "uid": 143616995, "trackId": 3, "timestamp": 1620312766899 }, { "uid": 347468977, "timestamp": 1620312768686 }, { "uid": 143616995, "trackId": 1, "timestamp": 1620312769990 }, { "uid": 347468977, "timestamp": 1620312771792 }, { "uid": 143616995, "timestamp": 1620312773106 }, { "uid": 347468977, "timestamp": 1620312774886 }, { "uid": 143616995, "trackId": 1, "timestamp": 1620312776191 }, { "uid": 347468977, "timestamp": 1620312778019 }, { "uid": 143616995, "timestamp": 1620312779307 }, { "uid": 347468977, "timestamp": 1620312781110 }, { "uid": 143616995, "timestamp": 1620312782395 }, { "uid": 347468977, "trackId": 1, "timestamp": 1620312785714 }, { "uid": 143616995, "timestamp": 1620312786147 }, { "uid": 347468977, "trackId": 1, "timestamp": 1620312788766 }, { "uid": 143616995, "timestamp": 1620312789249 }, { "uid": 347468977, "trackId": 1, "timestamp": 1620312791871 }, { "uid": 143616995, "trackId": 2, "timestamp": 1620312792342 }, { "uid": 347468977, "trackId": 2, "timestamp": 1620312794989 }, { "uid": 143616995, "trackId": 4, "timestamp": 1620312795465 }, { "uid": 347468977, "timestamp": 1620312812912 }, { "uid": 347468977, "timestamp": 1620312816004 }, { "uid": 347468977, "timestamp": 1620312819124 }, { "uid": 347468977, "timestamp": 1620312822201 }, { "uid": 347468977, "timestamp": 1620312825282 }, { "uid": 347468977, "timestamp": 1620312828384 }, { "uid": 347468977, "trackId": 1, "timestamp": 1620312831503 }], "hps": [14, 0] }
        }
        let testData = fakeData;
        if (!testData.battlefield.infos[0]["bullGroupId"]) testData.battlefield.infos[0]["bullGroupId"] = 0;
        if (!testData.battlefield.infos[1]["bullGroupId"]) testData.battlefield.infos[1]["bullGroupId"] = 0;
        if (!testData.battlefield.infos[0]["bullSkilId"]) testData.battlefield.infos[0]["bullSkilId"] = 0;
        if (!testData.battlefield.infos[1]["bullSkilId"]) testData.battlefield.infos[1]["bullSkilId"] = 0;

        for (let t of testData.battlefield.tracks) {
            if (!t.trackId) t.trackId = 0;
        }
        // let fakeCore =  null;
        let fakeCore = {"skillStartTimes":{"8":600,"9":1000},"skillContinueTimes":{"8":3000,"9":0},"bull_cd":3000,"loop":0,"time":0,"curTime":0,"opIndex":0,"id":0,"winTeam":-1,"typeMap":{},"teamMap":{},"raceMap":{},"lenMap":{},"strengthMap":{},"atkMap":{},"skillMap":{},"skillIndexs":{},"bullRank0":[3,0,0],"bullRank1":[3,0,3],"bullRankTime":0,"bullRankTime1":0,"bullCDs":[0,0],"races":null,"rand_index":0,"delHpMap":{},"cirtMap":{},"suckMap":{},"debugEvent":false,"steps":[],"events":[],"saveList":[],"view":null,"mw":318270009,"mz":827823168,"start":1620312695813,"ops":null,"sizes":[0,1,2,3,2],"lengthWeight":[60,60,30,10],"normalSpeeds":[100,100,100,100],"bigSpeeds":[60,60,60,60],"lengths":[32000,40000,52000,62000],"strengths":[10,30,60,80],"atks":[6,4,2,1],"extraAtks":[0,0,0,0],"extraAtksWeight":[0,0,0,0],"suckBlood":[0,0,0,0],"suckBloodWeight":[0,0,0,0],"skills":[0,0,0,0],"sizes1":[0,1,2,3,2],"lengthWeight1":[60,60,30,10],"normalSpeeds1":[100,100,100,100],"bigSpeeds1":[60,60,60,60],"lengths1":[32000,40000,52000,62000],"strengths1":[10,30,60,80],"atks1":[6,4,2,1],"extraAtks1":[0,0,0,0],"extraAtksWeight1":[0,0,0,0],"suckBlood1":[0,0,0,0],"suckBloodWeight1":[0,0,0,0],"skills1":[0,0,0,0],"teamHps":[100,100],"maxHps":[100,100],"raceLength":800000,"raceTime":300000,"shield":0,"equalsPush":-1,"shield1":0,"suckHps":[100,100]}

        this.core.start = fakeData.battlefield.createdAt;
        core.setSeed(fakeData.battlefield.createdAt);

        for (let t of fakeData.battlefield.tracks) {
            let time = t.timestamp - this.core.start;
            let uid = t.uid;
            let team = uid === fakeData.battlefield.infos[0].uid ? 0 : 1;
            let raceIndex = t.trackId || 0;
            this.core.ops.push({
                type: EMOperateType.ADD_BULL,
                time, team, raceIndex
            })
        }
        // console.error(this.core.ops.length)
        this.core.ops.sort((a, b) => a.time - b.time);

        core.sizes = [0, 1, 2, 3, 2];
        core.skillStartTimes[EMSkillType.ICE] = 600;
        core.skillContinueTimes[EMSkillType.ICE] = 3000;
        core.skillStartTimes[EMSkillType.FIRE] = 1000;
        core.skillContinueTimes[EMSkillType.FIRE] = 0;

        core.bull_cd = 3000;

        if (fakeCore) {
            core.raceLength = fakeCore.raceLength;
            core.raceTime = fakeCore.raceTime;

            core.lengthWeight = fakeCore.lengthWeight;
            core.normalSpeeds = fakeCore.normalSpeeds;
            core.bigSpeeds = fakeCore.bigSpeeds;
            core.lengths = fakeCore.lengths;
            core.strengths = fakeCore.strengths;
            core.atks = fakeCore.atks;
            core.extraAtks = fakeCore.extraAtks;
            core.extraAtksWeight = fakeCore.extraAtksWeight;
            core.suckBlood = fakeCore.suckBlood;
            core.suckBloodWeight = fakeCore.suckBloodWeight;
            core.skills = fakeCore.skills;
            core.shield = fakeCore.shield;
            core.equalsPush = fakeCore.equalsPush;

            core.sizes1 = fakeCore.sizes1;
            core.lengthWeight1 = fakeCore.lengthWeight1;
            core.normalSpeeds1 = fakeCore.normalSpeeds1;
            core.bigSpeeds1 = fakeCore.bigSpeeds;
            core.lengths1 = fakeCore.lengthWeight1;
            core.strengths1 = fakeCore.strengths1;
            core.atks1 = fakeCore.atks1;
            core.extraAtks1 = fakeCore.extraAtks1;
            core.extraAtksWeight1 = fakeCore.extraAtksWeight1;
            core.suckBlood1 = fakeCore.suckBlood1;
            core.suckBloodWeight1 = fakeCore.suckBloodWeight1;
            core.skills1 = fakeCore.skills1;
            core.shield1 = fakeCore.shield1;

            core.teamHps = fakeCore.teamHps;
            core.maxHps = fakeCore.maxHps;
            core.suckHps = fakeCore.suckHps;
        } else {
            core.raceLength = 800 * 1000;
            core.raceTime = 300000 * 1000;

            core.lengthWeight = [60, 60, 30, 10, 10, 10];
            core.normalSpeeds = [150, 150, 150, 150, 150, 150];
            core.bigSpeeds = [100, 100, 100, 100, 100, 100];
            core.lengths = [52000, 64000, 68000, 74000, 74000, 74000];
            core.strengths = [1, 2, 3, 4, 4, 4];
            core.atks = [4, 3, 2, 1, 1, 1];
            core.extraAtks = [6, 4, 2, 1, 1, 1];
            core.extraAtksWeight = [50, 50, 50, 50, 50, 50];
            core.suckBlood = [1, 1, 1, 1, 1, 1];
            core.suckBloodWeight = [50, 50, 50, 50, 50, 50];
            core.skills = [0, 0, 0, 0, 8, 9];
            core.shield = 0;
            core.equalsPush = -1;

            core.sizes1 = [0, 1, 2, 3, 2];
            core.lengthWeight1 = [60, 60, 30, 10, 10, 10];
            core.normalSpeeds1 = [150, 150, 150, 150, 150, 150];
            core.bigSpeeds1 = [100, 100, 100, 100, 100, 100];
            core.lengths1 = [52000, 64000, 68000, 74000, 74000, 74000];
            core.strengths1 = [1, 2, 3, 4, 4, 4];
            core.atks1 = [4, 3, 2, 1, 1, 1];
            core.extraAtks1 = [6, 4, 2, 1, 1, 1];
            core.extraAtksWeight1 = [50, 50, 50, 50, 50, 50];
            core.suckBlood1 = [1, 1, 1, 1, 1, 1];
            core.suckBloodWeight1 = [50, 50, 50, 50, 50, 50];
            core.skills1 = [0, 0, 0, 0, 8, 9];
            core.shield1 = 0;

            core.teamHps = [100, 100];
            core.maxHps = [100, 100];
            core.suckHps = [100, 100];
        }


        core.bullCDs = [0, 0];

        for (let i = 0; i < 3; i++) {
            core.bullRank0.push(core.randomWeights(core.lengthWeight));;
            core.bullRank1.push(core.randomWeights(core.lengthWeight1));;
        }
        this.runBullGame(this.core, this.core.raceTime);

        console.error(this.core.teamHps);
        console.error(this.core.ops);
        console.error(this.core.events);


        window["bc"] = this;
        // core.save();
    }

    runBullGame(core: BullCoreData, time: number) {
        time = 16 * (~~(time / 16));
        let curTime: number = core.time;
        let hasNew = false;
        while (core.winTeam === -1 && (curTime < time || hasNew && curTime === time)) {
            core.loop++;
            hasNew = false;
            //预测下一个事件点
            let realTime = curTime;
            curTime += 1000 * 1000;
            core.curTime = curTime;

            //预测技能开始和结束时间
            for (let race of core.races) {
                for (let skill of race.skills) {
                    if (!skill.hasStart) {
                        curTime = Math.min(curTime, skill.startTime);
                    } else {
                        curTime = Math.min(curTime, skill.endTime);
                    }
                    core.curTime = curTime;
                }
            }

            //操作事件
            if (core.opIndex < core.ops.length) {
                let op = core.ops[core.opIndex];
                if (op.time <= curTime) {
                    curTime = Math.ceil(op.time / 16) * 16;
                    core.curTime = curTime;
                }
                if (op.time <= time) hasNew = true;
            }

            //获取每个赛道的下个时间点
            for (let race of core.races) {
                race.time = realTime + 1000 * 1000;
                for (let i = 0; i < race.bulls.length; i++) {
                    let bull = race.bulls[i];
                    let nextBull = i < race.bulls.length - 1 ? race.bulls[i + 1] : null;
                    race.time = Math.min(
                        race.time,
                        this.getBullToEndTime(realTime, bull.speed, bull.dir === 0 ? core.raceLength - bull.start + core.lenMap[bull.ids[bull.ids.length - 1]] : 0 - bull.end - core.lenMap[bull.ids[0]]),
                        nextBull ? this.getBullToEndTime(realTime, bull.speed - nextBull.speed, nextBull.end - bull.start) : race.time
                    )
                }
                // console.error("next race time", race.time);
                curTime = Math.min(curTime, race.time, time);
                core.curTime = curTime;
            }

            //移动牛
            if (curTime > realTime) {
                for (let race of core.races) {
                    for (let bull of race.bulls) {
                        if (this.debugStep) {
                            let idszz = [];
                            let endY = bull.end;
                            for (let id of bull.ids) {
                                let step = new BullStep();
                                core.steps.push(step);
                                step.id = id;
                                step.startTime = bull.time;
                                step.endTime = curTime;
                                step.startY = endY + core.lenMap[id];
                                idszz.push(step);
                                endY += core.lenMap[id];
                            }
                            bull.end += bull.speed * (curTime - bull.time);
                            bull.start += bull.speed * (curTime - bull.time);
                            endY = bull.end;
                            for (let step of idszz) {
                                step.endY = endY + core.lenMap[step.id];
                                endY += core.lenMap[step.id];
                            }
                        } else {
                            bull.end += bull.speed * (curTime - bull.time);
                            bull.start += bull.speed * (curTime - bull.time);
                        }
                        bull.time = curTime;
                    }
                }
            }

            //执行操作
            if (core.opIndex < core.ops.length && core.ops[core.opIndex].time <= curTime) {
                hasNew = true;
                if (core.ops[core.opIndex].type === EMOperateType.ADD_BULL) {
                    this.createBull(core, curTime);
                }
            }
            //技能开始和结束效果
            for (let race of core.races) {
                for (let i = 0; i < race.skills.length; i++) {
                    let skill = race.skills[i];
                    //技能开始
                    if (!skill.hasStart && skill.startTime <= curTime) {
                        hasNew = true;
                        skill.hasStart = true;
                        this.startSkill(core, skill, race);
                    }
                    //技能结束
                    if (skill.endTime <= curTime) {
                        hasNew = true;
                        this.endSkill(core, skill, race);
                        race.skills.splice(i, 1);
                        i--;
                    }
                }
            }
            //碰撞
            for (let race of core.races) {
                for (let i = 0; i < race.bulls.length; i++) {
                    let bull = race.bulls[i];
                    if (i < race.bulls.length - 1 && bull.start >= race.bulls[i + 1].end) {
                        hasNew = true;
                        let nextBull = race.bulls[i + 1];

                        // if (nextBull.ids.indexOf(56) != -1) {
                        //     console.error("what?");
                        // }

                        if (core.debugEvent) {
                            let end = bull.end;
                            for (let id of bull.ids) {
                                let event = new BullEvent();
                                event.id = id;
                                event.time = curTime;
                                event.event = '合体前 bull ' + bull.ids.toString() + ' 和' + nextBull.ids.toString() + '，start:' + (end + core.lenMap[id]) + ' ,end:' + end + ' speed:' + bull.speed;
                                core.events.push(event);
                                end += core.lenMap[id];
                            }

                            end = nextBull.end;
                            for (let id of nextBull.ids) {
                                let event = new BullEvent();
                                event.id = id;
                                event.time = curTime;
                                event.event = '合体前 nextBull' + bull.ids.toString() + ' 和' + nextBull.ids.toString() + '，start:' + (end + core.lenMap[id]) + ' ,end:' + end + ' speed:' + nextBull.speed;
                                core.events.push(event);
                                end += core.lenMap[id];
                            }
                        }

                        race.bulls.splice(i, 1);
                        i--;
                        for (let nid of nextBull.ids) {
                            bull.ids.push(nid);
                        }
                        // console.warn("合体", bull.ids, curTime);
                        nextBull.ids = bull.ids;
                        nextBull.end = bull.end + nextBull.end - bull.start;
                        nextBull.updateStrength(core);
                        nextBull.updateSpeed(core);

                        if (core.debugEvent) {
                            let end = nextBull.end;
                            for (let id of nextBull.ids) {
                                let event = new BullEvent();
                                event.id = id;
                                event.time = curTime;
                                event.event = '合体后' + nextBull.ids.toString() + ' start:' + (end + core.lenMap[id]) + ',end:' + end + ' speed:' + nextBull.speed;
                                core.events.push(event);
                                end += core.lenMap[id];
                            }
                        }
                    } else {
                        let bullId: number = - 1;
                        if (bull.speed > 0 && bull.start - core.lenMap[bull.ids[bull.ids.length - 1]] >= core.raceLength) {
                            hasNew = true;
                            bullId = bull.ids.pop();

                            let event = new BullEvent();
                            event.id = bullId;
                            event.time = curTime;
                            event.event = '抵达终点1, ' + bull.ids.toString() + ' start:' + bull.start + ', end:' + (bull.start - core.lenMap[bullId]) + ' speed:' + bull.speed;
                            core.events.push(event);

                            bull.start = bull.end;
                            for (let j = 0; j < bull.ids.length; j++) {
                                bull.start += core.lenMap[bull.ids[j]];
                            }
                            if (bull.ids.length === 1) {
                                if (core.teamMap[bull.ids[0]] === 0) {
                                    bull.speed = race.getIceTime(core.teamMap[bull.ids[0]]) ? 0 : core.normalSpeeds[core.typeMap[bull.ids[0]]];
                                } else {
                                    bull.speed = race.getIceTime(core.teamMap[bull.ids[0]]) ? 0 : -core.normalSpeeds1[core.typeMap[bull.ids[0]]];
                                }
                            }
                            this.bullAttack(core, bullId, 1, curTime);
                        } else if (bull.speed < 0 && bull.end + core.lenMap[bull.ids[0]] <= 0) {
                            hasNew = true;
                            bullId = bull.ids.shift();

                            if (core.debugEvent) {
                                let event = new BullEvent();
                                event.id = bullId;
                                event.time = curTime;
                                event.event = '抵达终点0, start:' + (bull.end + core.lenMap[bullId]) + ',end:' + bull.end + ' speed:' + bull.speed;
                                core.events.push(event);
                            }

                            bull.end = bull.start;
                            for (let j = bull.ids.length - 1; j >= 0; j--) {
                                bull.end -= core.lenMap[bull.ids[j]];
                            }
                            if (bull.ids.length === 1) {
                                if (core.teamMap[bull.ids[0]] === 0) {
                                    bull.speed = race.getIceTime(core.teamMap[bull.ids[0]]) ? 0 : core.normalSpeeds[core.typeMap[bull.ids[0]]];
                                } else {
                                    bull.speed = race.getIceTime(core.teamMap[bull.ids[0]]) ? 0 : -core.normalSpeeds1[core.typeMap[bull.ids[0]]];
                                }
                            }
                            this.bullAttack(core, bullId, 0, curTime);
                        }
                        if (bullId >= 0 && !bull.ids.length) {
                            race.bulls.splice(i, 1);
                            i--;
                        }
                    }
                    if (core.winTeam >= 0) break;
                }
                if (core.winTeam >= 0) break;
            }
            if (core.winTeam >= 0) break;
        }
        core.time = curTime;
        core.curTime = curTime;
    }

    createBull(core: BullCoreData, curTime: number) {
        let op = core.ops[core.opIndex++];
        let type: number = core.getBullType(op.team);
        core.typeMap[core.id] = type;
        core.teamMap[core.id] = op.team;
        core.raceMap[core.id] = op.raceIndex;
        // console.error("create bull ", core.id, op.time, op.team, type, curTime)
        if (op.team === 0) {
            let bulls = core.races[op.raceIndex].bulls;
            let length: number = core.lenMap[core.id] = core.lengths[type];
            if ((!bulls.length || bulls[0].end > length) && core.bullCDs[0] <= curTime) {
                // console.error("create bull ok", core.id, op.time, op.team, type)
                core.bullCDs[0] = curTime + core.bull_cd;
                core.shiftBullType(op.team);
                let bull = new Bull();
                bull.time = curTime;
                bull.raceIndex = op.raceIndex;
                core.atkMap[core.id] = core.atks[type];
                core.skillMap[core.id] = core.skills[type];
                core.strengthMap[core.id] = core.strengths[type];
                core.skillIndexs[core.id] = 0;
                bull.ids.splice(0, 0, core.id++);
                bull.start = length;
                bull.end = 0;
                bull.dir = 0;
                bull.updateStrength(core);
                bull.updateSpeed(core);
                bulls.splice(0, 0, bull);

                if (core.debugEvent) {
                    let event = new BullEvent();
                    event.id = bull.ids[0];
                    event.time = curTime;
                    event.event = 'type0:' + type + ',start:' + bull.start + ',end:' + bull.end + ',speed:' + bull.speed;
                    core.events.push(event);
                }

                if (core.skills[type] === EMSkillType.ICE || core.skills[type] === EMSkillType.FIRE) {
                    this.createSkill(curTime, core.skills[type], core,
                        core.races[op.raceIndex], bull.ids[bull.ids.length - 1], bull);
                }
            } else {
                // console.error("create bull fail", op.time, op.team, type, curTime)
            }
        } else {
            let bulls = core.races[op.raceIndex].bulls;
            core.lenMap[core.id] = core.lengths1[type];
            let length: number = core.lengths1[type];
            if ((!bulls.length || bulls[bulls.length - 1].start < core.raceLength - length) && core.bullCDs[1] <= curTime) {
                // console.error("create bull ok", core.id, op.time, op.team, type)
                core.bullCDs[1] = curTime + core.bull_cd;
                core.shiftBullType(op.team);
                let bull = new Bull();
                bull.time = curTime;
                bull.raceIndex = op.raceIndex;
                core.atkMap[core.id] = core.atks1[type];
                core.skillMap[core.id] = core.skills1[type];
                core.strengthMap[core.id] = -core.strengths1[type];
                core.skillIndexs[core.id] = 0;
                bull.ids.push(core.id++);
                bull.start = core.raceLength;
                bull.end = core.raceLength - length;
                bull.dir = 1;
                bull.updateStrength(core);
                bull.updateSpeed(core);
                bulls.push(bull);
                if (core.debugEvent) {
                    let event = new BullEvent();
                    event.id = bull.ids[0];
                    event.time = curTime;
                    event.event = 'type1:' + type + ',start:' + bull.start + ',end:' + bull.end + ',speed:' + bull.speed;
                    core.events.push(event);
                }
                if (core.skills[type] === EMSkillType.ICE || core.skills[type] === EMSkillType.FIRE) {
                    this.createSkill(curTime, core.skills[type], core,
                        core.races[op.raceIndex], bull.ids[bull.ids.length - 1], bull);
                }
            } else {
                // console.error("create bull fail", op.time, op.team, type, curTime, curTime / 16)
            }
        }
    }

    bullAttack(core: BullCoreData, bullId: number, beAttackedTeam: number, time: number) {
        if (core.teamMap[bullId] === beAttackedTeam) return;
        let extraAtk = 0;
        let type = core.typeMap[bullId];
        let r = core.random() % 100;
        if (core.teamMap[bullId] === 0) {
            if (r < core.extraAtksWeight[type]) {
                extraAtk = core.extraAtks[type];
            }
        } else {
            if (r < core.extraAtksWeight1[type]) {
                extraAtk = core.extraAtks1[type];
            }
        }
        core.cirtMap[bullId] = extraAtk;
        let suckBlood = 0;
        if (core.teamMap[bullId] === 0 && beAttackedTeam === 1) {
            if (r < core.suckBloodWeight[type]) {
                suckBlood = core.suckBlood[type];
            }
        } else if (core.teamMap[bullId] === 1 && beAttackedTeam === 0) {
            if (r < core.suckBloodWeight1[type]) {
                suckBlood = core.suckBlood1[type];
            }
        }
        if (beAttackedTeam === 0) {
            if (core.shield) {
                core.shield--;
            } else {
                core.suckMap[bullId] = suckBlood;
                core.teamHps[0] -= core.atkMap[bullId] + extraAtk;
                if (core.teamHps[0] <= 0) core.winTeam = 1;
                if (suckBlood) core.teamHps[1] += suckBlood;
                if (core.teamHps[1] > core.suckHps[1]) {
                    if (core.teamHps[1] - core.suckHps[1] === suckBlood) {
                        core.suckMap[bullId] = 0;
                    }
                    core.teamHps[1] = core.suckHps[1];
                }
            }
        } else {
            if (core.shield1) {
                core.shield1--;
            } else {
                core.suckMap[bullId] = suckBlood;
                core.teamHps[1] -= core.atkMap[bullId] + extraAtk;
                if (core.teamHps[1] <= 0) core.winTeam = 0;
                if (suckBlood) core.teamHps[0] += suckBlood;
                if (core.teamHps[0] > core.suckHps[0]) {
                    if (core.teamHps[0] - core.suckHps[0] === suckBlood) {
                        core.suckMap[bullId] = 0;
                    }
                    core.teamHps[0] = core.suckHps[0];
                }
            }
        }
    }

    createSkill(curTime: number, skillType: EMSkillType, core: BullCoreData, race: Race, bullId: number, bull: Bull) {
        let skill = new Skill();
        skill.hasStart = false;
        skill.bullId = bullId;
        skill.id = skill.bullId + "_" + (core.skillIndexs[bullId]++);
        skill.type = skillType;
        skill.skillTeam = core.teamMap[bullId];
        skill.startTime = (~~((curTime + core.skillStartTimes[skillType]) / 16)) * 16;
        skill.endTime = (~~((skill.startTime + core.skillContinueTimes[skillType]) / 16)) * 16;
        race.skills.push(skill);
        // console.warn("技能创建", skill.id, curTime);
    }

    startSkill(core: BullCoreData, skill: Skill, race: Race) {
        // console.warn("技能开始", skill.id, core.curTime);
        if (skill.type === EMSkillType.ICE) {
            for (let bull of race.bulls) {
                bull.updateStrength(core);
                bull.updateSpeed(core);

                if (core.debugEvent) {
                    let end = 0;
                    for (let id of bull.ids) {
                        let event = new BullEvent();
                        event.id = id;
                        event.time = core.curTime;
                        event.event = 'iced,' + ',start:' + (end + core.lenMap[id]) + ',end:' + end + ',speed:' + bull.speed;
                        core.events.push(event);
                        end += core.lenMap[id];
                    }
                }
            }
        } else if (skill.type === EMSkillType.FIRE) {
            let end = race.getBullEnd(skill.bullId);
            for (let i = 0; i < race.bulls.length; i++) {
                let hasDelete = false;
                let bull = race.bulls[i];
                let checkEnd = bull.end;
                for (let j = 0; j < bull.ids.length; j++) {
                    let checkId = bull.ids[j];
                    let checkLen = core.lenMap[checkId];
                    if (skill.skillTeam === 0) {
                        if (checkEnd > end) {

                            if (core.debugEvent) {
                                let event = new BullEvent();
                                event.id = bull.ids[j];
                                event.time = core.curTime;
                                event.event = 'fired';
                                core.events.push(event);
                            }

                            bull.ids.splice(j, 1);
                            j--;
                            hasDelete = true;
                            //牛死了后并不清除已放出的技能
                        }
                    } else {
                        if (checkEnd < end) {
                            if (core.debugEvent) {
                                let event = new BullEvent();
                                event.id = bull.ids[j];
                                event.time = core.curTime;
                                event.event = 'fired';
                                core.events.push(event);
                            }

                            bull.ids.splice(j, 1);
                            j--;
                            hasDelete = true;
                        }
                    }
                    checkEnd += checkLen;
                }
                if (hasDelete) {
                    if (bull.ids.length) {
                        if (skill.skillTeam === 0) {
                            bull.updateLengthFromEnd(core);
                        } else {
                            bull.updateLengthFromStart(core);
                        }
                        bull.updateStrength(core);
                        bull.updateSpeed(core);
                    } else {
                        race.bulls.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    }

    endSkill(core: BullCoreData, skill: Skill, race: Race) {
        // console.warn("技能结束", skill.id, core.curTime);
        if (skill.type === EMSkillType.ICE) {
            for (let bull of race.bulls) {
                bull.updateStrength(core);
                bull.updateSpeed(core);
            }
        }
    }

    /**
     * 计算出牛啥时候到达终点
     * @param curTime 
     * @param strength 
     * @param y 
     * @param speed 
     * @param endPos 
     */
    getBullToEndTime(curTime: number, speed: number, distance: number): number {
        let timeGap: number = 16;
        let time: number = curTime + 1000 * 1000;
        if (!speed) return time;
        if (!distance) return curTime;
        if (distance > 0 && speed < 0 || distance < 0 && speed > 0) return time;
        let minPos: number = 0;
        let maxPos: number = 2048; //牛最慢 2048 * timeGap 毫秒到达终点
        //~~ 取整
        let timePos: number = ~~((minPos + maxPos) / 2);
        let count: number = 0;
        while (count < 13) {
            count++;
            let pos = timePos * timeGap * speed;
            if (distance > 0) {
                if (pos >= distance && (timePos - 1) * timeGap * speed < distance) {
                    time = curTime + timePos * timeGap;
                    break
                }
                if (pos < distance) {
                    minPos = timePos;
                    timePos = ~~((minPos + maxPos) / 2);
                    if (timePos === minPos) {
                        timePos = maxPos;
                        break;
                    }
                } else {
                    maxPos = timePos;
                    timePos = ~~((minPos + maxPos) / 2);
                    if (timePos === minPos) {
                        timePos = minPos;
                        break;
                    }
                }
            } else {
                if (pos <= distance && (timePos - 1) * timeGap * speed > distance) {
                    time = curTime + timePos * timeGap;
                    break
                }
                if (pos > distance) {
                    minPos = timePos;
                    timePos = ~~((minPos + maxPos) / 2);
                    if (timePos === minPos) {
                        timePos = maxPos;
                        break;
                    }
                } else {
                    maxPos = timePos;
                    timePos = ~~((minPos + maxPos) / 2);
                    if (timePos === minPos) {
                        timePos = minPos;
                        break;
                    }
                }
            }
        }
        return time;
    }

}

export enum EMSkillType {
    NONE = 0,
    ICE = 8,
    FIRE = 9
}

export enum EMOperateType {
    ADD_BULL = 0,
    STOP = 1,
    PLAY = 2
}


class BullCoreData {

    skillStartTimes: { [index: number]: number } = {};
    skillContinueTimes: { [index: number]: number } = {};

    /**
     * 开始时间
     */
    start: number;
    /**
     * 操作 cd
     */
    bull_cd = 3000;

    ops: { type: EMOperateType, time: number, team?: number, raceIndex?: number }[];
    raceLength: number;
    raceTime: number; //比赛总时长

    sizes: number[];
    lengthWeight: number[];
    normalSpeeds: number[];
    bigSpeeds: number[];
    lengths: number[];
    strengths: number[];
    atks: number[];
    extraAtks: number[];
    extraAtksWeight: number[];
    suckBlood: number[];
    suckBloodWeight: number[];
    skills: number[];
    shield: number;

    sizes1: number[];
    lengthWeight1: number[];
    normalSpeeds1: number[];
    bigSpeeds1: number[];
    lengths1: number[];
    strengths1: number[];
    atks1: number[];
    extraAtks1: number[];
    extraAtksWeight1: number[];
    suckBlood1: number[];
    suckBloodWeight1: number[];
    skills1: number[];
    shield1: number;

    //力量相同时谁推动 -1 0 1 
    equalsPush: number;

    /**
     * 执行了多少次
     */
    loop: number = 0;
    time: number = 0;
    curTime: number = 0;
    opIndex: number = 0;
    id: number = 0;
    winTeam: number = -1;
    teamHps: number[];
    maxHps: number[];
    suckHps: number[];
    typeMap: { [index: number]: number } = {};
    teamMap: { [index: number]: number } = {};
    raceMap: { [index: number]: number } = {};
    lenMap: { [index: number]: number } = {};
    strengthMap: { [index: number]: number } = {};
    atkMap: { [index: number]: number } = {};
    skillMap: { [index: number]: number } = {};
    skillIndexs: { [index: number]: number } = {};
    bullRank0: number[] = [];
    bullRank1: number[] = [];
    bullRankTime: number = 0;
    bullRankTime1: number = 0;
    bullCDs: number[] = [];
    //牛的4个动态属性 id、单头牛的长度、合起来后的长度、队伍、坐标、速度、数量、解冻的绝对时间
    races: Race[] = [];
    mw: number;
    mz: number;
    rand_index = 0;
    cirtMap: { [index: number]: number } = {};
    suckMap: { [index: number]: number } = {};

    debugEvent: boolean = true;
    steps: BullStep[] = [];
    events: BullEvent[] = [];

    private saveList: any[] = [];

    constructor(raceCount: number = 4) {
        for (let i = 0; i < raceCount; i++) {
            this.races[i] = new Race();
            this.races[i].core = this;
            this.races[i].index = i;
        }
    }

    setSeed(seed: number) {
        this.mw = seed;
        this.mz = 123456789;
    }

    copyObj(obj) {
        let c = {};
        for (let k in obj) c[k] = obj[k];
        return c;
    }

    save() {
        let races = [];
        for (let i = 0; i < this.races.length; i++) {
            races[i] = this.races[i].clone();
        }
        let steps = [];
        for (let i = 0; i < this.steps.length; i++) {
            steps[i] = this.steps[i].clone();
        }
        let events = [];
        for (let i = 0; i < this.events.length; i++) {
            events[i] = this.events[i].clone();
        }
        let copy = {
            loop: this.loop,
            time: this.time,
            opIndex: this.opIndex,
            id: this.id,
            winTeam: this.winTeam,
            teamHps: this.teamHps.concat(),
            typeMap: this.copyObj(this.typeMap),
            teamMap: this.copyObj(this.teamMap),
            raceMap: this.copyObj(this.raceMap),
            lenMap: this.copyObj(this.lenMap),
            strengthMap: this.copyObj(this.strengthMap),
            atkMap: this.copyObj(this.atkMap),
            skillMap: this.copyObj(this.skillMap),
            skillIndexs: this.copyObj(this.skillIndexs),
            shield: this.shield,
            shield1: this.shield1,
            steps: steps,
            events: events,
            bullRank0: this.bullRank0.concat(),
            bullRank1: this.bullRank1.concat(),
            bullRankTime: this.bullRankTime,
            bullRankTime1: this.bullRankTime1,
            bullCDs: this.bullCDs.concat(),
            cirtMap: this.copyObj(this.cirtMap),
            suckMap: this.copyObj(this.suckMap),
            races: races,
            mz: this.mz,
            mw: this.mw,
            rand_index: this.rand_index
        };
        this.saveList.push(copy);
    }

    restore(time: number) {
        let copy: any;
        for (let i = 1; i < this.saveList.length; i++) {
            if (this.saveList[i].time > time) {
                copy = this.saveList[i - 1];
                this.saveList.length = i;
                break;
            }
        }
        if (!copy) copy = this.saveList[this.saveList.length - 1];
        this.loop = copy.loop;
        this.time = copy.time;
        this.opIndex = copy.opIndex;
        this.id = copy.id;
        this.winTeam = copy.winTeam;
        this.teamHps = copy.teamHps.concat();
        this.typeMap = this.copyObj(copy.typeMap);
        this.teamMap = this.copyObj(copy.teamMap);
        this.raceMap = this.copyObj(copy.raceMap);
        this.lenMap = this.copyObj(copy.lenMap);
        this.strengthMap = this.copyObj(copy.strengthMap);
        this.atkMap = this.copyObj(copy.atkMap);
        this.skillMap = this.copyObj(copy.skillMap);
        this.skillIndexs = this.copyObj(copy.skillIndexs);
        this.cirtMap = this.copyObj(copy.cirtMap);
        this.suckMap = this.copyObj(copy.suckMap);
        this.shield = copy.shield;
        this.shield1 = copy.shield1;

        this.bullRank0 = copy.bullRank0.concat();
        this.bullRank1 = copy.bullRank1.concat();
        this.bullRankTime = copy.bullRankTime;
        this.bullRankTime1 = copy.bullRankTime1;
        this.bullCDs = copy.bullCDs.concat();
        this.races = [];
        for (let r of copy.races) {
            let race = new Race();
            race.core = this;
            race.setTo(r);
            this.races.push(race);
        }
        this.steps = [];
        for (let s of copy.steps) {
            let step = new BullStep();
            step.setTo(s);
            this.steps.push(step);
        }
        this.events = [];
        for (let e of copy.events) {
            let event = new BullEvent();
            event.setTo(e);
            this.events.push(event);
        }
        this.mz = copy.mz;
        this.mw = copy.mw;
        this.rand_index = copy.rand_index;
    }

    shiftBullType(team: number): number {
        // if (this.view.battleInfo.battlefield.infos[team].uid != 15090) return 3;
        // return [0,1,5][~~(Math.random()*3)];
        if (team === 0) {
            this.bullRankTime = this.curTime;
            this.bullRank0.push(this.randomWeights(this.lengthWeight));
            return this.bullRank0.shift();
        } else {
            this.bullRankTime1 = this.curTime;
            this.bullRank1.push(this.randomWeights(this.lengthWeight1));
            return this.bullRank1.shift();
        }
    }


    getBullType(team: number): number {
        // return [0,1,5][~~(Math.random()*3)];
        // if (this.view.battleInfo.battlefield.infos[team].uid != 15090) return 3;
        if (team === 0) {
            return this.bullRank0[0];
        } else {
            return this.bullRank1[0];
        }
    }

    random() {
        let r = this;
        r.mz = 36969 * (r.mz & 65535) + (r.mz >> 16)
        r.mw = 18000 * (r.mw & 65535) + (r.mw >> 16)
        // console.warn(this.rand_index++, this.curTime, ((r.mz << 16) + r.mw) & 0x7fffffff)
        return ((r.mz << 16) + r.mw) & 0x7fffffff
    }

    randomWeights(weights: number[]): number {
        let r = this.random();
        let s: number = 0; //weight sum
        for (let i = 0; i < weights.length; i++) {
            s += weights[i];
        }
        r = r % s; //int 0 ~ s - 1
        for (let i = 0; i < weights.length; i++) {
            if (r < weights[i]) return i;
            r -= weights[i];
        }
        return weights.length - 1;
    }

    randomValues(values: number[], weights: number[]): number {
        return values[this.randomWeights(weights)];
    }
}

class BullEvent {

    id: number;
    time: number;
    event: string;

    clone() {
        return {
            id: this.id,
            time: this.time,
            event: this.event
        }
    }

    setTo(obj: any) {
        this.id = obj.id;
        this.time = obj.time;
        this.event = obj.event;
    }
}

class BullStep {

    id: number;
    startTime: number;
    endTime: number;
    startY: number;
    endY: number;

    clone() {
        return {
            id: this.id,
            startTime: this.startTime,
            endTime: this.endTime,
            startY: this.startY,
            endY: this.endY
        }
    }

    setTo(obj: any) {
        this.id = obj.id;
        this.startTime = obj.startTime;
        this.endTime = obj.endTime;
        this.startY = obj.startY;
        this.endY = obj.endY;
    }
}

class Race {

    public core: BullCoreData;
    public index: number;
    public bulls: Bull[] = [];
    public time: number = 0;
    public skills: Skill[] = [];

    clone() {
        let bulls = [];
        for (let i = 0; i < this.bulls.length; i++) {
            bulls.push(this.bulls[i].clone());
        }
        let skills = [];
        for (let i = 0; i < this.skills.length; i++) {
            skills.push(this.skills[i].clone());
        }
        return {
            index: this.index,
            bulls: bulls,
            time: this.time,
            skills: skills
        }
    }

    setTo(obj: any) {
        this.index = obj.index;
        this.time = obj.time;
        this.bulls = [];
        for (let i = 0; i < obj.bulls.length; i++) {
            let b = new Bull();
            b.setTo(obj.bulls[i]);
            this.bulls.push(b);
        }
        this.skills = [];
        for (let i = 0; i < obj.skills.length; i++) {
            let s = new Skill();
            s.setTo(obj.skills[i]);
            this.skills.push(s);
        }
    }

    getIceTime(team: number): number {
        let time = 0;
        for (let skill of this.skills) {
            if (skill.type === EMSkillType.ICE &&
                skill.skillTeam != team &&
                skill.startTime <= this.core.curTime &&
                skill.endTime > this.core.curTime &&
                skill.endTime > time) {
                time = skill.endTime;
            }
        }
        return time;
    }

    getBullEnd(bullId: number): number {
        for (let bull of this.bulls) {
            if (bull.ids.indexOf(bullId) != -1) {
                let end = bull.end;
                for (let id of bull.ids) {
                    if (id === bullId) return end;
                    end += this.core.lenMap[id];
                }
            }
        }
        return -this.core.raceLength;
    }
}

class Bull {

    public raceIndex: number;

    public ids: number[] = [];

    public start: number = 0;

    public end: number = 0;

    public dir: number = 0;

    public time: number = 0;

    public speed: number = 0;

    public strength: number = 0;

    clone() {
        return {
            raceIndex: this.raceIndex,
            ids: this.ids.concat(),
            start: this.start,
            end: this.end,
            dir: this.dir,
            time: this.time,
            speed: this.speed,
            strength: this.strength
        }
    }

    setTo(obj: any) {
        this.ids = obj.ids.concat();
        this.raceIndex = obj.raceIndex;
        this.start = obj.start;
        this.end = obj.end;
        this.dir = obj.dir;
        this.time = obj.time;
        this.speed = obj.speed;
        this.strength = obj.strength;
    }

    updateLengthFromEnd(core: BullCoreData) {
        let end = this.end;
        for (let id of this.ids) {
            end += core.lenMap[id];
        }
        this.start = end;
    }

    updateLengthFromStart(core: BullCoreData) {
        let start = this.start;
        for (let id of this.ids) {
            start -= core.lenMap[id];
        }
        this.end = start;
    }

    updateStrength(core: BullCoreData) {
        let strength = 0;
        for (let id of this.ids) {
            if (core.teamMap[id] === 0) {
                if (!core.races[this.raceIndex].getIceTime(0)) {
                    strength += core.strengthMap[id];
                }
            } else {
                if (!core.races[this.raceIndex].getIceTime(1)) {
                    strength += core.strengthMap[id];
                }
            }
        }
        if (this.ids.length === 1) this.dir = core.teamMap[this.ids[0]];
        else this.dir = strength >= 0 ? 0 : 1;
        this.strength = strength;
    }

    updateSpeed(core: BullCoreData) {
        let bull = this;
        bull.speed = 0;
        if (bull.strength || bull.ids.length > 1 && core.equalsPush != -1) {
            let c = 0;
            for (let id of bull.ids) {
                if (core.teamMap[id] === bull.dir || !bull.strength && core.teamMap[id] === core.equalsPush) {
                    c++;
                }
            }
            if (c) {
                let speeds = bull.ids.length > 1 ? (this.strength > 0 || this.strength === 0 && core.equalsPush === 0 ? core.bigSpeeds : core.bigSpeeds1) : (this.strength >= 0 ? core.normalSpeeds : core.normalSpeeds1);
                bull.speed = (bull.strength > 0 || bull.strength === 0 && core.equalsPush === 0 ? 1 : -1) * speeds[Math.min(speeds.length, c) - 1];
            }
        }
    }
}

class Skill {

    //技能 id
    public id: string;

    //技能类型
    public type: EMSkillType;

    //施法者的 team
    public skillTeam: number;

    //牛的 id
    public bullId: number;

    public hasStart: boolean;

    //启动时间
    //冰 0.6
    //火 1.0
    public startTime: number;

    //结束时间
    public endTime: number;

    clone() {
        return {
            id: this.id,
            type: this.type,
            skillTeam: this.skillTeam,
            bullId: this.bullId,
            hasStart: this.hasStart,
            startTime: this.startTime,
            endTime: this.endTime
        }
    }

    setTo(obj: any) {
        this.id = obj.id;
        this.type = obj.type;
        this.skillTeam = obj.skillTeam;
        this.bullId = obj.bullId;
        this.hasStart = obj.hasStart;
        this.startTime = obj.startTime;
        this.endTime = obj.endTime;
    }
}
