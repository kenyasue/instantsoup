import os from "os";

export default {

    mediasoup: {
        // Number of mediasoup workers to launch.
        numWorkers: Object.keys(os.cpus()).length,
        // mediasoup WorkerSettings.
        // See https://mediasoup.org/documentation/v3/mediasoup/api/#WorkerSettings
        workerSettings: {
            logLevel: "error",
            logTags: [
                "info",
                "ice",
                "dtls",
                "rtp",
                "srtp",
                "rtcp",
                "rtx",
                "bwe",
                "score",
                "simulcast",
                "svc",
                "sctp",
            ],
            rtcMinPort: 40000,
            rtcMaxPort: 49999,
        },
        // mediasoup Router options.
        // See https://mediasoup.org/documentation/v3/mediasoup/api/#RouterOptions
        routerOptions: {
            mediaCodecs: [
                {
                    kind: "audio",
                    mimeType: "audio/opus",
                    clockRate: 48000,
                    channels: 2,
                },
                {
                    kind: "video",
                    mimeType: "video/VP8",
                    clockRate: 90000,
                    parameters: {
                        "x-google-start-bitrate": 1000,
                    },
                },
                {
                    kind: "video",
                    mimeType: "video/VP9",
                    clockRate: 90000,
                    parameters: {
                        "profile-id": 2,
                        "x-google-start-bitrate": 1000,
                    },
                },
                {
                    kind: "video",
                    mimeType: "video/h264",
                    clockRate: 90000,
                    parameters: {
                        "packetization-mode": 1,
                        "profile-level-id": "4d0032",
                        "level-asymmetry-allowed": 1,
                        "x-google-start-bitrate": 1000,
                    },
                },
                {
                    kind: "video",
                    mimeType: "video/h264",
                    clockRate: 90000,
                    parameters: {
                        "packetization-mode": 1,
                        "profile-level-id": "42e01f",
                        "level-asymmetry-allowed": 1,
                        "x-google-start-bitrate": 1000,
                    },
                },
            ],
        },
        // mediasoup WebRtcTransport options for WebRTC endpoints (mediasoup-client,
        // libmediasoupclient).
        // See https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportOptions
        webRtcTransportOptions: {
            listenIps: [
                {
                    ip: "127.0.0.1",
                    announcedIp: "127.0.0.1",
                },
            ],
            initialAvailableOutgoingBitrate: 1000000,
            minimumAvailableOutgoingBitrate: 600000,
            maxSctpMessageSize: 262144,
            // Additional options that are not part of WebRtcTransportOptions.
            maxIncomingBitrate: 1500000,
        },
        // mediasoup PlainTransport options for legacy RTP endpoints (FFmpeg,
        // GStreamer).
        // See https://mediasoup.org/documentation/v3/mediasoup/api/#PlainTransportOptions
        plainTransportOptions: {
            listenIp: {
                ip: "0.0.0.0",
                announcedIp: "127.0.0.1",
            },
            maxSctpMessageSize: 262144,
        },
    }

};