import * as mediasoup from "mediasoup";
import * as types from "../lib/types";
import os from "os";
import { logger } from "../lib/utils"

import defaultSettings from "../lib/mediasoupServerDefaultSettings"

export class Server {

    mediasoupWorkers: mediasoup.types.Worker[];
    serverInitializationParams: types.serverInitializationParams;

    constructor({
        numberOfWorkers = defaultSettings.mediasoup.numWorkers,
        logLevel = types.LogLevel.warnnig,
        rtcMinPort = defaultSettings.mediasoup.workerSettings.rtcMinPort,
        rtcMaxPort = defaultSettings.mediasoup.workerSettings.rtcMaxPort,
        listenIPs = defaultSettings.mediasoup.webRtcTransportOptions.listenIps }: types.serverInitializationParams) {

        this.serverInitializationParams = {
            numberOfWorkers,
            logLevel,
            rtcMinPort,
            rtcMaxPort,
            listenIPs
        }

        this.mediasoupWorkers = [];
        logger.setLogLevel(logLevel);
    }

    async init() {

        let mediasoupLogLevel: mediasoup.types.WorkerLogLevel = "warn";
        switch (this.serverInitializationParams.logLevel) {
            case types.LogLevel.none: mediasoupLogLevel = "none";
            case types.LogLevel.error: mediasoupLogLevel = "error";
            case types.LogLevel.warnnig: mediasoupLogLevel = "warn";
            case types.LogLevel.info: mediasoupLogLevel = "debug";
            case types.LogLevel.debug: mediasoupLogLevel = "debug";
            default: mediasoupLogLevel = "warn";

        }


        for (let i = 0; i < this.serverInitializationParams.numberOfWorkers; ++i) {
            const worker = await mediasoup.createWorker({
                logLevel: mediasoupLogLevel,
                logTags: defaultSettings.mediasoup.workerSettings.logTags as mediasoup.types.WorkerLogTag[],
                rtcMinPort: this.serverInitializationParams.rtcMinPort,
                rtcMaxPort: this.serverInitializationParams.rtcMaxPort,
            });

            logger.debug(`mediasoup Worker created [pid:${worker.pid}]`)

            worker.on("died", () => {
                logger.error(`mediasoup Worker died. pid:${worker.pid} `)
            });

            this.mediasoupWorkers.push(worker);

            // Log worker resource usage every X seconds.
            setInterval(async () => {
                const usage = await worker.getResourceUsage();
                logger.debug(`mediasoup Worker resource usage [pid:${worker.pid}]`, usage)
            }, 120000);
        }

    }

    print() {
        console.log("server");
    }

}