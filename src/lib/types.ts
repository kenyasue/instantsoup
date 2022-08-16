import Mediasoup from "mediasoup";

export type serverInitializationParams = {
    numberOfWorkers?: number,
    logLevel?: LogLevel,
    rtcMinPort?: number,
    rtcMaxPort?: number,
    listenIPs?: Array<Mediasoup.types.TransportListenIp>
}

export type Nullable<T> = T | null;

export enum LogLevel {
    none,
    error,
    warnnig,
    info,
    debug
}
