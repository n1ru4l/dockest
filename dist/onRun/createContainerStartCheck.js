"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.createContainerStartCheck = (runner, eventStream$) => {
    const stop$ = new rxjs_1.Subject();
    const cancel$ = new rxjs_1.Subject();
    const info$ = rxjs_1.interval(1000).pipe(operators_1.takeUntil(stop$), operators_1.tap(() => {
        runner.logger.info('Still waiting for start event...');
    }));
    const containerStarts$ = eventStream$.pipe(operators_1.takeUntil(stop$), operators_1.first(event => event.action === 'start'));
    return {
        service: runner.runnerConfig.service,
        done: rxjs_1.race(containerStarts$, info$, cancel$)
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
//# sourceMappingURL=createContainerStartCheck.js.map