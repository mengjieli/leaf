import { RngSource } from "./rng";

orange.autoloadLink("BullScene");

export class BullCore extends ecs.Component {

    //比赛时间

    time = 0;

    runFlag: boolean

    timeLabel: leaf.Label;

    core: BullCoreData;

    hp0: leaf.Label;

    hp1: leaf.Label;

    init() {
        this.transform.x = 0;
        this.transform.y = 250;
        this.runFlag = true;

        let start = ecs.Entity.create().addComponent(leaf.Bitmap);
        start.texture = leaf.PointTexture.getTexture(0xff0000);
        start.transform.scaleX = 640;
        start.transform.scaleY = 1;
        start.transform.y = this.transform.y;
        start.parent = leaf.world.scene;

        this.hp0 = ecs.Entity.create().addComponent(leaf.Label);
        this.hp0.text = "?";
        this.hp0.transform.x = 400;
        this.hp0.parent = leaf.world.scene;

        this.hp1 = ecs.Entity.create().addComponent(leaf.Label);
        this.hp1.text = "?";
        this.hp1.transform.x = 400;
        this.hp1.transform.y = 1200;
        this.hp1.parent = leaf.world.scene;


        this.timeLabel = ecs.Entity.create().addComponent(leaf.Label);
        this.timeLabel.fontColor = 0xffffff;
        this.timeLabel.parent = leaf.world.scene;

        let core = window["core"] = this.core = new BullCoreData(4);
        core.raceLength = 800 * 1000;
        core.raceTime = 300 * 1000;

        core.lengthWeight = [60, 60, 30, 10, 10];
        core.normalSpeeds = [150, 150, 150, 150, 150];
        core.bigSpeeds = [100, 100, 100, 100, 100];
        core.lengths = [68000, 87000, 104000, 105000, 105000];
        core.strengths = [1, 2, 3, 4, 4];
        core.atks = [4, 3, 2, 1, 1];
        core.extraAtks = [6, 4, 2, 1, 1];
        core.extraAtksWeight = [50, 50, 50, 50, 50];
        core.suckBlood = [1, 1, 1, 1];
        core.suckBloodWeight = [50, 50, 50, 50, 50];
        core.skills = [0, 0, 0, 0, 9];
        core.shield = 3;
        core.equalsPush = 1;

        core.lengthWeight1 = [60, 60, 30, 10, 10];
        core.normalSpeeds1 = [150, 150, 150, 150, 150];
        core.bigSpeeds1 = [100, 100, 100, 100, 100];
        core.lengths1 = [68000, 87000, 104000, 105000, 105000];
        core.strengths1 = [1, 2, 3, 4, 4];
        core.atks1 = [4, 3, 2, 1, 1];
        core.extraAtks1 = [6, 4, 2, 1, 1];
        core.extraAtksWeight1 = [50, 50, 50, 50, 50];
        core.suckBlood1 = [1, 1, 1, 1];
        core.suckBloodWeight1 = [50, 50, 50, 50, 50];
        core.skills1 = [0, 0, 0, 0, 9];
        core.shield1 = 0;

        core.teamHps = [10000, 10000];
        // core.ops = [
        //     { time: 0, team: 0, raceIndex: 0, type: 0 },
        //     { time: 0, team: 0, raceIndex: 0, type: 0 },
        //     { time: 0, team: 1, raceIndex: 0, type: 0 },
        //     { time: 1500, team: 0, raceIndex: 0, type: 1 },
        //     { time: 2000, team: 1, raceIndex: 0, type: 2 }
        // ] as any;
        core.ops = [];
        //第一个赛道放，每隔 3 ~ 5 秒放入一头牛 team0
        let time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 0, raceIndex: 0, type: ~~(5 * Math.random()) });
            time += 3000 + ~~(Math.random() * 2000);
        }
        //第二个赛道放，每隔 3 ~ 5 秒放入一头牛 team1
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 1, raceIndex: 1, type: ~~(5 * Math.random()) });
            time += 3000 + Math.random() * 2000;
        }
        //第3个赛道放，每隔 1 ~ 2 秒放入一头牛 team0 team1
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 0, raceIndex: 2, type: ~~(5 * Math.random()) });
            time += 1000 + ~~(Math.random() * 1000);
        }
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 1, raceIndex: 2, type: ~~(5 * Math.random()) });
            time += 1000 + ~~(Math.random() * 1000);
        }
        //第4个赛道放，每隔 3 ~ 5 秒放入一头牛 team0 team1
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 0, raceIndex: 3, type: ~~(5 * Math.random()) });
            time += 3000 + ~~(Math.random() * 2000);
        }
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 1, raceIndex: 3, type: ~~(5 * Math.random()) });
            time += 3000 + ~~(Math.random() * 2000);
        }


        core.ops = [
            { time: 0, team: 0, raceIndex: 0, type: 2 },
            // { time: 0, team: 0, raceIndex: 0, type: 0 },
            // { time: 4000, team: 0, raceIndex: 0, type: 1 },
            // { time: 6000, team: 0, raceIndex: 0, type: 4 },
            { time: 0, team: 1, raceIndex: 0, type: 3 },
            // { time: 3000, team: 1, raceIndex: 0, type: 1 }
        ] as any;

        core.ops.sort((a, b) => a.time - b.time);
        let end = ecs.Entity.create().addComponent(leaf.Bitmap);
        end.texture = leaf.PointTexture.getTexture(0x00ff00);
        end.transform.scaleX = 640;
        end.transform.scaleY = 1;
        end.transform.y = this.transform.y + core.raceLength / 1000;
        end.parent = leaf.world.scene;

        let mid = ecs.Entity.create().addComponent(leaf.Bitmap);
        mid.texture = leaf.PointTexture.getTexture(0x0000ff);
        mid.transform.scaleX = 640;
        mid.transform.scaleY = 1;
        mid.transform.y = this.transform.y + 0.5 * core.raceLength / 1000;
        mid.parent = leaf.world.scene;

        this.runFlag = false;

        setTimeout(() => {
            this.runFlag = true;
            // this.time = 275000;
        }, 200)

        setTimeout(() => {
            core.ops.push({ time: 1000, team: 0, raceIndex: 0, type: 0 });
        }, 4000);
    }

    update() {
        if (!this.runFlag) return;
        this.time += 16;
        this.timeLabel.text = ~~(this.time / 1000) + '/' + (this.core.raceTime / 1000);
        let [win, teamHps, other] = this.runBullGame(
            this.core,
            //+ 300 * 1000
            Math.min(this.time, this.core.raceTime * 1000));

        let [bullTypes, bullTeams, bullYs, lens, raceIndexs, starts, ends] = other;
        let bulls = [];
        for (let i = 0; i < bullTypes.length; i++) {
            bulls.push({
                type: bullTypes[i],
                team: bullTeams[i],
                length: lens[i],
                y: bullYs[i],
                race: raceIndexs[i],
                ice: !!this.core.races[raceIndexs[i]].ices[bullTeams[i]]
            });
        }
        if (teamHps[0] <= 0 || teamHps[1] <= 0 || this.time >= this.core.raceTime * 1000) {
            this.runFlag = false;
            console.error("winner", teamHps[0] > teamHps[1] ? 0 : 1);
        }
        this.render(bulls, starts, ends);
    }

    /**
     * 
     * @param ops 操作列表，每个元素包含 操作的时间、队伍(0|1) 牛的类型\
     * @param raceCount 赛道数量
     * @param raceLength 赛道长度
     * @param normalSpeeds 正常速度
     * @param winSpeeds 撞到一起后赢的速度
     * @param specialSpeed 特殊速度
     * @param teamHps 队伍(0|1)的 hp 
     * @param lens 牛的长度，牛的 type 作为索引
     * @param strengths 牛的力量，牛的 type 作为索引
     * @param atks 牛的攻击，牛的 type 作为索引
     * @param skills 牛的技能，牛的 type 作为索引
     * skill 0 无技能
     * skill 1 抵达终点有概率造成双倍伤害 ok
     * skill 2 开局额外获得 10 点血 
     * skill 3 开局额外获得 3 个护盾  
     * skill 4 抵达终点有概率吸血  ok
     * skill 5 更容易出现 XL 体型的牛  ok
     * skill 6 双方体重相同时可以推动对手   ok
     * skill 7 同一赛道的牛越多，速度越快 ok
     * skill 8 上场时，冰冻对手 3 秒，并且临时置对方的力量为 0 ok
     * skill 9 上场时，清空前面的牛，包含对方的和自己的 ok
     * @param time 比赛时间
     */
    runBullGame(core: BullCoreData, time: number): [number, number[], any] {

        let curTime: number = core.time;
        let hasNew = false;
        while (core.winTeam === -1 && (curTime < time || hasNew && curTime === time)) {
            core.loop++;
            hasNew = false;
            //预测下一个事件点
            let realTime = curTime;
            curTime += 1000 * 1000;
            //解冻
            for (let race of core.races) {
                for (let ice of race.ices) {
                    if (ice) {
                        curTime = Math.min(curTime, ice);
                    }
                }
            }
            //操作事件
            if (core.opIndex < core.ops.length) {
                let op = core.ops[core.opIndex];
                if (op.time <= curTime) {
                    curTime = Math.ceil(op.time / 16) * 16;
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
                        nextBull ? this.getBullToEndTime(realTime, bull.speed - nextBull.speed, (bull.dir === 0 ? nextBull.end : nextBull.start) - (bull.dir === 0 ? bull.start : bull.end)) : race.time
                    )
                }
                curTime = Math.min(curTime, race.time, time);
            }
            //解冻
            for (let race of core.races) {
                for (let i = 0; i < race.ices.length; i++) {
                    if (race.ices[i] && race.ices[i] <= curTime) {
                        hasNew = true;
                        race.ices[i] = 0;
                        for (let bull of race.bulls) {
                            bull.updateStrength(core);
                            bull.updateSpeed(core);
                        }
                    }
                }
            }
            //执行操作
            if (core.opIndex < core.ops.length && core.ops[core.opIndex].time <= curTime) {
                hasNew = true;
                this.createBull(core, curTime);
            }
            //移动牛
            if (curTime > realTime) {
                for (let race of core.races) {
                    for (let bull of race.bulls) {
                        bull.end += bull.speed * (curTime - bull.time);
                        bull.start += bull.speed * (curTime - bull.time);
                        bull.time = curTime;
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
                        race.bulls.splice(i, 1);
                        i--;
                        for (let nid of nextBull.ids) {
                            bull.ids.push(nid);
                        }
                        nextBull.ids = bull.ids;
                        nextBull.end = bull.end + nextBull.end - bull.start;
                        nextBull.updateStrength(core);
                        nextBull.updateSpeed(core);
                    } else {
                        let bullId: number = - 1;
                        if (bull.speed > 0 && bull.start - core.lenMap[bull.ids[bull.ids.length - 1]] >= core.raceLength) {
                            hasNew = true;
                            bullId = bull.ids.pop();
                            bull.start = bull.end;
                            for (let j = 0; j < bull.ids.length; j++) {
                                bull.start += core.lenMap[bull.ids[j]];
                            }
                            if (bull.ids.length === 1) {
                                if (core.teamMap[bull.ids[0]] === 0) {
                                    bull.speed = race.ices[core.teamMap[bull.ids[0]]] ? 0 : core.normalSpeeds[core.typeMap[bull.ids[0]]];
                                } else {
                                    bull.speed = race.ices[core.teamMap[bull.ids[0]]] ? 0 : -core.normalSpeeds1[core.typeMap[bull.ids[0]]];
                                }
                            }
                            this.bullAttack(core, bullId, 1, curTime);
                        } else if (bull.speed < 0 && bull.end + core.lenMap[bull.ids[0]] <= 0) {
                            hasNew = true;
                            bullId = bull.ids.shift();
                            bull.end = bull.start;
                            for (let j = bull.ids.length - 1; j >= 0; j--) {
                                bull.end -= core.lenMap[bull.ids[j]];
                            }
                            if (bull.ids.length === 1) {
                                if (core.teamMap[bull.ids[0]] === 0) {
                                    bull.speed = race.ices[core.teamMap[bull.ids[0]]] ? 0 : core.normalSpeeds[core.typeMap[bull.ids[0]]];
                                } else {
                                    bull.speed = race.ices[core.teamMap[bull.ids[0]]] ? 0 : -core.normalSpeeds1[core.typeMap[bull.ids[0]]];
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
        return [core.winTeam, core.teamHps, this.getBullShow(core.races, core.teamMap, core.typeMap, core.lengths, core.lengths1)];
    }

    createBull(core: BullCoreData, curTime: number) {
        let op = core.ops[core.opIndex++];
        let type: number = op.type;
        core.typeMap[core.id] = type;
        core.teamMap[core.id] = op.team;
        if (op.team === 0) {
            let bulls = core.races[op.raceIndex].bulls;
            let length: number = core.lenMap[core.id] = core.lengths[type];
            if (!bulls.length || bulls[0].end > 0) {
                let bull = new Bull();
                bull.time = curTime;
                bull.raceIndex = op.raceIndex;
                core.atkMap[core.id] = core.atks[type];
                core.skillMap[core.id] = core.skills[type];
                core.strengthMap[core.id] = core.strengths[type];
                bull.ids.splice(0, 0, core.id++);
                bull.start = 0;
                bull.end = -length;
                bull.dir = 0;
                bull.updateStrength(core);
                bull.updateSpeed(core);
                if (core.skills[type] === 8) { //冰冻
                    let race = core.races[op.raceIndex];
                    race.ices[1] = curTime + 3000;
                    for (let bull of race.bulls) {
                        bull.updateStrength(core);
                        bull.updateSpeed(core);
                    }
                } else if (core.skills[type] === 9) { //清空前面所有的牛
                    core.races[op.raceIndex].bulls.length = 0;
                }
                bulls.splice(0, 0, bull);
            }
        } else {
            let bulls = core.races[op.raceIndex].bulls;
            let length: number = core.lenMap[core.id] = core.lengths1[type];
            if (!bulls.length || bulls[bulls.length - 1].start < core.raceLength - length) {
                let bull = new Bull();
                bull.time = curTime;
                bull.raceIndex = op.raceIndex;
                core.atkMap[core.id] = core.atks1[type];
                core.skillMap[core.id] = core.skills1[type];
                core.strengthMap[core.id] = -core.strengths1[type];
                bull.ids.push(core.id++);
                bull.start = core.raceLength + length;
                bull.end = core.raceLength;
                bull.dir = 1;
                bull.updateStrength(core);
                bull.updateSpeed(core);
                if (core.skills[type] === 8) { //冰冻
                    let race = core.races[op.raceIndex];
                    race.ices[0] = curTime + 3000;
                    for (let bull of race.bulls) {
                        bull.updateStrength(core);
                        bull.updateSpeed(core);
                    }
                } else if (core.skills[type] === 9) { //清空前面所有的牛
                    core.races[op.raceIndex].bulls.length = 0;
                }
                bulls.push(bull);
            }
        }
    }

    /**
     * 客户端用于计算牛的位置的代码
     * @param races 
     * @param teamMap 
     * @param typeMap 
     * @param lengths 
     * @param lengths1 
     */
    getBullShow(races, teamMap, typeMap, lengths, lengths1) {
        let types: number[] = [];
        let teams: number[] = [];
        let lens: number[] = [];
        let ys: number[] = [];
        let raceIndexs: number[] = [];
        let starts: number[] = [];
        let ends: number[] = [];
        for (let race of races) {
            for (let bull of race.bulls) {
                let y = bull.end;
                starts.push(bull.start);
                ends.push(bull.end);
                for (let id of bull.ids) {
                    let len = teamMap[id] === 0 ? lengths[typeMap[id]] : lengths1[typeMap[id]];
                    types.push(typeMap[id]);
                    teams.push(teamMap[id]);
                    lens.push(len);
                    ys.push(y + (teamMap[id] === 0 ? len : 0));
                    raceIndexs.push(race.index);
                    y += len;
                }
            }
        }
        return [types, teams, ys, lens, raceIndexs, starts, ends];
    }

    bullAttack(core: BullCoreData, bullId: number, beAttackedTeam: number, time: number) {
        let extraAtk = 0;
        let type = core.typeMap[bullId];
        let r = this.getRandom(time);
        if (core.teamMap[bullId] === 0) {
            if (r * 100 < core.extraAtksWeight[type]) {
                extraAtk = core.extraAtks[type];
            }
        } else {
            if (r * 100 < core.extraAtksWeight1[type]) {
                extraAtk = core.extraAtks1[type];
            }
        }
        let suckBlood = 0;
        if (core.teamMap[bullId] === 0 && beAttackedTeam === 1) {
            if (r * 100 < core.suckBloodWeight[type]) {
                suckBlood = core.suckBlood[type];
            }
        } else if (core.teamMap[bullId] === 1 && beAttackedTeam === 0) {
            if (r * 100 < core.suckBloodWeight1[type]) {
                suckBlood = core.suckBlood1[type];
            }
        }
        if (beAttackedTeam === 0) {
            if (core.shield) {
                core.shield--;
            } else {
                core.teamHps[0] -= core.atkMap[bullId] + extraAtk;
                if (core.teamHps[0] <= 0) core.winTeam = 1;
                if (suckBlood) core.teamHps[1] += suckBlood;
            }
        } else {
            core.teamHps[1] -= core.atkMap[bullId] + extraAtk;
            if (core.teamHps[1] <= 0) core.winTeam = 0;
            if (suckBlood) core.teamHps[0] += suckBlood;
        }
    }

    getRandom(time: number) {
        return (time % 1000) / 1000; // float 0 ~ 0.999
    }

    random(time: number, weights: number[]): number {
        let r = (time % 1000) / 1000; // float 0 ~ 0.999
        let s: number = 0; //weight sum
        for (let i = 0; i < weights.length; i++) {
            s += weights[i];
        }
        r = ~~(r * s); //int 0 ~ s - 1
        for (let i = 0; i < weights.length; i++) {
            if (r < weights[i]) return i;
        }
        return weights.length - 1;
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

    render(bulls: {
        id: number, type: number, team: number, y: number, length: number, race: number, ice: boolean
    }[], starts: number[], ends: number[]) {
        this.hp0.text = this.core.teamHps[0] + '';
        this.hp1.text = this.core.teamHps[1] + '';
        let offsets = {
            "bull1-1-1_png": 17,
            "bull1-2-1_png": 12,
            "bull1-4-1_png": 13,
            "bull1-5-1_png": 13
        }
        let offsetx = {
            0: -86 / 2,
            1: -106 / 2,
            2: -141 / 2,
            3: -166 / 2,
            4: -166 / 2
        }
        while (this.entity.children.length) {
            this.entity.children[0].destroy();
        }
        for (let n of starts) {
            let l = ecs.Entity.create().addComponent(leaf.Bitmap);
            l.texture = leaf.PointTexture.getTexture(0xff0000);
            l.transform.y = n / 1000;
            l.transform.scaleX = 100;
            l.parent = this.entity;
        }
        for (let n of ends) {
            let l = ecs.Entity.create().addComponent(leaf.Bitmap);
            l.texture = leaf.PointTexture.getTexture(0x00ff00);
            l.transform.y = n / 1000;
            l.transform.scaleX = 100;
            l.parent = this.entity;
        }
        let list = bulls.concat();
        list.sort((a, b) => (a.team === 0 ? a.y : a.y + a.length) - (b.team === 0 ? b.y : b.y + b.length));
        for (let i = 0; i < list.length; i++) {
            let b = ecs.Entity.create().addComponent(leaf.Bitmap);
            let src = `bull1-${list[i].type + 1}-${list[i].team}_png`;
            b.resource = src;
            b.parent = this.entity;
            if (list[i].ice) b.tint = 0x8888ff;
            b.transform.x = list[i].race * 150 + (offsetx[list[i].type] || 0) + 80;
            b.transform.y = list[i].y / 1000 + (-offsets[src] || 0) + (list[i].team === 0 ? -list[i].length / 1000 : 0);
        }
    }

}

class BullCoreData {

    /**
     * 冰冻冷却
     */
    ice_cd = 3000;

    ops: { time: number, team: number, raceIndex: number, type: number }[];
    raceLength: number;
    raceTime: number; //比赛总时长

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
    opIndex: number = 0;
    id: number = 0;
    winTeam: number = -1;
    teamHps: number[];
    typeMap: { [index: number]: number } = {};
    teamMap: { [index: number]: number } = {};
    lenMap: { [index: number]: number } = {};
    strengthMap: { [index: number]: number } = {};
    // iceMap: { [index: number]: number } = {};
    atkMap: { [index: number]: number } = {};
    skillMap: { [index: number]: number } = {};
    //牛的4个动态属性 id、单头牛的长度、合起来后的长度、队伍、坐标、速度、数量、解冻的绝对时间
    races: Race[] = [];

    constructor(raceCount: number) {
        for (let i = 0; i < raceCount; i++) {
            this.races[i] = new Race();
            this.races[i].index = i;
        }
    }
}

class Race {
    public index: number;
    public bulls: Bull[] = [];
    public time: number = 0;
    //team0 被冰冻结束时间
    public ices: number[] = [0, 0];
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

    updateStrength(core: BullCoreData) {
        let strength = 0;
        for (let id of this.ids) {
            if (core.teamMap[id] === 0) {
                if (!core.races[this.raceIndex].ices[0]) {
                    strength += core.strengthMap[id];
                }
            } else {
                if (!core.races[this.raceIndex].ices[1]) {
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
        if (bull.strength || core.equalsPush != -1) {
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