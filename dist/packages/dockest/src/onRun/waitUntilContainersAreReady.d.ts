/// <reference types="node" />
import EventEmitter from 'events';
import { Runner } from '../runners/@types';
export declare const createDockerEventEmitter: (services: Runner[]) => {
    emitter: EventEmitter;
    destroyEmitter: () => Promise<void>;
};
export declare const createContainerReadinessCheck: (emitter: EventEmitter, service: Runner) => Promise<unknown>;
