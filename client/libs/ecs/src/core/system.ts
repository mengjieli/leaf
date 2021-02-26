namespace ecs {

    export class System<T extends IdObject> {

        readonly id: number;

        readonly query?: Query<T>;

        updateFixTime = 0;

        lateUpdateFixTime = 0;

        /**
         * @internal
         */
        updateMoreTime = 0;

        /**
         * @internal
         */
        lateUpdateMoreTime = 0;

        init(query?: Query<T> | any) {
            (this.query as any) = query;
        }

        isRunning: boolean = true;

        update?(dt?: number);

        lateUpdate?(dt?: number, ut?: number);

        destroy() {
            if (this.query) {
                this.query.clear();
                ecs.ObjectPools.releaseRecyableObject(this.query as any);
                (this.query as any) = null;
            }
            this.updateMoreTime = 0;
            this.lateUpdateMoreTime = 0;
        }

        static recycleEnable: boolean = false;
        static sync = false;
        static syncSystemClasses: { [index: string]: SyncSystemData } = {};
    }

    export enum EMSyncSystemMode {
        SUB_WORLD_ONLY = 1,
        ALL_WORLD = 2
    }

    export interface SyncSystemData {
        define: { new(): System<any> },
        mode: EMSyncSystemMode;
    }

    export function syncSystem(mode: EMSyncSystemMode = EMSyncSystemMode.SUB_WORLD_ONLY) {
        return function <T extends { new(): System<any> }>(c: T) {
            c["sync"] = true;
            System.syncSystemClasses[c.name] = {
                define: c,
                mode: mode
            };
            return c;
        }
    }

}