import { DockestConfig } from '../index';
export default class BaseError extends Error {
    static DockestConfig: DockestConfig;
    constructor(message: string, payload?: object);
}
