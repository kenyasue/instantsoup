import Mediasoup from "mediasoup";
import * as types from "./types";

declare const instantsoup: () => void;
export default instantsoup;

export declare class Server {
    constructor(serverInitializationParams: types.serverInitializationParams);
    init: () => Promise<void>;
}
export declare class Client {
    print: () => void;
}

export declare type types = {
    logLevel: Mediasoup.types.WorkerLogLevel
}