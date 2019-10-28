export declare const getHostAddress: () => "host.docker.internal" | "host.dockest-runner.internal";
export declare const getServiceAddress: (serviceName: string, targetPort: string | number) => string;
