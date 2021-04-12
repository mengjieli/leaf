
orange.autoloadLink("BullScene");

export class BullCore extends ecs.Component {

    // //比赛时间
    // raceTime: number = 30;
    // raceLength = 500 * 1000;
    // normalSpeed: number = 100;
    // winSpeed: number = 50;
    // specialSpeed: number = 200;
    // lengths = [84 - 16, 100 - 13, 107 - 3, 124 - 19];
    // strengths = [5, 10, 20, 40];
    // atks = [1, 2, 3, 4];
    // skills = [0, 0, 0, 0];
    // sizes = [1, 2, 3, 4];
    // ops: { time: number, type: number, team: number, raceIndex: number }[];

    // time = 0;

    // runFlag: boolean

    // init() {
    //     this.transform.x = 200;
    //     this.transform.y = 150;
    //     this.runFlag = true;
    // }

    // update() {
    //     if (!this.runFlag) return;
    //     this.time += 16;
    //     let [win, teamHps, bullTypes, bullTeams, bullYs] = this.runBullGame([
    //         { time: 0, team: 0, raceIndex: 0 }
    //     ], 4, this.raceLength,
    //         [60, 60, 30, 10],
    //         [150, 150, 150, 150],
    //         [100, 100, 100, 100],
    //         [100, 100],
    //         this.lengths, this.strengths, this.atks, this.skills,
    //         Math.min(this.time, this.raceTime * 1000));
    //     let bulls = [];
    //     for (let i = 0; i < bullTypes.length; i++) {
    //         bulls.push({
    //             type: bullTypes[i],
    //             team: bullTeams[i],
    //             y: bullYs[i]
    //         });
    //     }
    //     if (teamHps[0] <= 0 || teamHps[1] <= 0 || this.time >= this.raceTime * 1000) {
    //         this.runFlag = false;
    //         console.error("winner", teamHps[0] > teamHps[1] ? 0 : 1);
    //     }
    //     this.render(bulls);
    // }

    // /**
    //  * 
    //  * @param ops 操作列表，每个元素包含 操作的时间、队伍(0|1) 牛的类型\
    //  * @param raceCount 赛道数量
    //  * @param raceLength 赛道长度
    //  * @param normalSpeeds 正常速度
    //  * @param winSpeeds 撞到一起后赢的速度
    //  * @param specialSpeed 特殊速度
    //  * @param teamHps 队伍(0|1)的 hp 
    //  * @param lens 牛的长度，牛的 type 作为索引
    //  * @param strengths 牛的力量，牛的 type 作为索引
    //  * @param atks 牛的攻击，牛的 type 作为索引
    //  * @param skills 牛的技能，牛的 type 作为索引
    //  * skill 0 无技能
    //  * skill 1 抵达终点有概率造成双倍伤害
    //  * skill 2 开局额外获得 10 点血
    //  * skill 3 开局额外获得 3 个护盾
    //  * skill 4 抵达终点有概率吸血
    //  * skill 5 更容易出现 XL 体型的牛
    //  * skill 6 双方体重相同时可以推动对手
    //  * skill 7 同一赛道的牛越多，速度越快
    //  * skill 8 上场时，冰冻对手 3 秒，并且临时置对方的力量为 0
    //  * skill 9 上场时，清空前面的牛，包含对方的和自己的
    //  * @param time 比赛时间
    //  */
    // runBullGame(
    //     ops: { time: 0, team: number, raceIndex: number }[],
    //     raceCount: number,
    //     raceLength: number,

    //     lengthWeight: number[],
    //     normalSpeeds: number[],
    //     bigSpeeds: number[],
    //     lengths: number[],
    //     strengths: number[],
    //     atks: number[],
    //     skills: number[],

    //     lengthWeight1: number[],
    //     normalSpeeds1: number[],
    //     bigSpeeds1: number[],
    //     lengths1: number[],
    //     strengths1: number[],
    //     atks1: number[],
    //     skills1: number[],

    //     teamHps: number[],
    //     time: number): [number, number[], number[], number[], number[]] {
    //     //牛的 id 计数器
    //     let id: number = 0;
    //     let winTeam: number = -1;
    //     //牛的4个动态属性 id、单头牛的长度、合起来后的长度、队伍、坐标、速度、数量、解冻的绝对时间
    //     let bullIds0: number[][][] = [];
    //     let bullLengths0: number[][][] = [];
    //     let bullMergeLengths0: number[][] = [];
    //     let bullTeams0: number[][] = [];
    //     let bullYs0: number[][] = [];
    //     let bullSpeeds0: number[] = [];
    //     let bullCounts0: number[] = [];
    //     let bullIces0: number[][][] = [];

    //     let bullIds1: number[][][] = [];
    //     let bullLengths1: number[][][] = [];
    //     let bullMergeLengths1: number[][] = [];
    //     let bullTeams1: number[][] = [];
    //     let bullYs1: number[][] = [];
    //     let bullSpeeds1: number[] = [];
    //     let bullCounts1: number[] = [];
    //     let bullIces1: number[][][] = [];
    //     //合体牛包含 id
    //     let bigBullIds: number[][] = [];
    //     //合体牛的长度
    //     let bigBullLength: number[] = [];
    //     //合体牛的力量 team0 strength 为正， team1 strength 为负
    //     let bigBullStrength: number[] = [];
    //     //合体牛的位置
    //     let bigBullY: number[] = [];
    //     //合体牛的速度
    //     let bigBullSpeed: number[] = [];
    //     //每条赛道的时间
    //     let raceTime: number[] = [];
    //     for (let i = 0; i < raceCount; i++) {
    //         bullIds0[i] = [];
    //         bullLengths0[i] = [];
    //         bullMergeLengths0 = [];
    //         bullTeams0[i] = [];
    //         bullYs0[i] = [];
    //         bullSpeeds0[i] = 0;
    //         bullCounts0[i] = 0;
    //         bullIds1[i] = [];
    //         bullMergeLengths1[i] = [];
    //         bullLengths1[i] = [];
    //         bullTeams1[i] = [];
    //         bullYs1[i] = [];
    //         bullSpeeds1[i] = 0;
    //         bullCounts1[i] = 0;
    //         bigBullIds[i] = [];
    //         bigBullLength[i] = 0;
    //         bigBullStrength[i] = 0;
    //         bigBullY[i] = 0;
    //         bigBullSpeed[i] = 0;
    //         raceTime[i] = 0;
    //     }
    //     //当前跨度
    //     let curTime: number = 0;
    //     //当前执行过的操作索引
    //     let opIndex: number = 0;
    //     //最大执行次数
    //     let maxWhileCount = Math.ceil(time / 16); //ceil 取上限
    //     let maxWhileIndex = 0;
    //     while (maxWhileIndex < maxWhileCount && winTeam === -1 && curTime <= time) {
    //         //预测下一个事件点
    //         maxWhileIndex++;
    //         curTime += 1000 * 1000;
    //         //操作事件
    //         if (opIndex < ops.length) {
    //             let op = ops[opIndex];
    //             if (op.time <= curTime) {
    //                 curTime = Math.ceil(op.time / 16) * 16;
    //             }
    //         }
    //         for (let k = 0; k < raceCount; k++) {
    //             raceTime[k] = curTime + 1000 * 1000;
    //             if (bigBullLength[k] > 0) { //合体牛相关事件
    //                 raceTime[k] = Math.min(raceTime[k],
    //                     this.getBullToEndTime(raceTime[k], bigBullSpeed[k], raceLength),
    //                     bullIds0[k].length ? raceTime[k] : this.getBullToEndTime(raceTime[k], bullSpeeds0[k][0] - bigBullSpeed[k], bigBullY[k] - bigBullLength[k] - bullYs0[k][0]),
    //                     bullIds1[k].length ? raceTime[k] : this.getBullToEndTime(raceTime[k], bullSpeeds1[k][0] - bigBullSpeed[k], bigBullY[k] - bigBullLength[k] - bullYs1[k][0])
    //                 );
    //             } else { //无合体牛事件
    //                 raceTime[k] = Math.min(raceTime[k],
    //                     bullIds0[k].length && !bullIds1[k].length ? this.getBullToEndTime(raceTime[k], bullSpeeds0[k][0], raceLength - bullYs0[k][0]) : raceTime[k],
    //                     !bullIds0[k].length && bullIds1[k].length ? this.getBullToEndTime(raceTime[k], bullSpeeds1[k][0], - bullYs1[k][0]) : raceTime[k],
    //                     bullIds0[k].length && bullIds1[k].length ? this.getBullToEndTime(raceTime[k], bullSpeeds0[k][0] - bullSpeeds1[k][0], bullYs0[k][0] - bullYs1[k][0]) : raceTime[k]
    //                 );
    //             }
    //             curTime = Math.min(curTime, raceTime[k]);
    //         }
    //         if (opIndex < ops.length) {
    //             let op = ops[opIndex];
    //             if (op.time <= curTime) { //放牛
    //                 if (op.team === 0) {
    //                     let length = lengths[this.random(lengthWeight)];
    //                     bullIds0[op.raceIndex].push([id++]);
    //                     bullLengths0[op.raceIndex].push([length]);
    //                     bullMergeLengths0[op.raceIndex].push(length);
    //                     bullTeams0[op.raceIndex].push(op.team);
    //                     bullYs0[op.raceIndex].push(0);
    //                     bullCounts0[op.raceIndex]++;
    //                     bullSpeeds0[op.raceIndex] = normalSpeeds[Math.min(normalSpeeds.length - 1, bullCounts0[op.raceIndex])];
    //                     if (bigBullLength[op.raceIndex] && bigBullSpeed[op.raceIndex] > 0) bigBullSpeed[op.raceIndex] = bigSpeeds[Math.min(bigSpeeds.length - 1, bullCounts0[op.raceIndex])];
    //                 } else {
    //                     bullIds1[op.raceIndex].push([id++]);
    //                     bullLengths1[op.raceIndex].push([op.type]);
    //                     bullTeams1[op.raceIndex].push(op.team);
    //                     bullYs1[op.raceIndex].push(0);
    //                     bullCounts1[op.raceIndex]++;
    //                     bullSpeeds1[op.raceIndex] = normalSpeeds[Math.min(normalSpeeds.length - 1, bullCounts1[op.raceIndex])];
    //                     if (bigBullLength[op.raceIndex] && bigBullSpeed[op.raceIndex] > 0) bigBullSpeed[op.raceIndex] = bigSpeeds[Math.min(bigSpeeds.length - 1, bullCounts1[op.raceIndex])];
    //                 }
    //             }
    //         }
    //     }
    //     let bulls: {
    //         id: number, len: number, team: number, y: number
    //     }[] = [];
    //     // for (let n = 1; n < raceCount; n++) {
    //     //     bullLengths0[0] = bullLengths0[0].concat(bullLengths0[n]);
    //     //     bullTeams0[0] = bullTeams0[0].concat(bullTeams0[n]);
    //     //     bullYs0[0] = bullYs0[0].concat(bullYs0[n]);
    //     // }
    //     let types = [];
    //     // for (let ts of bullLengths0) {
    //     //     types = types.concat(ts);
    //     // }
    //     return [winTeam, teamHps, types, bullTeams0[0], bullYs0[0]];
    // }

    // bullAttack(atk: number, skill: number, teamHps: number[]) {

    // }

    // random(weights: number[]): number {
    //     let r = Math.random();
    //     for (let i = 0; i < weights.length; i++) {
    //         if (r < weights[i]) return i;
    //     }
    //     return weights.length - 1;
    // }

    // /**
    //  * 计算出牛啥时候到达终点
    //  * @param curTime 
    //  * @param strength 
    //  * @param y 
    //  * @param speed 
    //  * @param endPos 
    //  */
    // getBullToEndTime(curTime: number, speed: number, distance: number): number {
    //     let timeGap: number = 16;
    //     let time: number = curTime + 1000 * 1000;
    //     if (!speed) time;
    //     if (!distance) return curTime;
    //     if (distance > 0 && speed < 0 || distance < 0 && speed > 0) return time;
    //     let minPos: number = 0;
    //     let maxPos: number = 2048; //牛最慢 2048 * timeGap 毫秒到达终点
    //     //~~ 取整
    //     let timePos: number = ~~((minPos + maxPos) / 2);
    //     let count: number = 0;
    //     while (count < 13) {
    //         count++;
    //         let pos = timePos * timeGap * speed;
    //         if (distance > 0) {
    //             if (pos >= distance && (timePos - 1) * timeGap * speed < distance) {
    //                 time = curTime + timePos * timeGap;
    //                 break
    //             }
    //             if (pos < distance) {
    //                 minPos = timePos;
    //                 timePos = ~~((minPos + maxPos) / 2);
    //                 if (timePos === minPos) {
    //                     timePos = maxPos;
    //                     break;
    //                 }
    //             } else {
    //                 maxPos = timePos;
    //                 timePos = ~~((minPos + maxPos) / 2);
    //                 if (timePos === minPos) {
    //                     timePos = minPos;
    //                     break;
    //                 }
    //             }
    //         } else {
    //             if (pos <= distance && (timePos - 1) * timeGap * speed > distance) {
    //                 time = curTime + timePos * timeGap;
    //                 break
    //             }
    //             if (pos > distance) {
    //                 minPos = timePos;
    //                 timePos = ~~((minPos + maxPos) / 2);
    //                 if (timePos === minPos) {
    //                     timePos = maxPos;
    //                     break;
    //                 }
    //             } else {
    //                 maxPos = timePos;
    //                 timePos = ~~((minPos + maxPos) / 2);
    //                 if (timePos === minPos) {
    //                     timePos = minPos;
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    //     return time;
    // }

    // render(bulls: {
    //     id: number, type: number, team: number, y: number
    // }[]) {
    //     while (this.entity.children.length) {
    //         this.entity.children[0].destroy();
    //     }
    //     let list = bulls.concat();
    //     list.sort((a, b) => a.y - b.y);
    //     for (let i = 0; i < list.length; i++) {
    //         let b = ecs.Entity.create().addComponent(leaf.Bitmap);
    //         b.resource = `bull1-${this.sizes[list[i].type]}-${list[i].team + 1}_png`;
    //         b.parent = this.entity;
    //         b.transform.y = list[i].y / 1000;
    //     }
    // }

}