"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const _types_1 = require("./@types");
class ContainerIsHealthyReadinessCheck {
    constructor({ timeout = 500 }) {
        this.timeout = timeout;
    }
    start(_runner, eventStream$) {
        const stop$ = new rxjs_1.Subject();
        const healthyEventEmitted$ = eventStream$.pipe(operators_1.takeUntil(stop$), operators_1.first(event => event.action === 'health_status' && event.attributes.healthStatus === 'healthy'), operators_1.mapTo(_types_1.ReadinessCheckResult.SUCCESS));
        const timeout$ = rxjs_1.timer(this.timeout).pipe(operators_1.takeUntil(stop$), operators_1.mapTo(_types_1.ReadinessCheckResult.TIMEOUT));
        const cancelSubject = new rxjs_1.Subject();
        this.cancel = () => {
            cancelSubject.next();
            cancelSubject.complete();
        };
        const cancel$ = cancelSubject.pipe(operators_1.mapTo(_types_1.ReadinessCheckResult.CANCEL));
        const $race = rxjs_1.race(healthyEventEmitted$, timeout$, cancel$).pipe(operators_1.take(1), operators_1.tap({
            complete: () => {
                stop$.next();
                stop$.complete();
            },
        }));
        return $race.toPromise();
    }
    cancel() {
        throw new Error('Cannot cancel before started.');
    }
}
exports.ContainerIsHealthyReadinessCheck = ContainerIsHealthyReadinessCheck;
//# sourceMappingURL=ContainerIsHealthyReadinessCheck.js.map