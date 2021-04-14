import { RngSource } from "./rng";

orange.autoloadLink("BullScene");

export class BullCore extends ecs.Component {

    //比赛时间

    time = 0;

    runFlag: boolean

    timeLabel: leaf.Label;

    core: BullCoreData;

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
        core.skills = [0, 0, 0, 0, 8];


        core.lengthWeight1 = [60, 60, 30, 10, 10];
        core.normalSpeeds1 = [150, 150, 150, 150, 150];
        core.bigSpeeds1 = [100, 100, 100, 100, 100];
        core.lengths1 = [68000, 87000, 104000, 105000, 105000];
        core.strengths1 = [1, 2, 3, 4, 4];
        core.atks1 = [4, 3, 2, 1, 1];
        core.skills1 = [0, 0, 0, 0, 0];

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
            core.ops.push({ time: time, team: 0, raceIndex: 2, type: ~~(2 * Math.random()) });
            time += 1000 + ~~(Math.random() * 1000);
        }
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 1, raceIndex: 2, type: ~~(2 * Math.random()) });
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

        core.ops.sort((a, b) => a.time - b.time);

        // core.ops = [{ "time": 680, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 1909, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 2995, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 3063, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 3908, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 4232, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 4268, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 4310, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 4745, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 5740, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 6089, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 6209.255774334708, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 7416, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 7484, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 7523, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 7802, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 7823, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 8603, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 9187, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 9303.987966346709, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 10189, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 10578, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 11593, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 11622, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 11950, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 12115, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 12321.028170371157, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 12395, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 12972, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 13239, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 14244, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 14536, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 15479.518700306653, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 15535, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 16014, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 16101, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 16109, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 16391, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 17154, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 17905, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 19019, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 19118, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 19405, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 19449.570363380997, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 19522, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 20489, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 20708, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 21108, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 21616, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 21779, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 22633, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 22642, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 23752, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 24073, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 24155.127065204542, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 24553, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 25383, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 25617, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 25941, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 26268, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 27232, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 27265, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 27416, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 28310, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 28322, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 28624.444993653706, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 29407, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 30084, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 30233, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 30655, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 30856, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 30933, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 32226, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 32232, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 33425, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 33425, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 33583.004992498434, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 34005, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 34047, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 34455, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 34790, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 35337, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 35863, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 36715.68989353606, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 36867, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 36928, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 37856, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 37874, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 37964, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 38122, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 38237, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 39602, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 39733, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 40762.365233082885, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 40950, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 41241, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 41627, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 42212, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 42471, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 43032, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 43181, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 43891.42405149036, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 44196, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 44864, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 44877, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 45568, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 45998, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 46102, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 46324, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 47198, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 47410.7152860588, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 47674, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 48169, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 48999, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 49171, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 49951, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 50326, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 50530, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 50615, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 51635, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 52248.8958998107, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 52393, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 52857, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 53172, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 54004, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 54031, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 54266, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 54622, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 55345.64834908661, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 55802, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 55924, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 57169, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 57190, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 57618, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 57979, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 58651, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 58798, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 59088, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 59840.752929623675, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 60180, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 60395, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 61413, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 61823, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 62096, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 62569, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 63173, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 63372, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 63996, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 64197.22615326887, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 64886, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 65357, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 65787, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 66510, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 66815, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 66856, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 67844.98250715881, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 68200, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 68222, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 68373, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 69025, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 69776, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 70290, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 71311, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 71441, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 71729, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 72110.77403170142, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 72218, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 72374, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 73156, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 73525, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 73995, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 74709, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 75533, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 75863, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 76022.05037453897, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 76183, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 76482, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 76773, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 76835, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 77046, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 78240, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 78274, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 79346, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 79583, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 80124.47731519165, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 80160, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 80181, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 81370, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 81473, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 82141, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 82714, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 83233, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 83271, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 83796.01217291829, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 84120, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 84640, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 85674, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 85723, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 86408, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 86570, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 86887.52314588551, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 87279, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 87701, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 88512, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 88971, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 90007, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 90016, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 90864, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 91102, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 91466, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 91682.26765817474, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 92531, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 92689, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 93204, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 93479, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 93592, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 94132, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 94767, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 94878, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 96034, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 96333.9477913174, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 96392, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 96780, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 97109, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 97544, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 97706, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 98312, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 98318, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 99625, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 100302, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 101026, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 101284.91643398203, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 101370, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 101561, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 102192, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 102274, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 102601, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 104043, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 104105, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 104467.23768559097, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 105095, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 105193, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 105372, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 105934, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 106516, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 106971, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 107859, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 108819, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 108876, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 109188, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 109309.57519278588, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 109485, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 109559, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 109944, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 110339, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 111245, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 111405, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 112499, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 112601, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 112940, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 112948.8844184996, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 113015, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 113634, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 114395, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 114844, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 115880, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 115899, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 116219, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 116572.78478559159, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 116645, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 117596, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 117629, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 117646, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 118957, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 119384, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 120175, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 120544, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 120850, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 120870, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 121090.11477154, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 121552, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 122492, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 122589, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 123997, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 124240, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 124413, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 125050, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 125174, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 125505.32165864123, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 125802, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 126228, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 126435, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 127725, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 128111, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 128185, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 128837, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 128866, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 129464, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 129503, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 129904, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 130351.46757824498, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 130968, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 131311, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 132617, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 132638, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 132729, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 132879, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 133353, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 133836.949249399, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 134274, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 134410, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 135838, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 136047, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 136085, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 136916, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 136935, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 137288, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 137461, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 138692.12467305825, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 138852, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 139041, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 140101, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 140410, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 140631, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 140707, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 141507, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 141763, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 142158, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 143024, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 143579.62962598028, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 143646, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 144664, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 144882, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 144965, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 145492, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 146023, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 146223, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 146595, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 147644, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 147689, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 147733.3170338342, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 148807, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 149465, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 149609, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 149653, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 149728, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 151351, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 151467, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 152208.03406476064, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 152588, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 152996, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 153088, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 153731, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 153866, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 154118, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 154191, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 155411, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 155924.66363993438, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 156115, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 156801, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 157211, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 157722, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 158134, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 158689, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 158770, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 158787, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 159705.15043908914, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 159970, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 160288, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 160503, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 161114, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 161538, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 162453, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 162894.22984058538, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 162960, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 163759, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 163802, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 164205, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 164900, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 165186, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 165196, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 165265, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 166662.16947143213, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 166803, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 167016, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 168272, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 168380, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 168472, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 168611, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 170019, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 170109, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 170425, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 171004.61759661668, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 171632, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 172240, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 172270, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 173089, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 173348, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 174174, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 174551, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 174622.73023452534, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 175045, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 175470, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 176543, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 176733, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 177086, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 177133, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 177975, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 178000, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 178270.24403319604, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 178675, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 179245, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 179770, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 180081, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 180608, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 181485, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 181640, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 182144.62292822, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 182181, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 182448, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 182679, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 183982, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 184063, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 184360, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 185238, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 185736, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 186215, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 186606.29020831754, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 186747, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 187352, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 188004, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 188655, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 189256, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 189293, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 189440, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 190415, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 191118, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 191283, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 191464.88963783695, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 192417, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 192566, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 193023, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 193418, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 193515, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 194505, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 194872.59633302325, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 194919, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 195348, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 195827, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 196320, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 196480, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 197392, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 197622, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 198127, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 198195, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 199360, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 199386, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 199458.01990904604, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 200404, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 200527, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 200549, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 200612, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 201338, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 201789, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 202476, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 202840, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 202961.62768058607, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 204243, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 204309, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 204511, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 204802, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 204865, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 205528, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 206205.09609365152, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 206629, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 206814, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 207922, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 207972, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 208031, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 208345, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 209235, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 209243, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 209994.7503671816, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 210334, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 210351, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 211230, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 211686, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 212145, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 212166, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 212319, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 213629, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 213899, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 214035.95753750906, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 214488, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 215321, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 215366, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 216678, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 216833, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 216834, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 217266, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 217763.94771957214, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 218274, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 218576, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 218828, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 220191, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 220248, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 220537, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 220956, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 221763, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 222139.1275227256, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 222316, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 222464, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 222911, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 224196, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 224224, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 224808, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 225028, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 225349, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 225710.7688741693, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 226099, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 226371, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 226512, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 227163, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 227900, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 228138, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 228236, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 228952, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 229288, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 229846, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 230399.53929866294, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 230738, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 230875, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 231222, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 232419, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 232483, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 232779, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 233258, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 233424.65594316862, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 233947, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 234329, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 234634, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 235311, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 235543, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 236437, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 236533, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 236818, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 236903.0394786224, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 237536, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 237911, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 239074, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 239143, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 239464, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 240237, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 240291, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 240406.25296798657, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 240548, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 240813, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 241396, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 242158, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 242419, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 243291, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 243584, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 243798.77234895277, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 244110, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 244890, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 244957, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 245019, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 245968, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 246877, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 246935, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 247809, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 247956.64482387822, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 248708, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 248738, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 248864, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 249826, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 249915, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 250300, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 250526, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 251532, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 251674, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 251929.0927467858, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 253177, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 253290, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 253404, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 254392, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 254834, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 255217, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 255258, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 256315, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 256378.52065877325, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 256449, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 256514, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 257900, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 257913, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 257969, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 259045, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 259519, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 259620, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 260071, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 260950, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 261108.99437933936, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 261339, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 261871, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 262190, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 262351, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 262526, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 263510, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 263962, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 264300.9489149979, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 264928, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 265551, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 265687, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 265981, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 266200, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 266296, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 266848, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 267923, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 268614.2583497203, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 268794, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 269156, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 269432, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 269515, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 269911, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 270037, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 270941, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 271416, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 272151, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 272510, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 272904.5122904448, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 273275, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 273386, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 273426, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 273551, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 274639, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 275113, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 275647, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 276340.7214992769, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 276474, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 276639, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 277094, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 277213, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 277726, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 278440, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 279003, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 279875, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 279914, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 280132, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 280799.40906658064, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 281240, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 281281, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 281531, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 281835, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 282712, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 282924, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 283182, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 284613, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 285054.2873615089, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 285170, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 285318, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 285328, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 285734, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 286884, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 286942, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 287594, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 288641, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 288667, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 289390.2612855743, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 289736, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 289756, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 289866, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 289881, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 291005, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 291243, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 292025, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 292738, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 292742, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 292745, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 293031.01284510706, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 293766, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 293855, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 293868, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 294878, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 295070, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 296161, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 296463.87342083215, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 296650, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 296857, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 297360, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 297502, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 297682, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 298454, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 298840, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 299577.20440944313, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 299634, "team": 1, "raceIndex": 2, "type": 1 }]

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
    }

    update() {
        if (!this.runFlag) return;
        this.time += 16;
        this.timeLabel.text = ~~(this.time / 1000) + '';
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
                race: raceIndexs[i]
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
     * skill 1 抵达终点有概率造成双倍伤害
     * skill 2 开局额外获得 10 点血
     * skill 3 开局额外获得 3 个护盾
     * skill 4 抵达终点有概率吸血
     * skill 5 更容易出现 XL 体型的牛
     * skill 6 双方体重相同时可以推动对手
     * skill 7 同一赛道的牛越多，速度越快
     * skill 8 上场时，冰冻对手 3 秒，并且临时置对方的力量为 0
     * skill 9 上场时，清空前面的牛，包含对方的和自己的
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
                        let nextBull = race.bulls[i + 1];
                        race.bulls.splice(i, 1);
                        i--;
                        for (let nid of nextBull.ids) {
                            bull.ids.push(nid);
                        }
                        nextBull.ids = bull.ids;
                        nextBull.end = bull.end + nextBull.end - bull.start;
                        nextBull.strength += bull.strength;
                        nextBull.dir = nextBull.strength >= 0 ? 0 : 1;
                        nextBull.updateSpeed(core.teamMap, nextBull.strength >= 0 ? core.bigSpeeds : core.bigSpeeds1);
                    } else {
                        let bullId: number = - 1;
                        if (bull.dir === 0 && bull.start - core.lenMap[bull.ids[bull.ids.length - 1]] >= core.raceLength) {
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
                            core.teamHps[0] -= core.atkMap[bullId];
                            if (core.teamHps[0] <= 0) core.winTeam = 1;
                        } else if (bull.dir === 1 && bull.end + core.lenMap[bull.ids[0]] <= 0) {
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
                            core.teamHps[1] -= core.atkMap[bullId];
                            if (core.teamHps[1] <= 0) core.winTeam = 0;
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
                core.atkMap[core.id] = core.atks[type];
                core.skillMap[core.id] = core.skills[type];
                bull.ids.splice(0, 0, core.id++);
                bull.start = 0;
                bull.end = -length;
                bull.dir = 0;
                bull.strength = core.strengths[type];
                bull.speed = core.normalSpeeds[type];
                bulls.splice(0, 0, bull);
            }
        } else {
            let bulls = core.races[op.raceIndex].bulls;
            let length: number = core.lenMap[core.id] = core.lengths1[type];
            if (!bulls.length || bulls[bulls.length - 1].start < core.raceLength - length) {
                let bull = new Bull();
                bull.time = curTime;
                core.atkMap[core.id] = core.atks1[type];
                core.skillMap[core.id] = core.skills1[type];
                bull.ids.push(core.id++);
                bull.start = core.raceLength + length;
                bull.end = core.raceLength;
                bull.dir = 1;
                bull.strength = -core.strengths1[type];
                bull.speed = -core.normalSpeeds1[type];
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

    bullAttack(atk: number, skill: number, teamHps: number[]) {

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
    skills: number[];

    lengthWeight1: number[];
    normalSpeeds1: number[];
    bigSpeeds1: number[];
    lengths1: number[];
    strengths1: number[];
    atks1: number[];
    skills1: number[];

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

    public ids: number[] = [];

    public start: number = 0;
    public end: number = 0;
    public dir: number = 0;

    public time: number = 0;

    public speed: number = 0;

    public strength: number = 0;

    updateSpeed(teamMap: { [index: number]: number }, speeds: number[]) {
        let bull = this;
        bull.speed = 0;
        if (bull.strength) {
            let c = 0;
            for (let id of bull.ids) {
                if (teamMap[id] === bull.dir) {
                    c++;
                }
            }
            bull.speed = (bull.dir === 0 ? 1 : -1) * speeds[Math.min(speeds.length, c) - 1];
        }
    }
}