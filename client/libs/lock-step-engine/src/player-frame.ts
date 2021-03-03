namespace lse {

    export class PlayerFrame {

        readonly playerId: number;

        readonly frame: number;

        readonly actions: PlayerAction[] = [];

        constructor(playerId: number, frame: number) {
            (this.playerId as any) = playerId;
            (this.frame as any) = frame;
        }

        encode() {
            let actions = [];
            for (let a of this.actions) {
                actions.push(a.encode())
            }
            return {
                playerId: this.playerId,
                frame: this.frame,
                actions: actions
            }
        }

        decode(cfg: any) {
            (this.playerId as any) = cfg.playerId;
            (this.frame as any) = cfg.frame;
            this.actions.length = 0;
            for (let a of cfg.actions) {
                let action = new PlayerAction(0);
                action.decode(a);
                this.actions.push(action);
            }
        }

    }

}