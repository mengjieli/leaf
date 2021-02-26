import { Shell } from './shell';
export declare class TSCShell extends Shell {
    constructor(tsc: string, cwd: string);
    onCompileComplete: (correct?: boolean, error?: string) => void;
}
