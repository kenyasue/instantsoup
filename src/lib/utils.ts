import os from "os";

import { LogLevel } from "./types";

class Logger {

    logLevel: LogLevel = LogLevel.warnnig;

    constructor() {

    }

    setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    error(...args) {
        if (this.logLevel >= LogLevel.error)
            console.error(...args)
    }

    warning(...args) {
        if (this.logLevel >= LogLevel.warnnig)
            console.warn(...args)
    }

    info(...args) {
        if (this.logLevel >= LogLevel.info)
            console.info(...args)
    }

    debug(...args) {
        if (this.logLevel >= LogLevel.debug)
            console.log(...args)
    }

}


export const logger = new Logger();
