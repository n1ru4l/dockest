"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.createContainerDiedCheck = (runner, eventStream$) => {
    const stop$ = new rxjs_1.Subject();
    const cancel$ = new rxjs_1.Subject();
    const containerDies$ = eventStream$.pipe(operators_1.takeUntil(stop$), operators_1.first(event => event.action === 'die'));
    return {
        service: runner.runnerConfig.service,
        done: rxjs_1.race(containerDies$, cancel$)
            .pipe(operators_1.tap({
            next: () => {
                stop$.next();
                stop$.complete();
            },
        }), operators_1.mapTo(undefined))
            .toPromise(),
        cancel: () => {
            cancel$.complete();
        },
    };
};
//# sourceMappingURL=createContainerDiedCheck.js.map