namespace tween {


export class BezierPlugin implements ITweenPlugin {

    name = "bezierPlugin";

    /**
     * 初始化相关属性
     * @param target 对象
     * @param data  相关的属性
     */
    init(target: any, data: TweenPluginData, timeTotal: number): any {
        const params = data.propsInit;
        if (!params) return false;
        if (typeof params.x != "object" || !(params.x instanceof Array)) return;
        if (typeof params.y != "object" || !(params.y instanceof Array)) return;
        var fromX = data.propsStorage.fromX = params.from && params.from.x != null ? params.from.x : target.x;
        var fromY = data.propsStorage.fromY = params.from && params.from.y != null ? params.from.y : target.y;
        var points = [{ x: fromX, y: fromY }];
        for (let i = 0; i < params.x.length && i < params.y.length; i++) {
            points.push({ x: params.x[i], y: params.y[i] });
        }
        data.propsStorage.lines = this.getCubicBezierLines(data, points, params.k != null ? params.k : 0.8, params.p != null ? params.p : 0.5);
        data.propsStorage.lineIndex = 0;
        data.propsStorage.linePassLength = 0;
        let length = 0;
        for (let line of data.propsStorage.lines) {
            length += line.len;
        }
        let p = 0;
        for (let line of data.propsStorage.lines) {
            p += line.len / length;
        }
        data.propsStorage.lineLength = length;
        data.propsStorage.v = length / timeTotal;
        return true;
    }

    /**
     * 
     * @param target 对象
     * @param data 相关的属性
     * @param dt 时间差
     * @param time 总的时间
     * @param timeTotal 总时间
     */
    update(target: any, data: TweenPluginData, dt: number, time?: number, timeTotal?: number) {
        const lines = data.propsStorage.lines;
        let p = time / timeTotal;
        let lineLength = data.propsStorage.lineLength;
        let lp = 0;
        if (p < 0) {
            p = -p;
            for (let i = 0, len = lines.length; i < len; i++) {
                lp = lines[i].len / lineLength;
                if (p <= lp) {
                    target.x = 2 * data.propsStorage.fromX - (lines[i].x1 + (lines[i].x2 - lines[i].x1) * p / lp);
                    target.y = 2 * data.propsStorage.fromY - (lines[i].y1 + (lines[i].y2 - lines[i].y1) * p / lp);
                    break;
                } else {
                    p -= lp;
                }
            }
        } else if (p > 1) {
            p = 2 - p;
            for (let i = 0, len = lines.length; i < len; i++) {
                lp = lines[i].len / lineLength;
                if (p <= lp) {
                    target.x = 2 * lines[len - 1].x2 - (lines[i].x1 + (lines[i].x2 - lines[i].x1) * p / lp);
                    target.y = 2 * lines[len - 1].y2 - (lines[i].y1 + (lines[i].y2 - lines[i].y1) * p / lp);
                    break;
                } else {
                    p -= lp;
                }
            }
        } else {
            for (let i = 0, len = lines.length; i < len; i++) {
                lp = lines[i].len / lineLength;
                if (p <= lp) {
                    target.x = lines[i].x1 + (lines[i].x2 - lines[i].x1) * p / lp;
                    target.y = lines[i].y1 + (lines[i].y2 - lines[i].y1) * p / lp;
                    break;
                } else {
                    p -= lp;
                }
            }
        }
        // x1: lastX,
        //             y1: lastY,
        //             x2: x,
        //             y2: y,
        //             len: Math.sqrt((x - lastX) * (x - lastX) + (y - lastY) * (y - lastY))
    }

    /**
         * 根据已知点获取贝塞尔曲线的模拟线段
         * @param points 经过的点
         * @param devices 贝塞尔曲线的拆分个数，个数越多拆分的越精确
         * @param k 平滑系数，范围 0 ~ 1.0，越大就越平滑，越小就越尖锐
         */
    public getCubicBezierLines(data: TweenPluginData, points: Array<any>, k: number =1, p = 1): Array<any> {
        var controls = this.getCubicBezierControlPoints(points, k);
        var lines: Array<any> = [];
        var lineLength = 0;
        for (var i = 0; i < points.length - 1; i++) {
            var p1x = points[i].x;
            var p1y = points[i].y;
            var p2x = controls[i * 2].x;
            var p2y = controls[i * 2].y;
            var p3x = controls[i * 2 + 1].x;
            var p3y = controls[i * 2 + 1].y;
            var p4x = points[i + 1].x;
            var p4y = points[i + 1].y;
            var lastX = p1x;
            var lastY = p1y;
            var devices = ~~(Math.sqrt((p1x - p4x) * (p1x - p4x) + (p1y - p4y) * (p1y - p4y)) * p) || 2;
            for (var d = 1; d <= devices; d++) {
                var t = d / devices;
                var x = p1x * (1 - t) * (1 - t) * (1 - t) + p2x * 3 * (1 - t) * (1 - t) * t + p3x * 3 * (1 - t) * t * t + p4x * t * t * t;
                var y = p1y * (1 - t) * (1 - t) * (1 - t) + p2y * 3 * (1 - t) * (1 - t) * t + p3y * 3 * (1 - t) * t * t + p4y * t * t * t;
                lines.push({
                    x1: lastX,
                    y1: lastY,
                    x2: x,
                    y2: y,
                    len: Math.sqrt((x - lastX) * (x - lastX) + (y - lastY) * (y - lastY))
                });
                lastX = x;
                lastY = y;
                lineLength += lines[lines.length - 1].len;
            }
        }
        data.propsStorage.lineLength = lineLength;
        return lines;
    }

    /**
     * 根据已知点获取贝塞尔曲线的控制点
     * @param points 路径点
     * @param k 平滑系数，范围 0 ~ 1.0，越大就越平滑，越小就越尖锐
     */
    public getCubicBezierControlPoints(points: Array<any>, k: number): Array<any> {
        points = points.concat();
        if (points.length > 2) {
            let r1 = Math.atan2(points[1].y - points[0].y, points[1].x - points[0].x);
            let r2 = Math.atan2(points[2].y - points[1].y, points[2].x - points[1].x);
            let r = r1 + (r1 - r2) * 0.67;
            r -= Math.PI;
            let l = Math.sqrt((points[2].y - points[1].y) * (points[2].y - points[1].y) + (points[2].x - points[1].x) * (points[2].x - points[1].x));
            points = [{
                x: points[0].x + Math.cos(r) * l * 0.5,
                y: points[0].y + Math.sin(r) * l * 1,
            }].concat(points);

            let len = points.length;
            r1 = Math.atan2(points[len - 1].y - points[len - 2].y, points[len - 1].x - points[len - 2].x);
            r2 = Math.atan2(points[len - 2].y - points[len - 3].y, points[len - 2].x - points[len - 3].x);
            r = r1 + (r1 - r2) * 0.67;
            r -= Math.PI;
            l = Math.sqrt((points[len - 3].y - points[len - 2].y) * (points[len - 3].y - points[len - 2].y) + (points[len - 3].x - points[len - 2].x) * (points[len - 3].x - points[len - 2].x));
            points.push({
                x: -(-points[len - 1].x + Math.cos(r) * l * 0.5),
                y: -(-points[len - 1].y + Math.sin(r) * l * 0.5),
            });
        } else {
            points = [{
                x: points[0].x + (points[0].x - points[1].x),
                y: points[0].y + points[0].y - points[1].y
            }].concat(points);
            points.push({
                x: points[points.length - 1].x + points[points.length - 1].x - points[points.length - 2].x,
                y: points[points.length - 1].y + points[points.length - 1].y - points[points.length - 2].y
            });
        }
        var controls: Array<any> = [];
        for (var i = 1; i < points.length - 1; i++) {
            var point1 = points[i - 1];
            var point2 = points[i];
            var point3 = points[i + 1];
            var control1 = { x: (point1.x + point2.x) * .5, y: (point1.y + point2.y) * .5 };
            var control2 = { x: (point2.x + point3.x) * .5, y: (point2.y + point3.y) * .5 };
            var len1 = Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
            var len2 = Math.sqrt((point3.x - point2.x) * (point3.x - point2.x) + (point3.y - point2.y) * (point3.y - point2.y));
            var controlCenter = {
                x: control1.x + (control2.x - control1.x) * (len1 + len2 == 0 ? 0 : len1 / (len1 + len2)),
                y: control1.y + (control2.y - control1.y) * (len1 + len2 == 0 ? 0 : len1 / (len1 + len2)),
            };
            if (k != 1.0) {
                control1.x = controlCenter.x + (control1.x - controlCenter.x) * k;
                control1.y = controlCenter.y + (control1.y - controlCenter.y) * k;
                control2.x = controlCenter.x + (control2.x - controlCenter.x) * k;
                control2.y = controlCenter.y + (control2.y - controlCenter.y) * k;
            }
            control1.x += point2.x - controlCenter.x;
            control1.y += point2.y - controlCenter.y;
            control2.x += point2.x - controlCenter.x;
            control2.y += point2.y - controlCenter.y;
            controls.push(control1);
            controls.push(control2);
        }
        controls.shift();
        controls.pop();
        return controls;
    }
}

}