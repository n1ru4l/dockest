import { DockestConfig } from '../index';
declare const onInstantiation: (config: DockestConfig) => {
    composeFileConfig: import("../runners/@types").ComposeFile;
};
export default onInstantiation;
