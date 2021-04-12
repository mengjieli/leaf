namespace leaf {

    export class Scroller extends leaf.TouchComponent {

        target: ScollerTarget;

        init(target: ScollerTarget, scrollHEnable: boolean = true, scrollVEnable: boolean) {
            this.target = target;
            this.onTouchStart.on(this.touchStart, this);
            this.onTouchMove.on(this.touchMove, this);
            this.onTouchEnd.on(this.touchEnd, this);
            this.scrollHEnable = scrollHEnable;
            this.scrollVEnable = scrollVEnable;
            this.startScrollV = false;
            this.startScrollH = false;
            this.scrollReady = false;
            this.speedH = this.speedV = 1;
            this.startGapV = this.startGapH = 30;
        }

        startGapH = 30;

        startGapV = 30;

        scrollVEnable: boolean;

        scrollHEnable: boolean;

        speedH = 1;

        speedV = 1;

        private startX: number;

        private startY: number;

        private startLocalX: number;

        private startLocalY: number;

        private scrollReady: boolean;

        private startScrollV: boolean;

        private startScrollH: boolean;

        touchStart(e: leaf.TouchEvent) {
            if (!this.target.viewPort) {
                this.scrollReady = false;
                return;
            }
            this.startScrollV = false;
            this.startScrollH = false;
            this.startX = this.target.viewPort.x;
            this.startY = this.target.viewPort.y;
            this.startLocalX = e.localX;
            this.startLocalY = e.localY;
            this.scrollReady = true;
            this.stopChildrenEvent = false;
        }

        touchMove(e: leaf.TouchEvent) {
            if (!this.scrollReady || !this.target.viewPort) return;
            if (this.scrollHEnable) {
                if (!this.startScrollH) {
                    if (Math.abs(e.localX - this.startLocalX) > this.startGapH) {
                        this.stopChildrenEvent = true;
                        this.startScrollH = true;
                        this.startX = this.target.viewPort.x;
                        this.startLocalX = e.localX;
                    }
                }
                if (this.startScrollH) {
                    this.target.viewPort.x = (e.localX - this.startLocalX) * this.speedH + this.startX;
                    this.checkRange();
                    this.target.refresh && this.target.refresh();
                }
            }
            if (this.scrollVEnable) {
                if (!this.startScrollV) {
                    if (Math.abs(e.localY - this.startLocalY) > this.startGapV) {
                        this.stopChildrenEvent = true;
                        this.startScrollV = true;
                        this.startY = this.target.viewPort.y;
                        this.startLocalY = e.localY;
                    }
                }
                if (this.startScrollV) {
                    this.target.viewPort.y = (e.localY - this.startLocalY) * this.speedV + this.startY;
                    this.checkRange();
                    this.target.refresh && this.target.refresh();
                }
            }
        }

        touchEnd(e: leaf.TouchEvent) {
            this.scrollReady = false;
            this.startScrollV = false;
            this.startScrollH = false;
            this.stopChildrenEvent = false;
        }

        checkRange() {
            if (!this.target.viewPort) return;
            if (this.scrollVEnable && this.target.viewPort.y + this.target.contentHeight < this.target.height) {
                this.target.viewPort.y = this.target.height - this.target.contentHeight;
            }
            if (this.scrollVEnable && this.target.viewPort.y > 0) this.target.viewPort.y = 0;
            if (this.scrollHEnable && this.target.viewPort.x + this.target.contentWidth < this.target.width) {
                this.target.viewPort.x = this.target.width - this.target.contentWidth;
            }
            if (this.scrollHEnable && this.target.viewPort.x > 0) this.target.viewPort.x = 0;
        }
    }

}