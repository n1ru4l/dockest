import execa from 'execa';
declare const dockerComposeUp: (serviceNames: string[]) => execa.ExecaChildProcess<string>;
export default dockerComposeUp;
