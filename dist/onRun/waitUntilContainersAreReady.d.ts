import { Runner } from '../runners/@types';
declare const waitUntilContainersAreReady: (services: Runner[]) => Promise<void>;
export default waitUntilContainersAreReady;
