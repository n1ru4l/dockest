import { Runner } from '../runners/@types';
declare const waitUntilContainersAreReady: (services: Runner[]) => {
    setupListenersPromise: Promise<unknown>;
    donePromise: Promise<void>;
};
export default waitUntilContainersAreReady;
