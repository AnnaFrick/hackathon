import { pino } from "pino";

// Set up logger
export const logger = pino({
    transport: {
        targets: [
            {
                // Log to file
                target: "pino/file",
                options: { destination: "combined.log" }
            },
            {
                // Log to console in a human-readable format
                target: "pino-pretty",
                options: { colorize: true }
            }
        ]
    }
});
