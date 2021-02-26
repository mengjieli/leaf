import { ConfigData } from './config-data';
export declare class ConfigProcess {
    private data;
    constructor(data: ConfigData);
    process(): Promise<void>;
}
