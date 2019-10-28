import { Runner } from '../../runners/@types';
declare const testables: {
    getContainerId: (runner: Runner) => Promise<string>;
};
export { testables };
declare const _default: (runner: Runner) => Promise<void>;
export default _default;
