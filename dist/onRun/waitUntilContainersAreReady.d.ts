/// <reference types="node" />
import { Runner } from '../runners/@types';
import EventEmitter from 'events';
export declare const createDockerEventEmitter: (services: Runner[]) => {
    emitter: EventEmitter;
    destroyEmitter: () => Promise<void>;
};
export declare const createContainerReadinessCheck: (emitter: EventEmitter, service: Runner) => Promise<unknown>;
