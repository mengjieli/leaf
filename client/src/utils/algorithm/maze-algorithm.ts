export class MazeAlgorithm {

    /**
     * 递归四分法
     * @param w 
     * @param h 
     */
    static makeSimpleMaze(w: number, h: number) {
        let blocks = [];
        for (let y = 0; y < h; y++) {
            blocks[y] = [];
            for (let x = 0; x < w; x++) {
                blocks[y][x] = x === 0 || x === w - 1 || y === 0 || y === h - 1 ? 1 : 0;
            }
        }
        let createWalls = function (startX: number, startY: number, endX: number, endY: number, deep = 0) {
            let h = endY - startY + 1;
            let w = endX - startX + 1;
            if (w < 5 || h < 5) return;
            let midx = startX + ~~(w / 2);
            let midy = startY + ~~(h / 2);
            if (w >= 5 && h >= 5) {
                for (let x = startX + 1; x < endX; x++) {
                    blocks[midy][x] = 1;
                    // if(x === 7 && midy === 12) {
                    //     console.error("???")
                    // }
                    if (x === startX + 1 && !blocks[midy][x - 1]) {
                        blocks[midy][x] = 0;
                    }
                    if (x === endX - 1 && !blocks[midy][x + 1]) {
                        blocks[midy][x] = 0;
                    }
                }
                for (let y = startY + 1; y < endY; y++) {
                    blocks[y][midx] = 1;
                    if (y === startY + 1 && !blocks[y - 1][midx]) {
                        blocks[y][midx] = 0;
                    }
                    if (y === endY - 1 && !blocks[y + 1][midx]) {
                        blocks[y][midx] = 0;
                    }
                }
            }
            let bs = [0, 1, 2, 3];
            while (bs.length > 1) {
                let r = bs.splice(~~(Math.random() * bs.length), 1)[0];
                if (endX - startX > 2) {
                    if (r === 0) {
                        blocks[midy][startX + 1 + ~~(Math.random() * (midx - startX - 1))] = 0;
                    }
                    if (r === 1) {
                        blocks[midy][midx + 1 + ~~(Math.random() * (endX - midx - 1))] = 0;
                    }
                }
                if (endY - startY > 2) {
                    if (r === 2) {
                        let ry = startY + 1 + ~~(Math.random() * (midy - startY - 1));
                        blocks[ry][midx] = 0;
                    }
                    if (r === 3) {
                        let ry = midy + 1 + ~~(Math.random() * (endY - midy - 1));
                        blocks[ry][midx] = 0;
                    }
                }
            }
            if (h >= 5 && w >= 5) {
                createWalls(startX, startY, midx, midy, deep + 1);
                createWalls(midx, startY, endX, midy, deep + 1);
                createWalls(startX, midy, midx, endY, deep + 1);
                createWalls(midx, midy, endX, endY, deep + 1);
            }
        }
        createWalls(0, 0, w - 1, h - 1);
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                blocks[y][x] = x === 0 || x === w - 1 || y === 0 || y === h - 1 ? 1 : blocks[y][x];
            }
        }
        return blocks;
    }

}