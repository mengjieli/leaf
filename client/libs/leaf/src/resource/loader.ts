namespace leaf {

    export class Loader {

        resources: { [index: string]: LoaderResource } = {};

        private curResource: string;
        private firstName: string;
        private lastName: string;

        private onComplete: Function;

        add(name: string, url: string, itemType: LoaderItemType) {
            let r = this.resources[name] = new LoaderResource();
            r.name = name;
            r.url = url;
            r.itemType = itemType;
            if (!this.firstName) {
                this.firstName = name;
            } else {
                this.resources[this.lastName].next = r.name;
            }
            this.lastName = name;
            return this;
        }

        load(onComplete?: Function) {
            if (this.curResource) return;
            this.onComplete = onComplete;
            this.curResource = this.firstName;
            this.loadCurrent();
        }

        private loadCurrent() {
            let r = this.resources[this.curResource];
            r.load();
            r.onComplete.on(this.loadCurrentComplete);
        }

        private loadCurrentComplete() {
            let r = this.resources[this.curResource];
            let next = this.resources[r.next];
            if (next) {
                this.curResource = next.name;
                this.loadCurrent();
            } else {
                this.onComplete && this.onComplete(this.resources);
            }
        }

    }

    export class LoaderResource {

        name: string;
        url: string;
        itemType: LoaderItemType;
        data: any;
        next: string;

        onComplete: ecs.Broadcast<void> = new ecs.Broadcast<void>();

        load() {
            if (this.itemType.loadType === LoaderType.TEXT) {

            }
        }
    }

    export enum LoaderType {
        TEXT = 1,
        IMAGE = 2
    }

    export interface LoaderItemType {
        loadType: LoaderType,
        xhrType: string
    }

}