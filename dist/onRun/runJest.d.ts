import { DockestConfig } from '../index';
interface JestLib {
    getVersion: any;
    runCLI: any;
}
export interface JestConfig {
    forceExit?: boolean;
    lib?: JestLib;
    projects?: string[];
    runInBand?: boolean;
    silent?: boolean;
    verbose?: boolean;
    watchAll?: boolean;
}
declare const runJest: (config: DockestConfig) => Promise<boolean>;
export default runJest;
