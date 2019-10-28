import { Runner } from '../../runners/@types';
declare const testables: {
    acquireConnection: (host: string, port: number) => Promise<void>;
};
export { testables };
declare const _default: (runner: Runner) => Promise<void>;
export default _default;
