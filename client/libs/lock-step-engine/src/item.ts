namespace lse {

    export class Item {

        readonly id: number;

        readonly type: EMWorldType;

        readonly world: World;

        init(type: EMWorldType, world: World, id: number, data: IItemData, player?: Player) {
            (this.type as any) = type;
            (this.world as any) = world;
            (this.id as any) = id;
            data.lockStepItem = this;
            (this.data as any) = data;
            (this.player as any) = player;
        }

        get showData(): IItemData {
            return this.world.items[EMWorldType.SHOW].getById(this.id).data;
        }

        get syncData(): IItemData {
            return this.world.items[EMWorldType.SHOW].getById(this.id).data;
        }

        get realData(): IItemData {
            return this.world.items[EMWorldType.SHOW].getById(this.id).data;
        }

        readonly player: Player;

        readonly data: IItemData;

        onDestroy(): any {
            (this.world as any) = null;
            (this.data as any) = null;
            (this.player as any) = null;
        }
    }

}