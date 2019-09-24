/// <reference types="node" />
import { default as fsLib } from 'fs';
import { default as yamlLib } from 'js-yaml';
import { DockestConfig } from '../../index';
declare const _default: (config: DockestConfig, yaml?: typeof yamlLib, fs?: typeof fsLib) => void;
export default _default;
